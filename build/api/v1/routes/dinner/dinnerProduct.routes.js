"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dinnerProduct_controller_1 = require("../../controllers/dinner/dinnerProduct.controller");
//schema
const dinnerProducts_schema_1 = require("../../schema/dinners/dinnerProducts.schema");
//middleware
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/', dinnerProduct_controller_1.getAllDinnerProductsController);
router.get('/allToRecommend', dinnerProduct_controller_1.getDinnerProductsToRecommendController);
router.get('/populate', dinnerProduct_controller_1.getDinnerProductsPopulateController);
router.get('/:dinnerProductId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.getDinnerProductSchema)], dinnerProduct_controller_1.getDinnerProductController);
router.get('/:dinnerProductId/query', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.getDinnerProductSchema)], dinnerProduct_controller_1.getDinnerProductQueryController);
router.get('/dinner/:dinnerId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.getDinnerProductsSchema)], dinnerProduct_controller_1.getDinnerProductsController);
router.get('/dinner/:dinnerId/query', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.getDinnerProductsSchema)], dinnerProduct_controller_1.getDinnerProductsQueryController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.createDinnerProductSchema)], dinnerProduct_controller_1.createDinnerProductController);
router.put('/:dinnerProductId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.updateDinnerProductSchema)], dinnerProduct_controller_1.updateDinnerProductController);
router.delete('/:dinnerProductId', [requireUser_1.default, (0, schema_middleware_1.default)(dinnerProducts_schema_1.deleteDinnerProductSchema)], dinnerProduct_controller_1.deleteDinnerProductController);
exports.default = router;
