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
exports.deleteDinnerController = exports.getDinnersController = exports.getDinnerController = exports.updateDinnerController = exports.createDinnerController = void 0;
const dinner_service_1 = require("../services/dinner.service");
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
        return res.send(dinner);
    });
}
exports.getDinnerController = getDinnerController;
function getDinnersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
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
        return res.sendStatus(200);
    });
}
exports.deleteDinnerController = deleteDinnerController;
