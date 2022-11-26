"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvoiceController = exports.getInvoicesController = exports.getInvoiceController = exports.updateInvoiceController = exports.createInvoiceController = void 0;
const invoice_service_1 = require("../../services/account/invoice.service");
function createInvoiceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const invoice = yield (0, invoice_service_1.createInvoice)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(invoice);
    });
}
exports.createInvoiceController = createInvoiceController;
function updateInvoiceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const invoiceId = req.params.invoiceId;
        const update = req.body;
        const invoice = yield (0, invoice_service_1.getInvoice)({
            _id: invoiceId,
        });
        if (!invoice) {
            return res.sendStatus(404);
        }
        if (String(invoice.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedInvoice = yield (0, invoice_service_1.getAndUpdateInvoice)({ _id: invoiceId }, update, {
            new: true,
        });
        return res.send(updatedInvoice);
    });
}
exports.updateInvoiceController = updateInvoiceController;
function getInvoiceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const invoiceId = req.params.invoiceId;
        const invoice = yield (0, invoice_service_1.getInvoice)({
            _id: invoiceId,
        });
        if (!invoice) {
            return res.sendStatus(404);
        }
        if (String(invoice.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(invoice);
    });
}
exports.getInvoiceController = getInvoiceController;
function getInvoicesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const invoices = yield (0, invoice_service_1.getInvoices)({ user: userId });
        if (!invoices) {
            return res.sendStatus(404);
        }
        return res.send(invoices);
    });
}
exports.getInvoicesController = getInvoicesController;
function deleteInvoiceController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const invoiceId = req.params.invoiceId;
        const invoice = yield (0, invoice_service_1.getInvoice)({
            _id: invoiceId,
        });
        if (!invoice) {
            return res.sendStatus(404);
        }
        if (String(invoice.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, invoice_service_1.deleteInvoice)({ _id: invoiceId });
        return res.sendStatus(200);
    });
}
exports.deleteInvoiceController = deleteInvoiceController;
