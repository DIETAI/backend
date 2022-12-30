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
exports.deleteDinnerProduct = exports.getAndUpdateDinnerProduct = exports.getDinnerProducts = exports.getDinnerProductsPopulate = exports.getDinnerProduct = exports.createDinnerProduct = void 0;
const dinnerProduct_model_1 = __importDefault(require("../../models/dinners/dinnerProduct.model"));
const metrics_1 = require("../../utils/metrics");
function createDinnerProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createDinnerProduct',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dinnerProduct_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createDinnerProduct = createDinnerProduct;
function getDinnerProduct(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDinnerProduct',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dinnerProduct_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDinnerProduct = getDinnerProduct;
function getDinnerProductsPopulate() {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDinnerProductPopulate',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dinnerProduct_model_1.default.find().populate({
                path: 'productId',
                populate: { path: 'image' },
            });
            // .populate({
            //   path: 'dinnerId',
            //   select: ['name', 'image'],
            //   populate: { path: 'image' },
            // });
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDinnerProductsPopulate = getDinnerProductsPopulate;
function getDinnerProducts(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDinnerProducts',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield dinnerProduct_model_1.default.find(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDinnerProducts = getDinnerProducts;
function getAndUpdateDinnerProduct(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return dinnerProduct_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateDinnerProduct = getAndUpdateDinnerProduct;
function deleteDinnerProduct(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return dinnerProduct_model_1.default.deleteOne(query);
    });
}
exports.deleteDinnerProduct = deleteDinnerProduct;
