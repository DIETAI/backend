"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientsSchema = exports.getClientSchema = exports.deleteClientSchema = exports.updateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Last name is required',
        }),
        dateOfBirth: zod_1.z.string().transform((date) => new Date(date)),
        gender: zod_1.z.enum(['male', 'female']),
        physiologicalState: zod_1.z.enum(['lack', 'pregnancy', 'lactation']),
        email: (0, zod_1.string)().optional(),
        image: (0, zod_1.string)().optional(),
        phoneNumber: (0, zod_1.string)().optional(),
        onlineAccount: (0, zod_1.boolean)().optional(),
        street: (0, zod_1.string)().optional(),
        zipCode: (0, zod_1.string)().optional(),
        city: (0, zod_1.string)().optional(),
        notes: (0, zod_1.string)().optional(),
        diseases: (0, zod_1.array)(zod_1.z.enum([
            'flatulence',
            'constipation',
            'reflux',
            'obesity',
            'osteoporosis',
            'gout',
            'atherosclerosis',
            'hypertension',
            'tumor',
        ])).optional(),
        alergens: (0, zod_1.array)(zod_1.z.enum(['peanuts', 'rye', 'eggProtein'])).optional(),
        expectedBodyWeight: (0, zod_1.number)().positive().optional(),
        specificAims: (0, zod_1.array)((0, zod_1.string)()).optional(),
        likedProducts: (0, zod_1.array)((0, zod_1.string)()).optional(),
        dislikedProducts: (0, zod_1.array)((0, zod_1.string)()).optional(),
        pal: (0, zod_1.number)({
            required_error: 'Pal is required',
        })
            .min(1.3, 'Pal too short - should 1.3')
            .max(2.2, 'Pal too big - max 2.2'),
    }),
};
const params = {
    params: (0, zod_1.object)({
        clientId: (0, zod_1.string)({
            required_error: 'clientId is required',
        }),
    }),
};
const query = {
    query: (0, zod_1.object)({
        page: (0, zod_1.string)().optional(),
        itemsCount: (0, zod_1.string)().optional(),
    }),
};
exports.createClientSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateClientSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteClientSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getClientSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getClientsSchema = (0, zod_1.object)(Object.assign({}, query));
