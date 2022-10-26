"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDinnerPortionSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        dietId: (0, zod_1.string)({ required_error: 'Diet id is required' }),
        dinnerId: (0, zod_1.string)({ required_error: 'Dinner id is required' }),
        mealEstablishment: (0, zod_1.object)({
            kcal: (0, zod_1.number)({
                required_error: 'Kcal is required',
                invalid_type_error: 'Kcal must be a number',
            }),
            //macrohydrates
            // protein: object({
            //   gram: number({
            //     required_error: 'Protein gram is required',
            //     invalid_type_error: 'Protein gram must be a number',
            //   }),
            //   kcal: number({
            //     required_error: 'Protein kcal is required',
            //     invalid_type_error: 'Protein kcal must be a number',
            //   }),
            //   procent: number({
            //     required_error: 'Protein procent is required',
            //     invalid_type_error: 'Protein procent must be a number',
            //   }),
            //   min_procent: number({
            //     required_error: 'Min protein procent is required',
            //     invalid_type_error: 'Min protein procent must be a number',
            //   }),
            //   max_procent: number({
            //     required_error: 'Max protein procent is required',
            //     invalid_type_error: 'Max protein procent must be a number',
            //   }),
            //   min_gram: number({
            //     required_error: 'Min protein gram is required',
            //     invalid_type_error: 'Min protein gram must be a number',
            //   }),
            //   max_gram: number({
            //     required_error: 'Max protein gram is required',
            //     invalid_type_error: 'Max protein gram must be a number',
            //   }),
            //   min_kcal: number({
            //     required_error: 'Min protein kcal is required',
            //     invalid_type_error: 'Min protein kcal must be a number',
            //   }),
            //   max_kcal: number({
            //     required_error: 'Max protein kcal is required',
            //     invalid_type_error: 'Max protein kcal must be a number',
            //   }),
            // }),
            // fat: object({
            //   gram: number({
            //     required_error: 'Fat gram is required',
            //     invalid_type_error: 'Fat gram must be a number',
            //   }),
            //   kcal: number({
            //     required_error: 'Fat kcal is required',
            //     invalid_type_error: 'Fat kcal must be a number',
            //   }),
            //   procent: number({
            //     required_error: 'Fat procent is required',
            //     invalid_type_error: 'Fat procent procent must be a number',
            //   }),
            //   min_procent: number({
            //     required_error: 'Min fat procent is required',
            //     invalid_type_error: 'Min fat procent must be a number',
            //   }),
            //   max_procent: number({
            //     required_error: 'Max fat procent is required',
            //     invalid_type_error: 'Max fat procent must be a number',
            //   }),
            //   min_gram: number({
            //     required_error: 'Min fat gram is required',
            //     invalid_type_error: 'Min fat gram must be a number',
            //   }),
            //   max_gram: number({
            //     required_error: 'Max fat gram is required',
            //     invalid_type_error: 'Max fat gram must be a number',
            //   }),
            //   min_kcal: number({
            //     required_error: 'Min fat kcal is required',
            //     invalid_type_error: 'Min fat kcal must be a number',
            //   }),
            //   max_kcal: number({
            //     required_error: 'Max fat kcal is required',
            //     invalid_type_error: 'Max fat kcal must be a number',
            //   }),
            // }),
            // carbohydrates: object({
            //   gram: number({
            //     required_error: 'Carbohydrates gram is required',
            //     invalid_type_error: 'Carbohydrates gram must be a number',
            //   }),
            //   kcal: number({
            //     required_error: 'Carbohydrates kcal is required',
            //     invalid_type_error: 'Carbohydrates kcal must be a number',
            //   }),
            //   procent: number({
            //     required_error: 'Carbohydrates procent is required',
            //     invalid_type_error: 'Carbohydrates procent procent must be a number',
            //   }),
            //   min_procent: number({
            //     required_error: 'Min carbohydrates procent is required',
            //     invalid_type_error: 'Min carbohydrates procent must be a number',
            //   }),
            //   max_procent: number({
            //     required_error: 'Max carbohydrates procent is required',
            //     invalid_type_error: 'Max carbohydrates procent must be a number',
            //   }),
            //   min_gram: number({
            //     required_error: 'Min carbohydrates gram is required',
            //     invalid_type_error: 'Min carbohydrates gram must be a number',
            //   }),
            //   max_gram: number({
            //     required_error: 'Max carbohydrates gram is required',
            //     invalid_type_error: 'Max carbohydrates gram must be a number',
            //   }),
            //   min_kcal: number({
            //     required_error: 'Min carbohydrates kcal is required',
            //     invalid_type_error: 'Min carbohydrates kcal must be a number',
            //   }),
            //   max_kcal: number({
            //     required_error: 'Max carbohydrates kcal is required',
            //     invalid_type_error: 'Max carbohydrates kcal must be a number',
            //   }),
            // }),
        }),
    }),
};
exports.generateDinnerPortionSchema = (0, zod_1.object)(Object.assign({}, payload));
