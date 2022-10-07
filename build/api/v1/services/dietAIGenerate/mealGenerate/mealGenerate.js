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
exports.mealGenerate = void 0;
//functions
const mealRecommend_1 = require("./mealRecommend/mealRecommend");
const mealGenerate = ({ mealDayId }) => __awaiter(void 0, void 0, void 0, function* () {
    const recommendMeals = yield (0, mealRecommend_1.mealRecommend)({ mealDayId });
    if (!recommendMeals || recommendMeals.length < 1)
        return; //random dietMeal
    const recommendMeal = recommendMeals[0];
    //mealDinnersMacroPortion
    //mealDinnersCartesianGroups
    //mealDinnersSelectGroups
    return recommendMeal;
});
exports.mealGenerate = mealGenerate;
