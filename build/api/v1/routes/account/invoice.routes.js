"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const invoice_controller_1 = require("../../controllers/account/invoice.controller");
//schema
const invoice_schema_1 = require("../../schema/account/invoice.schema");
//middleware
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/', requireUser_1.default, invoice_controller_1.getInvoiceController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(invoice_schema_1.createInvoiceSchema)], invoice_controller_1.createInvoiceController);
router.put('/:invoiceId', [requireUser_1.default, (0, schema_middleware_1.default)(invoice_schema_1.updateInvoiceSchema)], invoice_controller_1.updateInvoiceController);
router.delete('/:invoiceId', [requireUser_1.default, (0, schema_middleware_1.default)(invoice_schema_1.deleteInvoiceSchema)], invoice_controller_1.deleteInvoiceController);
exports.default = router;
