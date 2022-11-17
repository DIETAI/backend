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
exports.deleteDinnerController = exports.getDinnersController = exports.getDinnerController = exports.updateDinnerController = exports.createDinnerController = void 0;
const dinner_model_1 = __importDefault(require("../../models/dinners/dinner.model"));
const asset_service_1 = require("../../services/asset.service");
const dinner_service_1 = require("../../services/dinner/dinner.service");
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
//events
const events_1 = require("./events");
function createDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dinner = yield (0, dinner_service_1.createDinner)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(dinner);
    });
}
exports.createDinnerController = createDinnerController;
function updateDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const update = req.body;
        const dinner = yield (0, dinner_service_1.getDinner)({
            _id: dinnerId,
        });
        if (!dinner) {
            return res.sendStatus(404);
        }
        if (String(dinner.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDinner = yield (0, dinner_service_1.getAndUpdateDinner)({ _id: dinnerId }, update, {
            new: true,
        });
        return res.send(updatedDinner);
    });
}
exports.updateDinnerController = updateDinnerController;
function getDinnerController(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinner = yield (0, dinner_service_1.getDinner)({
            _id: dinnerId,
        });
        if (!dinner) {
            return res.sendStatus(404);
        }
        if (String(dinner.user) !== userId) {
            return res.sendStatus(403);
        }
        const dinnerAsset = yield (0, asset_service_1.getAsset)({ _id: dinner.image });
        const dinnerGalleryAssets = dinner.gallery && dinner.gallery.length > 0
            ? yield Promise.all((_a = dinner.gallery) === null || _a === void 0 ? void 0 : _a.map((galleryAsset) => __awaiter(this, void 0, void 0, function* () {
                const dinnerAsset = yield (0, asset_service_1.getAsset)({ _id: galleryAsset });
                return dinnerAsset;
            })))
            : [];
        if (!dinnerAsset) {
            return res.send(Object.assign(Object.assign({}, dinner), { imageObj: undefined, galleryArr: dinnerGalleryAssets }));
        }
        return res.send(Object.assign(Object.assign({}, dinner), { imageObj: dinnerAsset, galleryArr: dinnerGalleryAssets }));
    });
}
exports.getDinnerController = getDinnerController;
function getDinnersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const queryPage = req.query.page;
        const itemsCount = req.query.itemsCount;
        if (queryPage && itemsCount) {
            const page = parseInt(queryPage);
            const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
            const countPromise = dinner_model_1.default.estimatedDocumentCount();
            const dinnersPromise = dinner_model_1.default.find({ user: userId })
                .limit(parseInt(itemsCount))
                .skip(skip);
            const [count, dinners] = yield Promise.all([countPromise, dinnersPromise]);
            const dinnersQuery = yield Promise.all(dinners.map((dinnerDocument) => __awaiter(this, void 0, void 0, function* () {
                const dinner = dinnerDocument.toObject();
                if (!dinner.image) {
                    return Object.assign(Object.assign({}, dinner), { imageObj: undefined });
                }
                const dinnerAsset = yield (0, asset_service_1.getAsset)({ _id: dinner.image });
                if (!dinnerAsset) {
                    return Object.assign(Object.assign({}, dinner), { imageObj: undefined });
                }
                return Object.assign(Object.assign({}, dinner), { imageObj: dinnerAsset });
            })));
            const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
            if (!count || !dinners) {
                return res.sendStatus(404);
            }
            return res.send({
                pagination: {
                    count,
                    pageCount,
                },
                dinners: dinnersQuery,
            });
        }
        const dinners = yield (0, dinner_service_1.getDinners)({ user: userId });
        if (!dinners) {
            return res.sendStatus(404);
        }
        return res.send(dinners);
    });
}
exports.getDinnersController = getDinnersController;
function deleteDinnerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinner = yield (0, dinner_service_1.getDinner)({
            _id: dinnerId,
        });
        if (!dinner) {
            return res.sendStatus(404);
        }
        if (String(dinner.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dinner_service_1.deleteDinner)({ _id: dinnerId });
        const dinnerProducts = yield (0, dinnerProduct_service_1.getDinnerProducts)({ dinnerId: dinnerId });
        const dinnerPortions = yield (0, dinnerPortion_service_1.getDinnerPortions)({ dinnerId: dinnerId });
        const deleteDinnerProducts = yield Promise.all(dinnerProducts.map((dinnerProduct) => __awaiter(this, void 0, void 0, function* () {
            yield (0, dinnerProduct_service_1.deleteDinnerProduct)({ _id: dinnerProduct._id });
        })));
        const deleteDinnerPortions = yield Promise.all(dinnerPortions.map((dinnerPortion) => __awaiter(this, void 0, void 0, function* () {
            yield (0, dinnerPortion_service_1.deleteDinnerPortion)({ _id: dinnerPortion._id });
            events_1.dinnerEmitter.emit('dinnerPortion:delete', dinnerPortion._id);
        })));
        yield (0, dinnerPortion_service_1.deleteDinnerPortion)({ dinnerId: dinnerId });
        //delete dinner products & portions & change diet macro
        return res.sendStatus(200);
    });
}
exports.deleteDinnerController = deleteDinnerController;
