import { Request, Response } from 'express';
import {
  CreateDietInput,
  UpdateDietInput,
  DeleteDietInput,
  GetDietInput,
  GetDietsInput,
} from '../../schema/diet/diet.schema';
import {
  createDiet,
  deleteDiet,
  getAndUpdateDiet,
  getDiet,
  getDietPopulate,
  getDiets,
} from '../../services/diet/diet.service';

//dietDays
import {
  CreateDietDayInput,
  UpdateDietDayInput,
  DeleteDietDayInput,
  GetDietDayInput,
} from '../../schema/diet/dietDay.schema';

import {
  createDietDay,
  deleteDietDay,
  getAndUpdateDietDay,
  getDietDay,
  getDietDays,
} from '../../services/diet/dietDay.service';

import { getDietEstablishment } from '../../services/dietEstablishment.service';
import {
  createDietMeal,
  getDietMeals,
  deleteDietMeal,
} from '../../services/diet/dietMeal.service';
import {
  getDietDinners,
  deleteDietDinner,
} from '../../services/diet/dietDinner.service';
import { getDinner, getDinners } from '../../services/dinner/dinner.service';
import { getDinnerPortion } from '../../services/dinner/dinnerPortion.service';
import { getDinnerProduct } from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';
import { getAsset } from '../../services/asset.service';
import DietDayModel from '../../models/dietDay.model';
import DietModel from '../../models/diet.model';
import { IProductDocument } from '../../interfaces/products.interfaces';

export async function createDietController(
  req: Request<{}, {}, CreateDietInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const diet = await createDiet({
    ...body,
    user: userId,
  });

  if (!diet) {
    return res.sendStatus(404);
  }

  //getDietEstablishment
  const dietEstablishment = await getDietEstablishment({
    _id: diet.establishmentId,
  });

  if (!dietEstablishment) {
    return res.sendStatus(404);
  }

  //create diet days
  // const diet_days = Array.from(Array(diet.daysAmount).keys());
  const dietDays = body.days;

  const newDietDays = await Promise.all(
    dietDays.map(async (dietDay) => {
      const newDietDay = await createDietDay({
        name: `Day ${dietDay.order}`,
        order: dietDay.order,
        date: dietDay.date,
        dietId: diet._id,
        user: userId,
        establishmentId: diet.establishmentId,
        total: {
          kcal: 0,
          protein: {
            gram: 0,
            kcal: 0,
            procent: 0,
          },
          fat: {
            gram: 0,
            kcal: 0,
            procent: 0,
          },
          carbohydrates: {
            gram: 0,
            kcal: 0,
            procent: 0,
          },
          fiber: {
            gram: 0,
            kcal: 0,
          },
        },
      });

      if (!newDietDay) {
        return res.sendStatus(404);
      }

      //newMeals
      const newDayMeals = await Promise.all(
        dietEstablishment.meals.map(async (establishmentMeal, mealIndex) => {
          const newDayMeal = await createDietMeal({
            name: establishmentMeal.name,
            type: establishmentMeal.type,
            establishmentMealId: establishmentMeal._id,
            user: userId,
            dietId: diet._id,
            dayId: newDietDay._id,
            order: mealIndex + 1,
            total: {
              kcal: 0,
              procent: 0,
              protein: {
                gram: 0,
                kcal: 0,
                procent: 0,
              },
              fat: {
                gram: 0,
                kcal: 0,
                procent: 0,
              },
              carbohydrates: {
                gram: 0,
                kcal: 0,
                procent: 0,
              },
              fiber: {
                gram: 0,
                kcal: 0,
              },
            },
          });

          if (!newDayMeal) {
            return res.sendStatus(404);
          }
        })
      );

      return {
        day: newDietDay,
        dayMeals: newDayMeals,
      };
    })
  );

  if (!newDietDays) {
    return res.sendStatus(404);
  }

  return res.send(diet);
}

export async function updateDietController(
  req: Request<UpdateDietInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dietId = req.params.dietId;
  const update = req.body;

  const diet = await getDiet({
    _id: dietId,
  });

  if (!diet) {
    return res.sendStatus(404);
  }

  if (String(diet.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDiet = await getAndUpdateDiet({ _id: dietId }, update, {
    new: true,
  });

  return res.send(updatedDiet);
}

export async function getDietController(
  req: Request<GetDietInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietId = req.params.dietId;
  const diet = await getDiet({
    _id: dietId,
  });

  if (!diet) {
    return res.sendStatus(404);
  }

  if (String(diet.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(diet);
}

export async function getDietPopulateController(
  req: Request<GetDietInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietId = req.params.dietId;
  const diet = await getDietPopulate({
    _id: dietId,
  });

  if (!diet) {
    return res.sendStatus(404);
  }

  if (String(diet.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(diet);
}

export async function getDietQueryController(
  req: Request<GetDietInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietId = req.params.dietId;
  const diet = await getDiet({
    _id: dietId,
  });

  if (!diet) {
    return res.sendStatus(404);
  }

  if (String(diet.user) !== userId) {
    return res.sendStatus(403);
  }

  const dietDaysQ = getDietDays({
    dietId: diet._id,
  });

  const dietEstablishmentQ = getDietEstablishment({
    _id: diet.establishmentId,
  });

  const [dietDays, dietEstablishment] = await Promise.all([
    dietDaysQ,
    dietEstablishmentQ,
  ]);

  if (!dietDays) {
    return res.sendStatus(404);
  }

  const dietDaysQuery = await Promise.all(
    dietDays.map(async (dietDay) => {
      const dietMealsData = await getDietMeals({
        dayId: dietDay._id,
      });

      const meals = await Promise.all(
        dietMealsData.map(async (dietMeal) => {
          const dietDinnersData = await getDietDinners({
            dietMealId: dietMeal._id,
          });

          const dinners = await Promise.all(
            dietDinnersData.map(async (dietDinner) => {
              const dinnerPortion = await getDinnerPortion({
                _id: dietDinner.dinnerPortionId,
              });

              if (!dinnerPortion) return;

              const dinner = await getDinner({ _id: dinnerPortion.dinnerId });
              const dinnerImageObj = dinner?.image
                ? await getAsset({ _id: dinner.image })
                : undefined;

              const dinnerProducts = await Promise.all(
                dinnerPortion.dinnerProducts.map(async (dietDinnerProduct) => {
                  const dinnerProduct = await getDinnerProduct({
                    _id: dietDinnerProduct.dinnerProductId,
                  });
                  const product = (await getProduct({
                    _id: dinnerProduct?.productId,
                  })) as IProductDocument;

                  if (!product.image) {
                    return {
                      ...dietDinnerProduct,
                      dinnerProduct: {
                        ...dinnerProduct,
                        product: { ...product, imageURL: undefined },
                      },
                    };
                  }

                  const productAsset = await getAsset({ _id: product.image });

                  if (!productAsset) {
                    return {
                      ...dietDinnerProduct,
                      dinnerProduct: {
                        ...dinnerProduct,
                        product: { ...product, imageURL: undefined },
                      },
                    };
                  }

                  return {
                    ...dietDinnerProduct,
                    dinnerProduct: {
                      ...dinnerProduct,
                      product: { ...product, imageURL: productAsset.imageURL },
                    },
                  };
                })
              );

              const dinnerObj = {
                ...dinnerPortion,
                dinnerProducts,
                dinner: {
                  ...dinner,
                  imageObj: dinnerImageObj,
                },
              };

              return {
                ...dietDinner,
                dinnerPortion: dinnerObj,
              };
            })
          );

          // if (!dinners) {
          //   return {
          //     ...dietMeal,
          //     dinners: [],
          //   };
          // }

          const mealObj = {
            ...dietMeal,
            dinners: [...dinners].sort((a: any, b: any) => a.order - b.order),
          };

          return mealObj;
        })
      );

      return {
        ...dietDay,
        meals: [...meals].sort((a, b) => a.order - b.order),
      };
    })
  );

  const dietQueryObj = {
    ...diet,
    establishment: dietEstablishment,
    days: [...dietDaysQuery].sort((a, b) => a.order - b.order),
  };

  return res.send(dietQueryObj);
}

export async function getDietsController(
  req: Request<{}, {}, {}, GetDietsInput['query']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const queryPage = req.query.page;
  const itemsCount = req.query.itemsCount;

  if (queryPage && itemsCount) {
    const page = parseInt(queryPage);
    const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20

    const countPromise = DietModel.estimatedDocumentCount();
    const dietsPromise = DietModel.find({ user: userId })
      .limit(parseInt(itemsCount))
      .skip(skip);

    const [count, diets] = await Promise.all([countPromise, dietsPromise]);

    const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20

    if (!count || !diets) {
      return res.sendStatus(404);
    }

    return res.send({
      pagination: {
        count,
        pageCount,
      },
      diets,
    });
  }

  const diets = await getDiets({ user: userId });

  if (!diets) {
    return res.sendStatus(404);
  }

  return res.send(diets);
}

// export async function getDietsController(req: Request, res: Response) {
//   const userId = res.locals.user._id;
//   const diets = await getDiets({ user: userId });

//   if (!diets) {
//     return res.sendStatus(404);
//   }

//   return res.send(diets);
// }

export async function deleteDietController(
  req: Request<DeleteDietInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietId = req.params.dietId;

  const dietObj = getDiet({
    _id: dietId,
  });

  const dietDays = getDietDays({
    dietId: dietId,
  });

  const dietMeals = getDietMeals({
    dietId: dietId,
  });

  const dietDinners = getDietDinners({
    dietId: dietId,
  });

  const [diet, days, meals, dinners] = await Promise.all([
    dietObj,
    dietDays,
    dietMeals,
    dietDinners,
  ]);

  if (!diet) {
    return res.sendStatus(404);
  }

  if (String(diet.user) !== userId) {
    return res.sendStatus(403);
  }

  const deleteDays = await Promise.all(
    days.map(async (dietDay) => {
      await deleteDiet({ _id: dietId });
      const deleteDay = await deleteDietDay({ dietId: dietId });

      const deleteMeals = await Promise.all(
        meals.map(async (dietMeal) => {
          const deleteMeal = await deleteDietMeal({ dietId: dietId });

          const deleteDinners = await Promise.all(
            dinners.map(async (dietDinner) => {
              const deleteDinner = await deleteDietDinner({ dietId: dietId });
            })
          );
        })
      );
    })
  );

  return res.sendStatus(200);
}
