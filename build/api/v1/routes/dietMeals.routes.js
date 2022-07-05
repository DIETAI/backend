"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietMeal_controller_1 = require("../controllers/diet/dietMeal.controller");
//schema
const dietMeal_schema_1 = require("../schema/diet/dietMeal.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietMealId', [requireUser_1.default, (0, schema_middleware_1.default)(dietMeal_schema_1.getDietDayMealSchema)], dietMeal_controller_1.getDietMealController);
router.get('/day/:dietDayId', [requireUser_1.default, (0, schema_middleware_1.default)(dietMeal_schema_1.getDietDayMealsSchema)], dietMeal_controller_1.getDietMealsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietMeal_schema_1.createDietDayMealSchema)], dietMeal_controller_1.createDietMealController);
router.put('/:dietMealId', [requireUser_1.default, (0, schema_middleware_1.default)(dietMeal_schema_1.updateDietDayMealSchema)], dietMeal_controller_1.updateDietMealController);
router.delete('/:dietMealId', [requireUser_1.default, (0, schema_middleware_1.default)(dietMeal_schema_1.deleteDietDayMealSchema)], dietMeal_controller_1.deleteDietMealController);
exports.default = router;
