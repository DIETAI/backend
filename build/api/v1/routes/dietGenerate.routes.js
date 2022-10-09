"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietAIMealGenerate_controller_1 = require("../controllers/dietAIGenerate/dietAIMealGenerate.controller");
//schema
const dietAIMealGenerate_schema_1 = require("../schema/dietAIGenerate/dietAIMealGenerate.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.post('/meal', [requireUser_1.default, (0, schema_middleware_1.default)(dietAIMealGenerate_schema_1.generateMealSchema)], dietAIMealGenerate_controller_1.mealGenerateController);
exports.default = router;
