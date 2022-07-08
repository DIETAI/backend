import { Request, Response } from 'express';
import {
  CreateDietInput,
  UpdateDietInput,
  DeleteDietInput,
  GetDietInput,
} from '../../schema/diet/diet.schema';
import {
  createDiet,
  deleteDiet,
  getAndUpdateDiet,
  getDiet,
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
} from '../../services/diet/dietMeal.service';
import { getDietDinners } from '../../services/diet/dietDinner.service';
import { getDinner, getDinners } from '../../services/dinner/dinner.service';

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
  const diet_days = Array.from(Array(diet.daysAmount).keys());

  const newDietDays = await Promise.all(
    diet_days.map(async (key) => {
      const newDietDay = await createDietDay({
        name: `Day ${key}`,
        order: key + 1,
        dietId: diet._id,
        user: userId,
        establishmentId: diet.establishmentId,
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
            establishmentId: dietEstablishment._id,
            user: userId,
            dietId: diet._id,
            dayId: newDietDay._id,
            order: mealIndex + 1,
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

  const dietDays = await getDietDays({
    dietId: diet._id,
  });

  if (!dietDays) {
    return res.sendStatus(404);
  }

  // const dietMeals = await getDietMeals({
  //   dietId: diet._id,
  // });

  // if (!dietMeals) {
  //   return res.sendStatus(404);
  // }

  // const dietDinners = await getDietDinners({
  //   dietId: diet._id,
  // });

  // console.log({ dietDinners });

  // if (!dietDinners) {
  //   return res.sendStatus(404);
  // }

  // const q = {
  //   ...diet,
  //   days: getDietDays({
  //     dietId: diet._id
  //   }).then((days) =>
  //    days.map((dietDay) => ({
  //     ...dietDay,
  //     meals: getDietMeals({
  //       dayId: dietDay._id
  //     }).then((meals) => meals.map((dayMeal) => ({
  //       ...dayMeal,
  //       dinners: getDietDinners({
  //         dietMealId: dayMeal._id
  //       }).then((dinners) => dinners.map((mealDinner) => ({
  //         ...mealDinner,
  //         dinner: getDinner({
  //           _id: mealDinner.dinnerId
  //         }).then((dinner) => dinner)
  //       })))
  //     })))
  //   })))
  // }

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
              const dinner = await getDinner(dietDinner.dinnerId);

              return {
                ...dietDinner,
                dinner,
              };
            })
          );

          const mealObj = {
            ...dietMeal,
            dinners,
          };

          return mealObj;
        })
      );

      return {
        ...dietDay,
        meals,
      };
    })
  );

  const dietQueryObj = {
    ...diet,
    days: dietDaysQuery,
  };

  // const dietQueryObj = {
  //   ...diet,
  //   days: dietDays.map((dietDay) => ({
  //     ...dietDay,
  //     meals: dietMeals
  //       .filter(
  //         (dietMeal) => dietMeal.dayId.toString() === dietDay._id.toString()
  //       )
  //       .map((dayMeal) => ({
  //         ...dayMeal,
  //         dinners: dietDinners
  //           .filter(
  //             (dietDinner) =>
  //               dietDinner.dietMealId.toString() === dayMeal._id.toString()
  //           )
  //           .map((mealDinner) => ({
  //             ...mealDinner,
  //             dinner: {},
  //           })),
  //       })),
  //   })),
  // };

  return res.send(dietQueryObj);
}

export async function getDietsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const diets = await getDiets({ user: userId });

  if (!diets) {
    return res.sendStatus(404);
  }

  return res.send(diets);
}

export async function deleteDietController(
  req: Request<DeleteDietInput['params']>,
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

  await deleteDiet({ _id: dietId });

  return res.sendStatus(200);
}
