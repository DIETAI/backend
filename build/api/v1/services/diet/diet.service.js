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
exports.deleteDiet = exports.getAndUpdateDiet = exports.getDiets = exports.getDietPopulate = exports.getDiet = exports.createDiet = void 0;
const diet_model_1 = __importDefault(require("../../models/diet.model"));
const metrics_1 = require("../../utils/metrics");
function createDiet(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'createDiet',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield diet_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.createDiet = createDiet;
function getDiet(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDiet',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield diet_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDiet = getDiet;
// Specifying a virtual with a `ref` property is how you enable virtual
// population
// AuthorSchema.virtual('posts', {
//   ref: 'BlogPost',
//   localField: '_id',
//   foreignField: 'author'
// });
// const Author = mongoose.model('Author', AuthorSchema, 'Author');
// const BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'BlogPost');
// After population
// const author = await Author.findOne().populate('posts');
function getDietPopulate(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDiet',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield diet_model_1.default.findOne(query, {}, options).populate([
                {
                    path: 'establishmentId',
                    select: [
                        '_id',
                        'name',
                        'protein',
                        'fat',
                        'carbohydrates',
                        'fiber',
                        'digestableCarbohydrates',
                        'kcal',
                        'meals',
                    ],
                },
                {
                    path: 'dietDays',
                    select: ['_id', 'name', 'order', 'dietMeals', 'date', 'total'],
                    options: { sort: { order: 1 } },
                    populate: {
                        path: 'dietMeals',
                        select: [
                            '_id',
                            'name',
                            'order',
                            'type',
                            'total',
                            'establishmentMealId',
                            'dietDinners',
                        ],
                        options: { sort: { order: 1 } },
                        populate: {
                            path: 'dietDinners',
                            select: ['_id', 'order', 'dinnerPortionId', 'dayId'],
                            options: { sort: { order: 1 } },
                            populate: {
                                path: 'dinnerPortionId',
                                select: ['_id', 'total', 'dinnerId', 'dinnerProducts'],
                                populate: [
                                    {
                                        path: 'dinnerId',
                                        select: ['_id', 'name', 'image'],
                                        populate: {
                                            path: 'image',
                                            select: ['_id', 'imageURL'],
                                        },
                                    },
                                    {
                                        path: 'dinnerProducts.dinnerProductId',
                                        select: ['_id', 'productId'],
                                        populate: {
                                            path: 'productId',
                                            select: ['_id', 'image', 'name'],
                                            populate: {
                                                path: 'image',
                                                select: ['_id', 'imageURL'],
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ]);
            // const dietWithDays = await DietModel.aggregate([
            //   {
            //     $lookup: {
            //       from: 'dietDays',
            //       localField: '_id',
            //       foreignField: 'dietId',
            //       as: 'dietDays',
            //     },
            //   },
            // ]);
            // .populate({
            //   path: 'establishmentId',
            //   select: ['name', 'measurementId'],
            //   populate: {
            //     path: 'measurementId',
            //     populate: [
            //       {
            //         path: 'client',
            //         select: ['user', 'name', 'lastName'],
            //         populate: { path: 'user' },
            //       },
            //       {
            //         path: 'user',
            //       },
            //     ],
            //   },
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
exports.getDietPopulate = getDietPopulate;
function getDiets(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'getDiets',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const result = yield diet_model_1.default.find(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            return result;
        }
        catch (e) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw e;
        }
    });
}
exports.getDiets = getDiets;
function getAndUpdateDiet(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return diet_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.getAndUpdateDiet = getAndUpdateDiet;
function deleteDiet(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return diet_model_1.default.deleteOne(query);
    });
}
exports.deleteDiet = deleteDiet;
