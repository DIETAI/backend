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
exports.mealRecommend = void 0;
const axios_1 = __importDefault(require("axios"));
const mealRecommend = ({ mealDayId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recommendMealsRes = yield axios_1.default.post('https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-dinners', mealDayId);
        console.log({ recommendMealsRes });
        return recommendMealsRes.data;
    }
    catch (e) {
        return;
    }
    //przesłanie do algorytmu mealDayId => wybranie wszystkich dietDinners gdzie dietDinner.dayId === mealDayId
    // const allDietDinners: IRecommendDietDinnerArg[] = dietDinners.map(
    //   (dietDinner) => ({
    //     _id: dietDinner._id,
    //     userId: dietDinner.user,
    //     'diet._id': dietDinner.dietId + 'sed', //nie może być takie same id diety jak już dodanych dietDinners
    //     'diet.name': dietDinner.diet.name,
    //     'diet.clientId': dietDinner.diet.clientId,
    //     'diet.clientPreferencesGroup': 1,
    //     'dinner._id': dietDinner.dinner._id,
    //     'dinner.name': dietDinner.dinner.name,
    //     'dinner.products': ['dadqdqd', 'dqdwq'],
    //     'dinner.likedProductsPoints': 0,
    //     'meal._id': dietDinner.dietMealId,
    //     'meal.name': dietDinner.meal.name,
    //     'meal.type': dietDinner.meal.type,
    //   })
    // );
});
exports.mealRecommend = mealRecommend;
