"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietDinner_controller_1 = require("../controllers/diet/dietDinner.controller");
//schema
const dietDinner_schema_1 = require("../schema/diet/dietDinner.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietDinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDinner_schema_1.getDietDinnerSchema)], dietDinner_controller_1.getDietDinnerController);
router.get('/meal/:dietMealId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDinner_schema_1.getDietDinnersSchema)], dietDinner_controller_1.getDietDinnersController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietDinner_schema_1.createDietDinnerSchema)], dietDinner_controller_1.createDietDinnerController);
router.put('/:dietDinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDinner_schema_1.updateDietDinnerSchema)], dietDinner_controller_1.updateDietDinnerController);
router.delete('/:dietDinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDinner_schema_1.deleteDietDinnerSchema)], dietDinner_controller_1.deleteDietDinnerController);
exports.default = router;
