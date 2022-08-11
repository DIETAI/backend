"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dinnerPortion_controller_1 = require("../../controllers/dinner/dinnerPortion.controller");
//schema
const dinnerPortions_schema_1 = require("../../schema/dinners/dinnerPortions.schema");
//middleware
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dinnerPortionId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.getDinnerPortionSchema)], dinnerPortion_controller_1.getDinnerPortionController);
router.get('/dinner/:dinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.getDinnerPortionsSchema)], dinnerPortion_controller_1.getDinnerPortionsController);
router.get('/dinner/:dinnerId/query', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.getDinnerPortionsSchema)], dinnerPortion_controller_1.getDinnerPortionsQueryController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.createDinnerPortionSchema)], dinnerPortion_controller_1.createDinnerPortionController);
router.put('/:dinnerPortionId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.updateDinnerPortionSchema)], dinnerPortion_controller_1.updateDinnerPortionController);
router.delete('/:dinnerPortionId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerPortions_schema_1.deleteDinnerPortionSchema)], dinnerPortion_controller_1.deleteDinnerPortionController);
exports.default = router;
