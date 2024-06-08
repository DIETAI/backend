import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import DietModel from '../../models/diet.model';
import {
  IDietInput,
  IDietDocument,
} from '../../interfaces/diet/diet.interfaces';

import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createDiet(input: IDietInput) {
  const metricsLabels = {
    operation: 'createDiet',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await DietModel.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getDiet(
  query: FilterQuery<IDietDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDiet',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

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

export async function getDietPopulate(
  query: FilterQuery<IDietDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDiet',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietModel.findOne(query, {}, options).populate([
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

    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getDiets(
  query: FilterQuery<IDietDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getDiets',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await DietModel.find(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateDiet(
  query: FilterQuery<IDietDocument>,
  update: UpdateQuery<IDietDocument>,
  options: QueryOptions
) {
  return DietModel.findOneAndUpdate(query, update, options);
}

export async function deleteDiet(query: FilterQuery<IDietDocument>) {
  return DietModel.deleteOne(query);
}
