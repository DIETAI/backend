"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const session_controller_1 = require("../controllers/session.controller");
//schema
const session_schema_1 = require("../schema/session.schema");
//middleware
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const router = express_1.default.Router();
router.post('/', (0, schema_middleware_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionController);
router.get('/', requireUser_1.default, session_controller_1.getUserSessionsController);
router.delete('/', requireUser_1.default, session_controller_1.deleteUserSessionController);
// router.get('/oauth/google', googleOAuthController);
exports.default = router;
