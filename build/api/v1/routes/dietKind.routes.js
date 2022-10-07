"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietKind_controller_1 = require("../controllers/dietKind/dietKind.controller");
//schema
const dietKind_schema_1 = require("../schema/dietKind/dietKind.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietKindId', [requireUser_1.default, (0, schema_middleware_1.default)(dietKind_schema_1.getDietKindSchema)], dietKind_controller_1.getDietKindController);
// router.get('/:dietId/days/:dayId/meals/:mealId/dinners/:dinnerId/')
router.get('/', requireUser_1.default, dietKind_controller_1.getDietKindsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietKind_schema_1.createDietKindSchema)], dietKind_controller_1.createDietKindController);
router.put('/:dietKindId', [requireUser_1.default, (0, schema_middleware_1.default)(dietKind_schema_1.updateDietKindSchema)], dietKind_controller_1.updateDietKindController);
router.delete('/:dietKindId', [requireUser_1.default, (0, schema_middleware_1.default)(dietKind_schema_1.deleteDietKindSchema)], dietKind_controller_1.deleteDietKindController);
exports.default = router;
