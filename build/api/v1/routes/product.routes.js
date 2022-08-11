"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const products_controller_1 = require("../controllers/products.controller");
//schema
const products_schema_1 = require("../schema/products.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:productId', [requireUser_1.default, (0, schema_middleware_1.default)(products_schema_1.getProductSchema)], products_controller_1.getProductController);
router.get('/', requireUser_1.default, products_controller_1.getProductsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(products_schema_1.createProductSchema)], products_controller_1.createProductController);
router.put('/:productId', [requireUser_1.default, (0, schema_middleware_1.default)(products_schema_1.updateProductSchema)], products_controller_1.updateProductController);
router.delete('/:productId', [requireUser_1.default, (0, schema_middleware_1.default)(products_schema_1.deleteProductSchema)], products_controller_1.deleteProductController);
exports.default = router;
