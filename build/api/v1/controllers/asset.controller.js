"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssetController = exports.getAssetsController = exports.getAssetController = exports.updateAssetController = exports.createAssetController = void 0;
const asset_service_1 = require("../services/asset.service");
function createAssetController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const asset = yield (0, asset_service_1.createAsset)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(asset);
    });
}
exports.createAssetController = createAssetController;
function updateAssetController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const assetId = req.params.assetId;
        const update = req.body;
        const asset = yield (0, asset_service_1.getAsset)({
            _id: assetId,
        });
        if (!asset) {
            return res.sendStatus(404);
        }
        if (String(asset.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedAsset = yield (0, asset_service_1.getAndUpdateAsset)({ _id: assetId }, update, {
            new: true,
        });
        return res.send(updatedAsset);
    });
}
exports.updateAssetController = updateAssetController;
function getAssetController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const assetId = req.params.assetId;
        const asset = yield (0, asset_service_1.getAsset)({
            _id: assetId,
        });
        if (!asset) {
            return res.sendStatus(404);
        }
        if (String(asset.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(asset);
    });
}
exports.getAssetController = getAssetController;
function getAssetsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const assets = yield (0, asset_service_1.getAssets)({ user: userId });
        if (!assets) {
            return res.sendStatus(404);
        }
        return res.send(assets);
    });
}
exports.getAssetsController = getAssetsController;
function deleteAssetController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const assetId = req.params.assetId;
        const asset = yield (0, asset_service_1.getAsset)({
            _id: assetId,
        });
        if (!asset) {
            return res.sendStatus(404);
        }
        if (String(asset.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, asset_service_1.deleteAsset)({ _id: assetId });
        return res.sendStatus(200);
    });
}
exports.deleteAssetController = deleteAssetController;
