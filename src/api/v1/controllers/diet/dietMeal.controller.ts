import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDayMealInput,
  UpdateDietDayMealInput,
  DeleteDietDayMealInput,
  GetDietDayMealInput,
  GetDietDayMealsInput,
} from '../../schema/diet/dietMeal.schema';
import { getDiet } from '../../services/diet/diet.service';
import { getDietDinners } from '../../services/diet/dietDinner.service';

import {
  createDietMeal,
  deleteDietMeal,
  getAndUpdateDietMeal,
  getDietMeal,
  getDietMeals,
} from '../../services/diet/dietMeal.service';
import {
  getDietEstablishment,
  getDietEstablishments,
} from '../../services/dietEstablishment.service';
import { getDinner } from '../../services/dinner/dinner.service';
import { getDinnerPortion } from '../../services/dinner/dinnerPortion.service';
import { getDinnerProducts } from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';

export async function createDietMealController(
  req: Request<{}, {}, CreateDietDayMealInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietMeal = await createDietMeal({
    ...body,
    user: userId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  return res.send(dietMeal);
}

export async function updateDietMealController(
  req: Request<UpdateDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;
  const update = req.body;

  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietMeal = await getAndUpdateDietMeal(
    { _id: dietMealId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietMeal);
}

export async function getDietMealController(
  req: Request<GetDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;
  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietMeal);
}

export async function getDietMealsController(
  req: Request<GetDietDayMealsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dayId = req.params.dietDayId;

  const dietMeals = await getDietMeals({ user: userId, dayId: dayId });

  if (!dietMeals) {
    return res.sendStatus(404);
  }

  const sortedMeals = [...dietMeals].sort((a, b) => a.order - b.order);

  return res.send(sortedMeals);
}

export async function getDietMealsToRecommendController(
  req: Request<GetDietDayMealsInput['params']>,
  res: Response
) {
  const dietMeals = await getDietMeals({});

  if (!dietMeals) {
    return res.sendStatus(404);
  }

  const dietMealsWithDinners = await Promise.all(
    dietMeals.map(async (dietMeal) => {
      const mealDinners = await getDietDinners({ dietMealId: dietMeal._id });

      const newMealObj = {
        _id: dietMeal._id,
        userId: dietMeal.user,
        name: dietMeal.name,
        type: dietMeal.type,
        order: dietMeal.order,
        dinners: mealDinners,
      };

      return newMealObj;
    })
  );

  const filteredDietMealsDinners = dietMealsWithDinners.filter(
    (dietMeal) => dietMeal.dinners.length > 0
  );

  return res.send(filteredDietMealsDinners);
}

export async function getAllDietMealsController(
  req: Request<GetDietDayMealsInput['params']>,
  res: Response
) {
  // const currentDietKind = req.dietKind
  const dietMeals = await getDietMeals({});

  if (!dietMeals) {
    return res.sendStatus(404);
  }

  const establishments = await getDietEstablishments({});
  const establishmentsMeals = establishments.flatMap(
    (establishment) => establishment.meals
  );

  const dietMealsDinners = await Promise.all(
    dietMeals.map(async (dietMeal) => {
      const mealEstablishment = establishmentsMeals.find(
        (mealEstablishment) =>
          mealEstablishment._id === dietMeal.establishmentMealId
      );
      //sprawdzić czy rodzaj diety jest taki sam jak rodzaj obecnej diety
      const diet = await getDiet({ _id: dietMeal.dietId });
      const dietEstablishment = await getDietEstablishment({
        _id: diet?.establishmentId,
      });
      // const dietKind = dietEstablishment?.dietKind === currentDietKind
      const mealDinners = await getDietDinners({ dietMealId: dietMeal._id });

      const dinners = await Promise.all(
        mealDinners.map(async (mealDinner) => {
          const dinnerPortion = await getDinnerPortion({
            _id: mealDinner.dinnerPortionId,
          });

          if (!dinnerPortion)
            return {
              ...mealDinner,
            };

          const dinner = await getDinner({ _id: dinnerPortion?.dinnerId });
          const dinnerProducts = await getDinnerProducts({
            dinnerId: dinner?._id,
          });

          const dinnerProductsQuery = await Promise.all(
            dinnerProducts.map(async (dinnerProduct) => {
              const product = await getProduct({
                _id: dinnerProduct.productId,
              });

              return {
                ...dinnerProduct,
                product,
              };
            })
          );

          return {
            ...mealDinner,
            dinner,
            dinnerProducts: dinnerProductsQuery,
          };
        })
      );

      return {
        ...dietMeal,
        dinners,
        dietEstablishment,
        mealEstablishment,
      };
    })
  );

  const filteredDietMealsDinners = dietMealsDinners.filter(
    (dietMeal) => dietMeal.dinners.length > 0
  );

  return res.send(dietMealsDinners);
}

export async function deleteDietMealController(
  req: Request<DeleteDietDayMealInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietMealId = req.params.dietMealId;

  const dietMeal = await getDietMeal({
    _id: dietMealId,
  });

  if (!dietMeal) {
    return res.sendStatus(404);
  }

  if (String(dietMeal.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietMeal({ _id: dietMealId });

  return res.sendStatus(200);
}
