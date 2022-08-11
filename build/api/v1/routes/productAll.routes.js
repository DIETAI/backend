"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const products_controller_1 = require("../controllers/products.controller");
const router = express_1.default.Router();
router.get('/', products_controller_1.getAllProductsController);
exports.default = router;
