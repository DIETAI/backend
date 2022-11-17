"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
// import roleRoutes from './role.routes';
const measurement_routes_1 = __importDefault(require("./measurement.routes"));
const dietEstablishment_routes_1 = __importDefault(require("./dietEstablishment.routes"));
const dietKind_routes_1 = __importDefault(require("./dietKind.routes"));
const diet_routes_1 = __importDefault(require("./diet.routes"));
const dietDays_routes_1 = __importDefault(require("./dietDays.routes"));
const dietMeals_routes_1 = __importDefault(require("./dietMeals.routes"));
const dietMealsRecommend_routes_1 = __importDefault(require("./dietMealsRecommend.routes"));
const dietDinners_routes_1 = __importDefault(require("./dietDinners.routes"));
const dinner_routes_1 = __importDefault(require("./dinner/dinner.routes"));
const dinnerProduct_routes_1 = __importDefault(require("./dinner/dinnerProduct.routes"));
const dinnerPortion_routes_1 = __importDefault(require("./dinner/dinnerPortion.routes"));
const productAll_routes_1 = __importDefault(require("./productAll.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const asset_routes_1 = __importDefault(require("./asset.routes"));
const subscriptionPlans_routes_1 = __importDefault(require("./subscriptionPlans.routes"));
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const dietGenerate_routes_1 = __importDefault(require("./dietGenerate.routes"));
const dietDinnerPortionGenerate_routes_1 = __importDefault(require("./dietDinnerPortionGenerate.routes"));
const calendarNotes_routes_1 = __importDefault(require("./calendarNotes.routes"));
const routes = (app) => {
    app.use('/api/v1/user', user_routes_1.default);
    app.use('/api/v1/sessions', session_routes_1.default);
    // app.use('/api/v1/roles', roleRoutes);
    app.use('/api/v1/products', product_routes_1.default);
    app.use('/api/v1/all-products', productAll_routes_1.default);
    app.use('/api/v1/measurements', measurement_routes_1.default);
    app.use('/api/v1/dietEstablishments', dietEstablishment_routes_1.default);
    app.use('/api/v1/dietKinds', dietKind_routes_1.default);
    app.use('/api/v1/diets', diet_routes_1.default);
    app.use('/api/v1/dietDays', dietDays_routes_1.default);
    app.use('/api/v1/dietMeals', dietMeals_routes_1.default);
    app.use('/api/v1/dietMealsRecommend', dietMealsRecommend_routes_1.default);
    app.use('/api/v1/dietDinnerPortionGenerate', dietDinnerPortionGenerate_routes_1.default);
    app.use('/api/v1/dietGenerate', dietGenerate_routes_1.default);
    app.use('/api/v1/dietDinners', dietDinners_routes_1.default);
    app.use('/api/v1/dinners', dinner_routes_1.default);
    app.use('/api/v1/dinnerProducts', dinnerProduct_routes_1.default);
    app.use('/api/v1/dinnerPortions', dinnerPortion_routes_1.default);
    app.use('/api/v1/assets', asset_routes_1.default);
    app.use('/api/v1/subscriptionPlans', subscriptionPlans_routes_1.default);
    app.use('/api/v1/transactions', transaction_routes_1.default);
    app.use('/api/v1/clients', client_routes_1.default);
    app.use('/api/v1/calendarNotes', calendarNotes_routes_1.default);
};
exports.default = routes;
