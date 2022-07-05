"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const subscriptionPlan_controller_1 = require("../controllers/subscriptionPlan/subscriptionPlan.controller");
//schema
const subscriptionPlan_schema_1 = require("../schema/subscriptionPlan/subscriptionPlan.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:subscriptionPlanId', [requireUser_1.default, (0, schema_middleware_1.default)(subscriptionPlan_schema_1.getSubscriptionPlanSchema)], subscriptionPlan_controller_1.getSubscriptionPlanController);
router.get('/', requireUser_1.default, subscriptionPlan_controller_1.getSubscriptionPlansController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(subscriptionPlan_schema_1.createSubscriptionPlanSchema)], subscriptionPlan_controller_1.createSubscriptionPlanController);
router.put('/:subscriptionPlanId', [requireUser_1.default, (0, schema_middleware_1.default)(subscriptionPlan_schema_1.updateSubscriptionPlanSchema)], subscriptionPlan_controller_1.updateSubscriptionPlanController);
router.delete('/:subscriptionPlanId', [requireUser_1.default, (0, schema_middleware_1.default)(subscriptionPlan_schema_1.deleteSubscriptionPlanSchema)], subscriptionPlan_controller_1.deleteSubscriptionPlanController);
exports.default = router;
