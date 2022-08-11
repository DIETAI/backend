"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dinner_controller_1 = require("../../controllers/dinner/dinner.controller");
//schema
const dinner_schema_1 = require("../../schema/dinners/dinner.schema");
//middleware
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:dinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dinner_schema_1.getDinnerSchema)], dinner_controller_1.getDinnerController);
router.get('/', requireUser_1.default, dinner_controller_1.getDinnersController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dinner_schema_1.createDinnerSchema)], dinner_controller_1.createDinnerController);
router.put('/:dinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dinner_schema_1.updateDinnerSchema)], dinner_controller_1.updateDinnerController);
router.delete('/:dinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dinner_schema_1.deleteDinnerSchema)], dinner_controller_1.deleteDinnerController);
exports.default = router;
