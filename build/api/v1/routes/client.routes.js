"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const client_controller_1 = require("../controllers/client.controller");
//schema
const client_schema_1 = require("../schema/client.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:clientId', [requireUser_1.default, (0, schema_middleware_1.default)(client_schema_1.getClientSchema)], client_controller_1.getClientController);
router.get('/', requireUser_1.default, client_controller_1.getClientsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(client_schema_1.createClientSchema)], client_controller_1.createClientController);
router.put('/:clientId', [requireUser_1.default, (0, schema_middleware_1.default)(client_schema_1.updateClientSchema)], client_controller_1.updateClientController);
router.delete('/:clientId', [requireUser_1.default, (0, schema_middleware_1.default)(client_schema_1.deleteClientSchema)], client_controller_1.deleteClientController);
exports.default = router;
