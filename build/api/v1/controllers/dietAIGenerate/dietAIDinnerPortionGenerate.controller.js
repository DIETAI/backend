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
exports.dinnerPortionGenerateController = void 0;
const dinnerPortionGenerate_1 = require("../../services/dietAIGenerate/dinnerPortionGenerate/dinnerPortionGenerate");
function dinnerPortionGenerateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const generatedDinnerPortion = yield (0, dinnerPortionGenerate_1.dinnerPortionGenerate)(Object.assign({}, body));
        if (!generatedDinnerPortion) {
            return res.sendStatus(404);
        }
        return res.send(generatedDinnerPortion);
    });
}
exports.dinnerPortionGenerateController = dinnerPortionGenerateController;
