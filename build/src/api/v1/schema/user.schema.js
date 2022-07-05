"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        // uid: string({
        //   required_error: 'uid is required',
        // }),
        // role: string({
        //   required_error: 'role is required',
        // }),
        // providerId: string({
        //   required_error: 'providerId is required',
        // }),
        // phoneNumber: string({
        //   required_error: 'phoneNumber is required',
        // }),
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'LastName is required',
        }),
        fullName: (0, zod_1.string)({
            required_error: 'FullName is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
        photoURL: (0, zod_1.string)().optional(),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
        // emailVerified: boolean(),
    }),
});
