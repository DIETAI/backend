"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoiceSchema = exports.updateInvoiceSchema = exports.createInvoiceSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        companyName: (0, zod_1.string)({
            required_error: 'Company name is required',
        }),
        taxpayerIdentificationNumber: (0, zod_1.string)({
            required_error: 'Taxpayer identification number is required',
        }),
        zipCode: (0, zod_1.string)({
            required_error: 'ZIP code is required',
        }),
        city: (0, zod_1.string)({
            required_error: 'City is required',
        }),
        street: (0, zod_1.string)({
            required_error: 'Street is required',
        }),
        houseNumber: (0, zod_1.string)({
            required_error: 'House number is required',
        }),
        apartmentNumber: (0, zod_1.string)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        invoiceId: (0, zod_1.string)({
            required_error: 'invoiceId is required',
        }),
    }),
};
exports.createInvoiceSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateInvoiceSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteInvoiceSchema = (0, zod_1.object)(Object.assign({}, params));
