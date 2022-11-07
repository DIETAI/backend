"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendarSchema = exports.deleteCalendarSchema = exports.updateCalendarSchema = exports.createCalendarSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required',
        }),
        description: (0, zod_1.string)().optional(),
        date: zod_1.z.string().transform((date) => new Date(date)),
    }),
};
const params = {
    params: (0, zod_1.object)({
        calendarId: (0, zod_1.string)({
            required_error: 'calendarId is required',
        }),
    }),
};
exports.createCalendarSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateCalendarSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteCalendarSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getCalendarSchema = (0, zod_1.object)(Object.assign({}, params));
