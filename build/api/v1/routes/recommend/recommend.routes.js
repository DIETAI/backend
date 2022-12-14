"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietDinner_controller_1 = require("../../controllers/diet/dietDinner.controller");
const router = express_1.default.Router();
router.get('/dietDinners', dietDinner_controller_1.getDietDinnersToDinnerRecommendController); //correct aws
exports.default = router;
