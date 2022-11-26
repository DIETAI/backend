"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.getProductsController = exports.getAllProductsController = exports.getProductController = exports.updateProductController = exports.createProductController = void 0;
const products_service_1 = require("../services/products.service");
const product_model_1 = __importDefault(require("../models/product.model"));
const asset_service_1 = require("../services/asset.service");
function createProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const product = yield (0, products_service_1.createProduct)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(product);
    });
}
exports.createProductController = createProductController;
function updateProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const update = req.body;
        const product = yield (0, products_service_1.getProduct)({
            _id: productId,
        });
        if (!product) {
            return res.sendStatus(404);
        }
        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedProduct = yield (0, products_service_1.getAndUpdateProduct)({ _id: productId }, update, {
            new: true,
        });
        return res.send(updatedProduct);
    });
}
exports.updateProductController = updateProductController;
function getProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, products_service_1.getProduct)({
            _id: productId,
        });
        if (!product) {
            return res.sendStatus(404);
        }
        const productImage = yield (0, asset_service_1.getAsset)({ _id: product.image });
        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }
        const productObj = Object.assign(Object.assign({}, product), { imageURL: productImage ? productImage.imageURL : undefined });
        return res.send(productObj);
    });
}
exports.getProductController = getProductController;
function getAllProductsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, products_service_1.getUserProducts)({});
        if (!products) {
            return res.sendStatus(404);
        }
        return res.send(products);
    });
}
exports.getAllProductsController = getAllProductsController;
function getProductsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const queryPage = req.query.page;
        const itemsCount = req.query.itemsCount;
        console.log({ productsQuery: queryPage, itemsCount });
        if (queryPage && itemsCount) {
            const page = parseInt(queryPage);
            const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
            console.log({ skip });
            const countPromise = product_model_1.default.estimatedDocumentCount();
            const productsPromise = product_model_1.default.find({ user: userId })
                .limit(parseInt(itemsCount))
                .skip(skip);
            const [count, products] = yield Promise.all([
                countPromise,
                productsPromise,
            ]);
            console.log({ productCounts: count });
            const productsQuery = yield Promise.all(products.map((productDocument) => __awaiter(this, void 0, void 0, function* () {
                const product = productDocument.toObject();
                if (!product.image) {
                    return Object.assign(Object.assign({}, product), { imageURL: undefined });
                }
                const productAsset = yield (0, asset_service_1.getAsset)({ _id: product.image });
                if (!productAsset) {
                    return Object.assign(Object.assign({}, product), { imageURL: undefined });
                }
                return Object.assign(Object.assign({}, product), { imageURL: productAsset.imageURL });
            })));
            const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
            console.log({ productsPageCount: pageCount });
            if (!count || !products) {
                return res.sendStatus(404);
            }
            return res.send({
                pagination: {
                    count,
                    pageCount,
                },
                products: productsQuery,
            });
        }
        const products = yield (0, products_service_1.getUserProducts)({ user: userId });
        if (!products) {
            return res.sendStatus(404);
        }
        return res.send(products);
    });
}
exports.getProductsController = getProductsController;
function deleteProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, products_service_1.getProduct)({
            _id: productId,
        });
        if (!product) {
            return res.sendStatus(404);
        }
        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, products_service_1.deleteProduct)({ _id: productId });
        return res.sendStatus(200);
    });
}
exports.deleteProductController = deleteProductController;
