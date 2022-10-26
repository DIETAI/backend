"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietAIDinnerPortionGenerate_controller_1 = require("../controllers/dietAIGenerate/dietAIDinnerPortionGenerate.controller");
//schema
const dietAIDinnerPortionGenerate_schema_1 = require("../schema/dietAIGenerate/dietAIDinnerPortionGenerate.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietAIDinnerPortionGenerate_schema_1.generateDinnerPortionSchema)], dietAIDinnerPortionGenerate_controller_1.dinnerPortionGenerateController);
exports.default = router;
