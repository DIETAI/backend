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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDinnerProductController = exports.getDinnerProductsQueryController = exports.getDinnerProductsController = exports.getAllDinnerProductsController = exports.getDinnerProductQueryController = exports.getDinnerProductController = exports.updateDinnerProductController = exports.createDinnerProductController = void 0;
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const products_service_1 = require("../../services/products.service");
//events
const events_1 = require("./events");
const asset_service_1 = require("../../services/asset.service");
function createDinnerProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dinnerProduct = yield (0, dinnerProduct_service_1.createDinnerProduct)(Object.assign(Object.assign({}, body), { user: userId }));
        events_1.dinnerEmitter.emit('dinnerProduct:create', dinnerProduct, userId);
        // //create dinnerPortion
        // const dinnerProductQuery = await getProduct({
        //   _id: dinnerProduct.productId,
        // });
        // if (!dinnerProductQuery) {
        //   return res.sendStatus(404);
        // }
        // const dinnerPortions = getDinnerPortions({
        //   user: userId,
        //   dinnerId: dinnerProduct.dinnerId,
        // });
        // const dinnerProducts = getDinnerProducts({
        //   user: userId,
        //   dinnerId: dinnerProduct.dinnerId,
        // });
        // const [portions, products] = await Promise.all([
        //   dinnerPortions,
        //   dinnerProducts,
        // ]);
        // const dinnerProductsQuery = await Promise.all(
        //   products.map(async (dinnerProduct) => {
        //     const product = await getProduct({ _id: dinnerProduct.productId });
        //     return {
        //       ...dinnerProduct,
        //       product,
        //     };
        //   })
        // );
        // if (portions.length < 1) {
        //   //stworzyć model product portion {portion: 100, type: default}?
        //   const portionDinnerProducts = dinnerProductsQuery.map((dinnerProduct) => ({
        //     dinnerProductId: dinnerProduct._id,
        //     portion: dinnerProduct.defaultAmount,
        //     total: countTotal({
        //       product: dinnerProduct.product as IProductDocument,
        //       portion: dinnerProduct.defaultAmount,
        //     }),
        //   }));
        //   const total = sumTotal({ dinnerPortionProducts: portionDinnerProducts });
        //   const newDinnerPortionObj: IDinnerPortionInput = {
        //     user: userId,
        //     type: 'default',
        //     dinnerId: dinnerProduct.dinnerId,
        //     total,
        //     dinnerProducts: portionDinnerProducts,
        //   };
        //   const newDinnerPortion = await createDinnerPortion({
        //     ...newDinnerPortionObj,
        //   });
        // }
        // if (portions.length > 0) {
        //   const newDinnerPortionProductObj = {
        //     dinnerProductId: dinnerProduct._id,
        //     portion: dinnerProduct.defaultAmount,
        //     total: countTotal({
        //       product: dinnerProductQuery,
        //       portion: dinnerProduct.defaultAmount,
        //     }),
        //   };
        //   const newPortions = await Promise.all(
        //     portions.map(async (dinnerPortion) => {
        //       const newDinerProducts = [
        //         ...dinnerPortion.dinnerProducts,
        //         newDinnerPortionProductObj,
        //       ];
        //       const editPortionObj = {
        //         ...dinnerPortion,
        //         total: sumTotal({ dinnerPortionProducts: newDinerProducts }),
        //         dinnerProducts: newDinerProducts,
        //       };
        //       const updatedPortion = await getAndUpdateDinnerPortion(
        //         { _id: dinnerPortion._id },
        //         editPortionObj,
        //         { new: true }
        //       );
        //       console.log({ updatedPortion });
        //     })
        //   );
        // }
        return res.send(dinnerProduct);
    });
}
exports.createDinnerProductController = createDinnerProductController;
function updateDinnerProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerProductId = req.params.dinnerProductId;
        const update = req.body;
        const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
            _id: dinnerProductId,
        });
        if (!dinnerProduct) {
            return res.sendStatus(404);
        }
        if (String(dinnerProduct.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDinnerProduct = yield (0, dinnerProduct_service_1.getAndUpdateDinnerProduct)({ _id: dinnerProductId }, update, {
            new: true,
        });
        return res.send(updatedDinnerProduct);
    });
}
exports.updateDinnerProductController = updateDinnerProductController;
function getDinnerProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerProductId = req.params.dinnerProductId;
        const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
            _id: dinnerProductId,
        });
        if (!dinnerProduct) {
            return res.sendStatus(404);
        }
        if (String(dinnerProduct.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dinnerProduct);
    });
}
exports.getDinnerProductController = getDinnerProductController;
function getDinnerProductQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerProductId = req.params.dinnerProductId;
        const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
            _id: dinnerProductId,
        });
        if (!dinnerProduct) {
            return res.sendStatus(404);
        }
        if (String(dinnerProduct.user) !== userId) {
            return res.sendStatus(403);
        }
        const product = yield (0, products_service_1.getProduct)({ _id: dinnerProduct.productId });
        if (!product) {
            return res.sendStatus(404);
        }
        const dinnerProductQueryObj = Object.assign(Object.assign({}, dinnerProduct), { product });
        return res.send(dinnerProductQueryObj);
    });
}
exports.getDinnerProductQueryController = getDinnerProductQueryController;
function getAllDinnerProductsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userId = res.locals.user._id;
        const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({
        // user: userId,
        });
        if (!dinnerProducts) {
            return res.sendStatus(404);
        }
        const dinnerProductsQuery = yield Promise.all(dinnerProducts.map((dinnerProduct) => __awaiter(this, void 0, void 0, function* () {
            const product = yield (0, products_service_1.getProduct)({ _id: dinnerProduct.productId });
            return Object.assign({ productName: product === null || product === void 0 ? void 0 : product.name }, dinnerProduct);
        })));
        return res.send(dinnerProductsQuery);
    });
}
exports.getAllDinnerProductsController = getAllDinnerProductsController;
function getDinnerProductsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({
            user: userId,
            dinnerId: dinnerId,
        });
        if (!dinnerProducts) {
            return res.sendStatus(404);
        }
        return res.send(dinnerProducts);
    });
}
exports.getDinnerProductsController = getDinnerProductsController;
function getDinnerProductsQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({
            user: userId,
            dinnerId: dinnerId,
        });
        if (!dinnerProducts) {
            return res.sendStatus(404);
        }
        const dinnerProductsQuery = yield Promise.all(dinnerProducts.map((dinnerProduct) => __awaiter(this, void 0, void 0, function* () {
            const product = yield (0, products_service_1.getProduct)({ _id: dinnerProduct.productId });
            const productAsset = yield (0, asset_service_1.getAsset)({ _id: product === null || product === void 0 ? void 0 : product.image });
            return Object.assign(Object.assign({}, dinnerProduct), { product: Object.assign(Object.assign({}, product), { imageURL: productAsset === null || productAsset === void 0 ? void 0 : productAsset.imageURL }) });
        })));
        if (!dinnerProductsQuery) {
            return res.sendStatus(404);
        }
        return res.send(dinnerProductsQuery);
    });
}
exports.getDinnerProductsQueryController = getDinnerProductsQueryController;
function deleteDinnerProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerProductId = req.params.dinnerProductId;
        const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
            _id: dinnerProductId,
        });
        if (!dinnerProduct) {
            return res.sendStatus(404);
        }
        if (String(dinnerProduct.user) !== userId) {
            return res.sendStatus(403);
        }
        //delete portions
        const dinnerPortions = (0, dinnerPortion_service_1.getDinnerPortions)({
            user: userId,
            dinnerId: dinnerProduct.dinnerId,
        });
        const dinnerProducts = (0, dinnerProduct_service_1.getDinnerProducts)({
            user: userId,
            dinnerId: dinnerProduct.dinnerId,
        });
        const [portions, products] = yield Promise.all([
            dinnerPortions,
            dinnerProducts,
        ]);
        //delete dinnerPortion
        if (products.length === 1) {
            yield Promise.all(portions.map((dinnerPortion) => __awaiter(this, void 0, void 0, function* () {
                yield (0, dinnerPortion_service_1.deleteDinnerPortion)({ _id: dinnerPortion._id });
            })));
        }
        //delete dinnerPortionProduct
        if (products.length > 1) {
            const newPortions = yield Promise.all(portions.map((dinnerPortion) => __awaiter(this, void 0, void 0, function* () {
                const editPortionObj = Object.assign(Object.assign({}, dinnerPortion), { dinnerProducts: dinnerPortion.dinnerProducts.filter((dinnerProduct) => dinnerProduct.dinnerProductId.toString() !== dinnerProductId) });
                console.log({ editPortionObjProducts: editPortionObj.dinnerProducts });
                const updatedPortion = yield (0, dinnerPortion_service_1.getAndUpdateDinnerPortion)({ _id: dinnerPortion._id }, editPortionObj, { new: true });
                console.log({ updatedPortion });
            })));
        }
        yield (0, dinnerProduct_service_1.deleteDinnerProduct)({ _id: dinnerProductId });
        return res.sendStatus(200);
    });
}
exports.deleteDinnerProductController = deleteDinnerProductController;
