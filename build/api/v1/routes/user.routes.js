"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// //controllers
const user_controller_1 = require("../controllers/user.controller");
//schema
const user_schema_1 = require("../schema/user.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/', [requireUser_1.default], user_controller_1.getUserController);
router.put('/', [requireUser_1.default], user_controller_1.updateUserController);
router.post('/', [(0, schema_middleware_1.default)(user_schema_1.createUserSchema)], user_controller_1.createUserController);
exports.default = router;
