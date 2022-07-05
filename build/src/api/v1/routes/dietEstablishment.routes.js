"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietEstablishment_controller_1 = require("../controllers/dietEstablishment.controller");
//schema
const dietEstablishments_schema_1 = require("../schema/dietEstablishments.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dietEstablishmentId', [requireUser_1.default, (0, schema_middleware_1.default)(dietEstablishments_schema_1.getDietEstablishmentSchema)], dietEstablishment_controller_1.getDietEstablishmentController);
router.get('/', requireUser_1.default, dietEstablishment_controller_1.getDietEstablishmentsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dietEstablishments_schema_1.createDietEstablishmentSchema)], dietEstablishment_controller_1.createDietEstablishmentController);
router.put('/:dietEstablishmentId', [requireUser_1.default, (0, schema_middleware_1.default)(dietEstablishments_schema_1.updateDietEstablishmentSchema)], dietEstablishment_controller_1.updateDietEstablishmentController);
router.delete('/:dietEstablishmentId', [requireUser_1.default, (0, schema_middleware_1.default)(dietEstablishments_schema_1.deleteDietEstablishmentSchema)], dietEstablishment_controller_1.deleteDietEstablishmentController);
exports.default = router;
