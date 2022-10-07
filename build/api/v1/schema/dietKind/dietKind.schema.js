"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietKindSchema = exports.deleteDietKindSchema = exports.updateDietKindSchema = exports.createDietKindSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        type: zod_1.z.enum(['healing', 'unconventional', 'other']),
        description: (0, zod_1.string)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dietKindId: (0, zod_1.string)({
            required_error: 'dietKindId is required',
        }),
    }),
};
exports.createDietKindSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietKindSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietKindSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietKindSchema = (0, zod_1.object)(Object.assign({}, params));
