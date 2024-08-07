import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDinnerInput,
  UpdateDietDinnerInput,
  DeleteDietDinnerInput,
  GetDietDinnerInput,
  GetDietDinnersInput,
  GetDietDinnersByPortionInput,
  GetDietDinnersByDayIdInput,
} from '../../schema/diet/dietDinner.schema';

import {
  createDietDinner,
  deleteDietDinner,
  getAndUpdateDietDinner,
  getDietDinner,
  getDietDinners,
  getDietDinnersWithTotal,
} from '../../services/diet/dietDinner.service';

import { getAndUpdateDietMeal } from '../../services/diet/dietMeal.service';
import { getDiet } from '../../services/diet/diet.service';

import { getDinnerPortion } from '../../services/dinner/dinnerPortion.service';
import {
  getDinnerProduct,
  getDinnerProducts,
} from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';
import { getDinner } from '../../services/dinner/dinner.service';
import { dietEmitter } from './events';
import {
  getDietMeal,
  getDietMeals,
} from '../../services/diet/dietMeal.service';
import {
  getAndUpdateDietDay,
  getDietDay,
  getDietDays,
} from '../../services/diet/dietDay.service';
import { IDinnerPortionDocument } from '../../interfaces/dinners/dinnerPortions.interfaces';
import { IDietMealDocument } from '../../interfaces/diet/dietMeal.interfaces';
import {
  getMealTotalProcent,
  getTotal,
  ITotal,
} from '../../helpers/diet/getTotal';

export async function createDietDinnerController(
  req: Request<{}, {}, CreateDietDinnerInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietDinner = await createDietDinner({
    ...body,
    user: userId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  //remove
  // dietEmitter.emit('dietDinner::created', 200, dietDinner);

  //update meal_total
  const currentMealDietDinners = await getDietDinnersWithTotal({
    dietMealId: dietDinner.dietMealId,
  });

  const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
    total: dietDinner.dinnerPortionId.total as ITotal,
  }));

  const mealTotalValues = await getTotal(dinnersTotal);

  const newMealTotal = {
    ...mealTotalValues,
    procent: getMealTotalProcent({
      mealTotalKcal: mealTotalValues.kcal,
      dayTotalKcal: 2000,
    }),
  };

  const updatedMeal = await getAndUpdateDietMeal(
    { _id: dietDinner.dietMealId },
    { $set: { total: newMealTotal } },
    { new: true }
  );

  //update day total
  const currentDayMealsTotal = await getDietMeals(
    { dayId: dietDinner.dayId },
    { select: 'total' }
  );

  const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
    total: dayMeal.total as ITotal,
  }));

  const newDayTotal = await getTotal(dayMealsTotal);

  const updatedDay = await getAndUpdateDietDay(
    { _id: dietDinner.dayId },
    { $set: { total: newDayTotal } },
    { new: true }
  );

  return res.send(dietDinner);
}

export async function updateDietDinnerController(
  req: Request<UpdateDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const update = req.body;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietDinner = await getAndUpdateDietDinner(
    { _id: dietDinnerId },
    update,
    {
      new: true,
    }
  );

  //update meal_total
  const currentMealDietDinners = await getDietDinnersWithTotal({
    dietMealId: dietDinner.dietMealId,
  });

  const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
    total: dietDinner.dinnerPortionId.total as ITotal,
  }));

  const mealTotalValues = await getTotal(dinnersTotal);

  const newMealTotal = {
    ...mealTotalValues,
    procent: getMealTotalProcent({
      mealTotalKcal: mealTotalValues.kcal,
      dayTotalKcal: 2000,
    }),
  };

  const updatedMeal = await getAndUpdateDietMeal(
    { _id: dietDinner.dietMealId },
    { $set: { total: newMealTotal } },
    { new: true }
  );

  //update day total
  const currentDayMealsTotal = await getDietMeals(
    { dayId: dietDinner.dayId },
    { select: 'total' }
  );

  const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
    total: dayMeal.total as ITotal,
  }));

  const newDayTotal = await getTotal(dayMealsTotal);

  const updatedDay = await getAndUpdateDietDay(
    { _id: dietDinner.dayId },
    { $set: { total: newDayTotal } },
    { new: true }
  );

  // dietEmitter.emit('dietDinner::created', 200, dietDinner);

  // console.log('Edytowano i wysłano posiłek: 200');

  return res.send(updatedDietDinner);
}

export async function getDietDinnerController(
  req: Request<GetDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietDinner);
}

//aws
export async function getDietDinnersToDinnerRecommendController(
  req: Request,
  res: Response
) {
  const dietDinners = await getDietDinners({});

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  // const mealType = 'snack';

  // const resultDinners = [];

  // for (const dietDinner of dietDinners) {
  //   const dayMeals = await getDietMeals({ dayId: dietDinner.dayId });
  //   const searchMeal = dayMeals.find(
  //     (dayMeal) => dayMeal.type === mealType
  //   ) as IDietMealDocument;
  //   const dinners = await getDietDinners({ dietMealId: searchMeal._id });

  //   if (dinners.length > 0) {
  //     resultDinners.push(dietDinner);
  //   }
  // } //correct

  const dietDinnersToRecommend = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const dinnerPortion = (await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      })) as IDinnerPortionDocument;
      const dinner = await getDinner({ _id: dinnerPortion.dinnerId });
      const meal = await getDietMeal({ _id: dietDinner.dietMealId });

      return {
        _id: dietDinner._id,
        mealId: dietDinner.dietMealId,
        mealType: meal?.type,
        dayId: dietDinner.dayId,
        dinnerId: dinner?._id,
        dinnerName: dinner?.name,
      };
    })
  ); //brak filtrowania (wybierz tylko te dni które zawierają potrawy w np. 2 śniadaniu )

  //panel admina
  //nie trzeba filtrować tylko wybrać potrawy getDietDinners({toGenerate: true})  => po zapisaniu dnia do generowania zmienia się na true => po usunięciu wszystkich potraw z jednego posiłku => zmienia się na false

  return res.send(dietDinnersToRecommend);
}

export async function getAllDietDinnersToMealRecommendController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  // const userId = res.locals.user._id;
  // const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({});

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });

      if (!dinnerPortion) return;
      const dinner = await getDinner({ _id: dinnerPortion.dinnerId });
      const dinnerProducts = await getDinnerProducts({ dinnerId: dinner?._id });
      const meal = await getDietMeal({ _id: dietDinner.dietMealId });
      const day = await getDietDay({ _id: meal?.dayId });

      return {
        _id: dietDinner._id,
        userId: dietDinner.user,
        diet: {
          _id: diet?._id,
          name: diet?.name,
          clientId: diet?.clientId,
          clientPreferencesGroup: 1,
        },
        dinner: {
          _id: dinner?._id,
          name: dinner?.name,
          products: dinnerProducts.map((dinnerProduct) => dinnerProduct._id),
          likedProductsPoints: 0,
        },
        day: {
          _id: day?._id,
          name: day?.name,
        },
        meal: {
          _id: meal?._id,
          name: meal?.name,
          type: meal?.type,
        },
      };
    })
  );

  // const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(dietDinnersQuery);
}

export async function getAllDietDinnersController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  // const userId = res.locals.user._id;
  // const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({});

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });

      if (!dinnerPortion) return;
      const dinner = await getDinner({ _id: dinnerPortion.dinnerId });
      const dinnerProducts = await getDinnerProducts({ dinnerId: dinner?._id });
      const meal = await getDietMeal({ _id: dietDinner.dietMealId });

      return {
        _id: dietDinner._id,
        userId: dietDinner.user,
        diet: {
          _id: diet?._id,
          name: diet?.name,
          clientId: diet?.clientId,
          clientPreferencesGroup: 1,
        },
        dinner: {
          _id: dinner?._id,
          name: dinner?.name,
          products: dinnerProducts.map((dinnerProduct) => dinnerProduct._id),
          likedProductsPoints: 0,
        },
        meal: {
          _id: meal?._id,
          name: meal?.name,
          type: meal?.type,
        },
      };
    })
  );

  // const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(dietDinnersQuery);
}

export async function getDietDinnersController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({
    user: userId,
    dietMealId: mealId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const sortedDinners = [...dietDinners].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersByDayIdController(
  req: Request<GetDietDinnersByDayIdInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dayId = req.params.dayId;

  const dietDinners = await getDietDinners({
    user: userId,
    dayId: dayId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });

      if (!dinnerPortion)
        return {
          ...dietDinner,
          diet,
        };

      const dinner = await getDinner({ _id: dinnerPortion.dinnerId });
      const meal = await getDietMeal({ _id: dietDinner.dietMealId });

      return {
        ...dietDinner,
        diet,
        dinner,
        meal,
      };
    })
  );

  if (!dietDinnersQuery) {
    return res.sendStatus(404);
  }

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersByPortionIdController(
  req: Request<GetDietDinnersByPortionInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const portionId = req.params.dinnerPortionId;

  const dietDinners = await getDietDinners({
    user: userId,
    dinnerPortionId: portionId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });

      return {
        ...dietDinner,
        diet,
      };
    })
  );

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersQueryController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({
    user: userId,
    dietMealId: mealId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });

      return {
        ...dietDinner,
        dinnerPortion,
      };
    })
  );

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function deleteDietDinnerController(
  req: Request<DeleteDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietDinner({ _id: dietDinnerId });

  //update meal_total
  const currentMealDietDinners = await getDietDinnersWithTotal({
    dietMealId: dietDinner.dietMealId,
  });

  const dinnersTotal = currentMealDietDinners.map((dietDinner) => ({
    total: dietDinner.dinnerPortionId.total as ITotal,
  }));

  const mealTotalValues = await getTotal(dinnersTotal);

  const newMealTotal = {
    ...mealTotalValues,
    procent: getMealTotalProcent({
      mealTotalKcal: mealTotalValues.kcal,
      dayTotalKcal: 2000,
    }),
  };

  const updatedMeal = await getAndUpdateDietMeal(
    { _id: dietDinner.dietMealId },
    { $set: { total: newMealTotal } },
    { new: true }
  );

  //update day total
  const currentDayMealsTotal = await getDietMeals(
    { dayId: dietDinner.dayId },
    { select: 'total' }
  );

  const dayMealsTotal = currentDayMealsTotal.map((dayMeal) => ({
    total: dayMeal.total as ITotal,
  }));

  const newDayTotal = await getTotal(dayMealsTotal);

  const updatedDay = await getAndUpdateDietDay(
    { _id: dietDinner.dayId },
    { $set: { total: newDayTotal } },
    { new: true }
  );

  // dietEmitter.emit('dietDinner::deleted', 200, dietDinner);

  return res.sendStatus(200);
}
