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
const dietDinner_service_1 = require("../../../diet/dietDinner.service");
const dietMeal_service_1 = require("../../../diet/dietMeal.service");
const mealRecommend = ({ mealDayId, mealType, currentDayRecommendDinners, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //w generowaniu diety przekazanie już wygenerowanych posiłków
        const recommendDietDaysRes = yield axios_1.default.post('https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-days-to-diet', { currentDayRecommendDinners: currentDayRecommendDinners });
        // const recommendDietDaysRes = { data: [] as IRecommendDietDayData[] };
        //zwraca rekomendowany dzień
        if (!recommendDietDaysRes || recommendDietDaysRes.data.length < 1) {
            throw 'Brak rekomendowanych dni';
        }
        // console.log({ recommendDietDaysRes });
        const recommendMeals = yield Promise.all(recommendDietDaysRes.data.map((day) => __awaiter(void 0, void 0, void 0, function* () {
            const dayMeal = (yield (0, dietMeal_service_1.getDietMeal)({
                dayId: day.dayId,
                type: mealType,
            }));
            const dayMealDinners = yield (0, dietDinner_service_1.getDietDinners)({
                dietMealId: dayMeal === null || dayMeal === void 0 ? void 0 : dayMeal._id,
            });
            const recommendMealObj = Object.assign(Object.assign({}, day), { dayMealId: dayMeal._id, dayMealType: dayMeal.type, dayMealDinners, dayMealGenerateType: 'recommend' });
            return recommendMealObj;
        })));
        const recommendMeal = recommendMeals.find((meal) => meal.dayMealDinners.length > 0);
        console.log({ recommendMeals, recommendMeal });
        if (!recommendMeal)
            throw 'Rekomendowany posiłek nie zawiera potraw';
        console.log('Rekomendacja udała się');
        return recommendMeal;
    }
    catch (e) {
        console.log(`Błąd podczas rekomendacji posiłku`);
        const allDietMeals = yield (0, dietMeal_service_1.getDietMeals)({});
        const allDietMealsValidDinners = [];
        const allDietMealsWithDinners = yield Promise.all(allDietMeals.map((dietMeal) => __awaiter(void 0, void 0, void 0, function* () {
            const mealDinners = yield (0, dietDinner_service_1.getDietDinners)({ dietMealId: dietMeal._id });
            if (mealDinners.length > 0) {
                allDietMealsValidDinners.push(dietMeal);
            }
        })));
        const filteredDietMealsByType = allDietMealsValidDinners.filter((dietMeal) => dietMeal.type === mealType);
        const randomDietMeal = filteredDietMealsByType[Math.floor(Math.random() * filteredDietMealsByType.length)];
        const dayMealDinners = yield (0, dietDinner_service_1.getDietDinners)({
            dietMealId: randomDietMeal._id,
        });
        const randomMealObj = {
            dayMealId: randomDietMeal._id,
            dayMealType: randomDietMeal.type,
            dayMealDinners,
            dayId: randomDietMeal.dayId,
            dayMealGenerateType: 'random',
        };
        console.log({ randomMealObj });
        return randomMealObj;
    }
});
exports.mealRecommend = mealRecommend;
