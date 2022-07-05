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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlan = exports.getAndUpdateSubscriptionPlan = exports.getSubscriptionPlans = exports.getSubscriptionPlan = exports.createSubscriptionPlan = void 0;
const subscriptionPlan_model_1 = __importDefault(require("../../models/subscriptionPlan/subscriptionPlan.model"));
const metrics_1 = require("../../utils/metrics");
function createSubscriptionPlan(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createSubscriptionPlan',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield subscriptionPlan_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createSubscriptionPlan = createSubscriptionPlan;
function getSubscriptionPlan(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getSubscriptionPlan',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield subscriptionPlan_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getSubscriptionPlan = getSubscriptionPlan;
function getSubscriptionPlans(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getSubscriptionPlans',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield subscriptionPlan_model_1.default.find(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getSubscriptionPlans = getSubscriptionPlans;
function getAndUpdateSubscriptionPlan(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return subscriptionPlan_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateSubscriptionPlan = getAndUpdateSubscriptionPlan;
function deleteSubscriptionPlan(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return subscriptionPlan_model_1.default.deleteOne(query);
    });
}
exports.deleteSubscriptionPlan = deleteSubscriptionPlan;
