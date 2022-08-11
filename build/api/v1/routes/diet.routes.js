"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const diet_controller_1 = require("../controllers/diet/diet.controller");
//schema
const diet_schema_1 = require("../schema/diet/diet.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietId', [requireUser_1.default, (0, schema_middleware_1.default)(diet_schema_1.getDietSchema)], diet_controller_1.getDietController);
// router.get('/:dietId/days/:dayId/meals/:mealId/dinners/:dinnerId/')
router.get('/:dietId/query', [requireUser_1.default, (0, schema_middleware_1.default)(diet_schema_1.getDietSchema)], diet_controller_1.getDietQueryController);
router.get('/', requireUser_1.default, diet_controller_1.getDietsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(diet_schema_1.createDietSchema)], diet_controller_1.createDietController);
router.put('/:dietId', [requireUser_1.default, (0, schema_middleware_1.default)(diet_schema_1.updateDietSchema)], diet_controller_1.updateDietController);
router.delete('/:dietId', [requireUser_1.default, (0, schema_middleware_1.default)(diet_schema_1.deleteDietSchema)], diet_controller_1.deleteDietController);
exports.default = router;
