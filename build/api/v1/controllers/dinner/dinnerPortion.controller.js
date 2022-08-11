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
exports.deleteDinnerPortionController = exports.getDinnerPortionsQueryController = exports.getDinnerPortionsController = exports.getDinnerPortionController = exports.updateDinnerPortionController = exports.createDinnerPortionController = void 0;
const dinnerPortion_service_1 = require("../../services/dinner/dinnerPortion.service");
const dinnerProduct_service_1 = require("../../services/dinner/dinnerProduct.service");
const products_service_1 = require("../../services/products.service");
//events
const events_1 = require("./events");
function createDinnerPortionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dinnerPortions = yield (0, dinnerPortion_service_1.getDinnerPortions)({
            user: userId,
            dinnerId: body.dinnerId,
        });
        if (dinnerPortions.length > 0) {
            const dinnerPortion = yield (0, dinnerPortion_service_1.createDinnerPortion)(Object.assign(Object.assign({}, body), { user: userId, type: 'custom' }));
            return res.send(dinnerPortion);
        }
        const dinnerPortion = yield (0, dinnerPortion_service_1.createDinnerPortion)(Object.assign(Object.assign({}, body), { user: userId, type: 'default' }));
        return res.send(dinnerPortion);
    });
}
exports.createDinnerPortionController = createDinnerPortionController;
function updateDinnerPortionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerPortionId = req.params.dinnerPortionId;
        const update = req.body;
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dinnerPortionId,
        });
        if (!dinnerPortion) {
            return res.sendStatus(404);
        }
        if (String(dinnerPortion.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDinnerPortion = yield (0, dinnerPortion_service_1.getAndUpdateDinnerPortion)({ _id: dinnerPortionId }, update, {
            new: true,
        });
        return res.send(updatedDinnerPortion);
    });
}
exports.updateDinnerPortionController = updateDinnerPortionController;
function getDinnerPortionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerPortionId = req.params.dinnerPortionId;
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dinnerPortionId,
        });
        if (!dinnerPortion) {
            return res.sendStatus(404);
        }
        if (String(dinnerPortion.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dinnerPortion);
    });
}
exports.getDinnerPortionController = getDinnerPortionController;
function getDinnerPortionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinnerPortions = yield (0, dinnerPortion_service_1.getDinnerPortions)({
            user: userId,
            dinnerId: dinnerId,
        });
        if (!dinnerPortions) {
            return res.sendStatus(404);
        }
        return res.send(dinnerPortions);
    });
}
exports.getDinnerPortionsController = getDinnerPortionsController;
function getDinnerPortionsQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerId = req.params.dinnerId;
        const dinnerPortions = yield (0, dinnerPortion_service_1.getDinnerPortions)({
            user: userId,
            dinnerId: dinnerId,
        });
        if (!dinnerPortions) {
            return res.sendStatus(404);
        }
        const dinnerPortionsQuery = yield Promise.all(dinnerPortions.map((dinnerPortion) => __awaiter(this, void 0, void 0, function* () {
            const dinnerProducts = yield Promise.all(dinnerPortion.dinnerProducts.map((dinnerPortionProduct) => __awaiter(this, void 0, void 0, function* () {
                const dinnerProduct = yield (0, dinnerProduct_service_1.getDinnerProduct)({
                    _id: dinnerPortionProduct.dinnerProductId,
                });
                const product = yield (0, products_service_1.getProduct)({
                    _id: dinnerProduct === null || dinnerProduct === void 0 ? void 0 : dinnerProduct.productId,
                });
                return Object.assign(Object.assign({}, dinnerPortionProduct), { dinnerProduct: Object.assign(Object.assign({}, dinnerProduct), { product }) });
            })));
            const dinnerPortionQueryObj = Object.assign(Object.assign({}, dinnerPortion), { dinnerProducts });
            return dinnerPortionQueryObj;
        })));
        return res.send(dinnerPortionsQuery);
    });
}
exports.getDinnerPortionsQueryController = getDinnerPortionsQueryController;
function deleteDinnerPortionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dinnerPortionId = req.params.dinnerPortionId;
        const dinnerPortion = yield (0, dinnerPortion_service_1.getDinnerPortion)({
            _id: dinnerPortionId,
        });
        if (!dinnerPortion) {
            return res.sendStatus(404);
        }
        if (String(dinnerPortion.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dinnerPortion_service_1.deleteDinnerPortion)({ _id: dinnerPortionId });
        events_1.dinnerEmitter.emit('dinnerPortion:delete', dinnerPortionId);
        return res.sendStatus(200);
    });
}
exports.deleteDinnerPortionController = deleteDinnerPortionController;
