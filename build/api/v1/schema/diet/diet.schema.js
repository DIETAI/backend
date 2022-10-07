"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietSchema = exports.deleteDietSchema = exports.updateDietSchema = exports.createDietSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        //basicInfo
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        folder: (0, zod_1.string)().optional(),
        clientId: (0, zod_1.string)({
            required_error: 'Client is required',
        }),
        establishmentId: (0, zod_1.string)({
            required_error: 'Establishment is required',
        }),
        daysAmount: (0, zod_1.number)({
            required_error: 'Days amount is required',
        }),
        dayStart: (0, zod_1.date)().optional(),
        dayEnd: (0, zod_1.date)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        dietId: (0, zod_1.string)({
            required_error: 'dietId is required',
        }),
    }),
};
exports.createDietSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateDietSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteDietSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getDietSchema = (0, zod_1.object)(Object.assign({}, params));
