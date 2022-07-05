"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const measurement_controller_1 = require("../controllers/measurement.controller");
//schema
const measurement_schema_1 = require("../schema/measurement.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:measurementId', [requireUser_1.default, (0, schema_middleware_1.default)(measurement_schema_1.getMeasurementSchema)], measurement_controller_1.getMeasurementController);
router.get('/', requireUser_1.default, measurement_controller_1.getMeasurementsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(measurement_schema_1.createMeasurementSchema)], measurement_controller_1.createMeasurementController);
router.put('/:measurementId', [requireUser_1.default, (0, schema_middleware_1.default)(measurement_schema_1.updateMeasurementSchema)], measurement_controller_1.updateMeasurementController);
router.delete('/:measurementId', [requireUser_1.default, (0, schema_middleware_1.default)(measurement_schema_1.deleteMeasurementSchema)], measurement_controller_1.deleteMeasurementController);
exports.default = router;
