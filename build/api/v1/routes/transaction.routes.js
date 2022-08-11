"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const transaction_controller_1 = require("../controllers/transaction/transaction.controller");
const transaction_webhook_1 = require("../controllers/transaction/transaction.webhook");
//schema
const transaction_schema_1 = require("../schema/transaction/transaction.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(transaction_schema_1.createTransactionSchema)], transaction_controller_1.createStripeOrderSessionController);
router.post('/webhook', 
// express.raw({ type: '*/*' }),
// express.raw({ type: 'application/json' }),
transaction_webhook_1.createStripePaymentWebhook);
exports.default = router;
