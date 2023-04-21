"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'LastName is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }),
});
exports.editUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'LastName is required',
        }),
        fullName: (0, zod_1.string)({
            required_error: 'FullName is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }),
        avatar: (0, zod_1.string)().optional(),
    }),
});
