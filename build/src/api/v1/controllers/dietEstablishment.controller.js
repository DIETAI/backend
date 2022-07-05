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
exports.deleteDietEstablishmentController = exports.getDietEstablishmentsController = exports.getDietEstablishmentController = exports.updateDietEstablishmentController = exports.createDietEstablishmentController = void 0;
const dietEstablishment_service_1 = require("../services/dietEstablishment.service");
function createDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietEstablishment = yield (0, dietEstablishment_service_1.createDietEstablishment)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(dietEstablishment);
    });
}
exports.createDietEstablishmentController = createDietEstablishmentController;
function updateDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const update = req.body;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietEstablishment = yield (0, dietEstablishment_service_1.getAndUpdateDietEstablishment)({ _id: dietEstablishmentId }, update, {
            new: true,
        });
        return res.send(updatedDietEstablishment);
    });
}
exports.updateDietEstablishmentController = updateDietEstablishmentController;
function getDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietEstablishment);
    });
}
exports.getDietEstablishmentController = getDietEstablishmentController;
function getDietEstablishmentsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishments = yield (0, dietEstablishment_service_1.getDietEstablishments)({ user: userId });
        if (!dietEstablishments) {
            return res.sendStatus(404);
        }
        return res.send(dietEstablishments);
    });
}
exports.getDietEstablishmentsController = getDietEstablishmentsController;
function deleteDietEstablishmentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietEstablishmentId = req.params.dietEstablishmentId;
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: dietEstablishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        if (String(dietEstablishment.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, dietEstablishment_service_1.deleteDietEstablishment)({ _id: dietEstablishmentId });
        return res.sendStatus(200);
    });
}
exports.deleteDietEstablishmentController = deleteDietEstablishmentController;
