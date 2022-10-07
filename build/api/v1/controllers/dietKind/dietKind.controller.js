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
exports.deleteDietKindController = exports.getDietKindsController = exports.getDietKindController = exports.updateDietKindController = exports.createDietKindController = void 0;
const dietKind_service_1 = require("../../services/dietKind/dietKind.service");
function createDietKindController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const dietKind = yield (0, dietKind_service_1.createDietKind)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!dietKind) {
            return res.sendStatus(404);
        }
        return res.send(dietKind);
    });
}
exports.createDietKindController = createDietKindController;
function updateDietKindController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietKindId = req.params.dietKindId;
        const update = req.body;
        const dietKind = yield (0, dietKind_service_1.getDietKind)({
            _id: dietKindId,
        });
        if (!dietKind) {
            return res.sendStatus(404);
        }
        if (String(dietKind.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDietKind = yield (0, dietKind_service_1.getAndUpdateDietKind)({ _id: dietKindId }, update, {
            new: true,
        });
        return res.send(updatedDietKind);
    });
}
exports.updateDietKindController = updateDietKindController;
function getDietKindController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietKindId = req.params.dietKindId;
        const dietKind = yield (0, dietKind_service_1.getDietKind)({
            _id: dietKindId,
        });
        if (!dietKind) {
            return res.sendStatus(404);
        }
        if (String(dietKind.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(dietKind);
    });
}
exports.getDietKindController = getDietKindController;
function getDietKindsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietKinds = yield (0, dietKind_service_1.getDietKinds)({ user: userId });
        if (!dietKinds) {
            return res.sendStatus(404);
        }
        return res.send(dietKinds);
    });
}
exports.getDietKindsController = getDietKindsController;
function deleteDietKindController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietKindId = req.params.dietKindId;
        const dietKind = yield (0, dietKind_service_1.getDietKind)({
            _id: dietKindId,
        });
        if (!dietKind) {
            return res.sendStatus(404);
        }
        if (String(dietKind.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.sendStatus(200);
    });
}
exports.deleteDietKindController = deleteDietKindController;
