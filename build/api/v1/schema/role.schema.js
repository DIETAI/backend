"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleSchema = exports.deleteRoleSchema = exports.updateRoleSchema = exports.createRoleSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        type: zod_1.z.enum(['personal', 'patient', 'dietician', 'admin']),
    }),
};
const params = {
    params: (0, zod_1.object)({
        roleId: (0, zod_1.string)({
            required_error: 'roleId is required',
        }),
    }),
};
exports.createRoleSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateRoleSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteRoleSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getRoleSchema = (0, zod_1.object)(Object.assign({}, params));
