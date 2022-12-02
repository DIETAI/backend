"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const asset_controller_1 = require("../controllers/asset.controller");
//schema
const asset_schema_1 = require("../schema/asset.schema");
//middleware
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const router = express_1.default.Router();
router.get('/:assetId', [requireUser_1.default, (0, schema_middleware_1.default)(asset_schema_1.getAssetSchema)], asset_controller_1.getAssetController);
router.get('/', requireUser_1.default, asset_controller_1.getAssetsController);
router.post('/', [requireUser_1.default, (0, schema_middleware_1.default)(asset_schema_1.createAssetSchema)], asset_controller_1.createAssetController);
router.post('/upload', [requireUser_1.default, (0, schema_middleware_1.default)(asset_schema_1.uploadImageSchema)], asset_controller_1.uploadImageController);
router.put('/:assetId', [requireUser_1.default, (0, schema_middleware_1.default)(asset_schema_1.updateAssetSchema)], asset_controller_1.updateAssetController);
router.delete('/:assetId', [requireUser_1.default, (0, schema_middleware_1.default)(asset_schema_1.deleteAssetSchema)], asset_controller_1.deleteAssetController);
exports.default = router;
