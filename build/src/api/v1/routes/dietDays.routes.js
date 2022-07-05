"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietDay_controller_1 = require("../controllers/diet/dietDay.controller");
//schema
const dietDay_schema_1 = require("../schema/diet/dietDay.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietDayId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDay_schema_1.getDietDaySchema)], dietDay_controller_1.getDietDayController);
router.get('/diet/:dietId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDay_schema_1.getDietDaysSchema)], dietDay_controller_1.getDietDaysController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietDay_schema_1.createDietDaySchema)], dietDay_controller_1.createDietDayController);
router.put('/:dietDayId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDay_schema_1.updateDietDaySchema)], dietDay_controller_1.updateDietDayController);
router.delete('/:dietDayId', [requireUser_1.default, (0, schema_middleware_1.default)(dietDay_schema_1.deleteDietDaySchema)], dietDay_controller_1.deleteDietDayController);
exports.default = router;
