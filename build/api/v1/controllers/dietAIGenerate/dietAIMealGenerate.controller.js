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
exports.mealGenerateController = void 0;
const mealGenerate_1 = require("../../services/dietAIGenerate/mealGenerate/mealGenerate");
function mealGenerateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const generatedMeal = yield (0, mealGenerate_1.mealGenerate)(Object.assign({}, body));
        if (!generatedMeal) {
            return res.sendStatus(404);
        }
        return res.send(generatedMeal);
    });
}
exports.mealGenerateController = mealGenerateController;
