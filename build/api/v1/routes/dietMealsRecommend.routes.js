"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controllers
const dietMeal_controller_1 = require("../controllers/diet/dietMeal.controller");
const dietDinner_controller_1 = require("../controllers/diet/dietDinner.controller");
const router = express_1.default.Router();
router.get('/', dietMeal_controller_1.getDietMealsToRecommendController);
router.get('/dinners', dietDinner_controller_1.getAllDietDinnersToMealRecommendController); //correct
exports.default = router;
