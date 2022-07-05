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
exports.deleteDietController = exports.getDietsController = exports.getDietQueryController = exports.getDietController = exports.updateDietController = exports.createDietController = void 0;
const diet_service_1 = require("../../services/diet/diet.service");
const dietDay_service_1 = require("../../services/diet/dietDay.service");
const dietEstablishment_service_1 = require("../../services/dietEstablishment.service");
const dietMeal_service_1 = require("../../services/diet/dietMeal.service");
const dietDinner_service_1 = require("../../services/diet/dietDinner.service");
const dinner_service_1 = require("../../services/dinner.service");
function createDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const diet = yield (0, diet_service_1.createDiet)(Object.assign(Object.assign({}, body), { user: userId }));
        if (!diet) {
            return res.sendStatus(404);
        }
        //getDietEstablishment
        const dietEstablishment = yield (0, dietEstablishment_service_1.getDietEstablishment)({
            _id: diet.establishmentId,
        });
        if (!dietEstablishment) {
            return res.sendStatus(404);
        }
        //create diet days
        const diet_days = Array.from(Array(diet.daysAmount).keys());
        const newDietDays = yield Promise.all(diet_days.map((key) => __awaiter(this, void 0, void 0, function* () {
            const newDietDay = yield (0, dietDay_service_1.createDietDay)({
                name: `Day ${key}`,
                order: key + 1,
                dietId: diet._id,
                user: userId,
                establishmentId: diet.establishmentId,
            });
            if (!newDietDay) {
                return res.sendStatus(404);
            }
            //newMeals
            const newDayMeals = yield Promise.all(dietEstablishment.meals.map((establishmentMeal, mealIndex) => __awaiter(this, void 0, void 0, function* () {
                const newDayMeal = yield (0, dietMeal_service_1.createDietMeal)({
                    name: establishmentMeal.name,
                    type: establishmentMeal.type,
                    establishmentId: dietEstablishment._id,
                    user: userId,
                    dietId: diet._id,
                    dayId: newDietDay._id,
                    order: mealIndex + 1,
                });
                if (!newDayMeal) {
                    return res.sendStatus(404);
                }
            })));
            return {
                day: newDietDay,
                dayMeals: newDayMeals,
            };
        })));
        if (!newDietDays) {
            return res.sendStatus(404);
        }
        return res.send(diet);
    });
}
exports.createDietController = createDietController;
function updateDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const update = req.body;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedDiet = yield (0, diet_service_1.getAndUpdateDiet)({ _id: dietId }, update, {
            new: true,
        });
        return res.send(updatedDiet);
    });
}
exports.updateDietController = updateDietController;
function getDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(diet);
    });
}
exports.getDietController = getDietController;
function getDietQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        const dietDays = yield (0, dietDay_service_1.getDietDays)({
            dietId: diet._id,
        });
        if (!dietDays) {
            return res.sendStatus(404);
        }
        // const dietMeals = await getDietMeals({
        //   dietId: diet._id,
        // });
        // if (!dietMeals) {
        //   return res.sendStatus(404);
        // }
        // const dietDinners = await getDietDinners({
        //   dietId: diet._id,
        // });
        // console.log({ dietDinners });
        // if (!dietDinners) {
        //   return res.sendStatus(404);
        // }
        // const q = {
        //   ...diet,
        //   days: getDietDays({
        //     dietId: diet._id
        //   }).then((days) =>
        //    days.map((dietDay) => ({
        //     ...dietDay,
        //     meals: getDietMeals({
        //       dayId: dietDay._id
        //     }).then((meals) => meals.map((dayMeal) => ({
        //       ...dayMeal,
        //       dinners: getDietDinners({
        //         dietMealId: dayMeal._id
        //       }).then((dinners) => dinners.map((mealDinner) => ({
        //         ...mealDinner,
        //         dinner: getDinner({
        //           _id: mealDinner.dinnerId
        //         }).then((dinner) => dinner)
        //       })))
        //     })))
        //   })))
        // }
        const dietDaysQuery = yield Promise.all(dietDays.map((dietDay) => __awaiter(this, void 0, void 0, function* () {
            const dietMealsData = yield (0, dietMeal_service_1.getDietMeals)({
                dayId: dietDay._id,
            });
            const meals = yield Promise.all(dietMealsData.map((dietMeal) => __awaiter(this, void 0, void 0, function* () {
                const dietDinnersData = yield (0, dietDinner_service_1.getDietDinners)({
                    dietMealId: dietMeal._id,
                });
                const dinners = yield Promise.all(dietDinnersData.map((dietDinner) => __awaiter(this, void 0, void 0, function* () {
                    const dinner = yield (0, dinner_service_1.getDinner)(dietDinner.dinnerId);
                    return Object.assign(Object.assign({}, dietDinner), { dinner });
                })));
                const mealObj = Object.assign(Object.assign({}, dietMeal), { dinners });
                return mealObj;
            })));
            return Object.assign(Object.assign({}, dietDay), { meals });
        })));
        const dietQueryObj = Object.assign(Object.assign({}, diet), { days: dietDaysQuery });
        // const dietQueryObj = {
        //   ...diet,
        //   days: dietDays.map((dietDay) => ({
        //     ...dietDay,
        //     meals: dietMeals
        //       .filter(
        //         (dietMeal) => dietMeal.dayId.toString() === dietDay._id.toString()
        //       )
        //       .map((dayMeal) => ({
        //         ...dayMeal,
        //         dinners: dietDinners
        //           .filter(
        //             (dietDinner) =>
        //               dietDinner.dietMealId.toString() === dayMeal._id.toString()
        //           )
        //           .map((mealDinner) => ({
        //             ...mealDinner,
        //             dinner: {},
        //           })),
        //       })),
        //   })),
        // };
        return res.send(dietQueryObj);
    });
}
exports.getDietQueryController = getDietQueryController;
function getDietsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const diets = yield (0, diet_service_1.getDiets)({ user: userId });
        if (!diets) {
            return res.sendStatus(404);
        }
        return res.send(diets);
    });
}
exports.getDietsController = getDietsController;
function deleteDietController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const dietId = req.params.dietId;
        const diet = yield (0, diet_service_1.getDiet)({
            _id: dietId,
        });
        if (!diet) {
            return res.sendStatus(404);
        }
        if (String(diet.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, diet_service_1.deleteDiet)({ _id: dietId });
        return res.sendStatus(200);
    });
}
exports.deleteDietController = deleteDietController;
