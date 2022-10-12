"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDaySchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        currentDayId: (0, zod_1.string)({ required_error: 'Meal id is required' }),
        mealsToGenerate: (0, zod_1.array)((0, zod_1.object)({
            uid: (0, zod_1.string)({ required_error: 'Meal uid is required' }),
            type: zod_1.z.enum([
                'breakfast',
                'second_breakfast',
                'lunch',
                'snack',
                'dinner',
            ]),
        })),
        generateMealsSettings: zod_1.z.enum([
            'changeAmountAddedMeals',
            'saveAddedMeals',
            'newMeals',
        ]),
    }),
};
exports.generateDaySchema = (0, zod_1.object)(Object.assign({}, payload));
