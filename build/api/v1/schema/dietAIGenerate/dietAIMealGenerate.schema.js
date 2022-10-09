"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMealSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        mealId: (0, zod_1.string)({ required_error: 'Meal id is required' }),
    }),
};
exports.generateMealSchema = (0, zod_1.object)(Object.assign({}, payload));
