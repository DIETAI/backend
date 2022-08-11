import { EventEmitter } from 'events';
import { IDietDinnerDocument } from '../../interfaces/diet/dietDinner.interfaces';
import { IDietMealDocument } from '../../interfaces/diet/dietMeal.interfaces';
import { getDietDinners } from '../../services/diet/dietDinner.service';
import {
  getAndUpdateDietMeal,
  getDietMeal,
  getDietMeals,
} from '../../services/diet/dietMeal.service';
import { getDinnerPortion } from '../../services/dinner/dinnerPortion.service';
import {
  getAndUpdateDietDay,
  getDietDay,
} from '../../services/diet/dietDay.service';
import { sumDietDinnersTotal } from './helpers';
import { sumDietDayMealsTotal } from './dietDay.helpers';

export const dietEmitter = new EventEmitter();

dietEmitter.on(
  'dietDinner::created',
  async (code: number, dietDinner: IDietDinnerDocument) => {
    console.log(`Got ${code} and ${dietDinner._id}`);

    const dietDinners = await getDietDinners({
      dietMealId: dietDinner.dietMealId,
    });

    const dietDinnersQuery = await Promise.all(
      dietDinners.map(async (dietDinner) => {
        const dinnerPortion = await getDinnerPortion({
          _id: dietDinner.dinnerPortionId,
        });

        return {
          ...dietDinner,
          dinnerPortion: dinnerPortion,
        };
      })
    );

    console.log({ dietDinnersQueryPortion: dietDinnersQuery[0].dinnerPortion });

    const dietMeal = await getDietMeal({
      _id: dietDinner.dietMealId,
    });

    const mealTotal = {
      ...dietMeal,
      total: sumDietDinnersTotal({
        dietDinners: dietDinnersQuery as any,
        dietDayTotalKcal: 2000,
      }),
    };

    try {
      const updatedMeal = await getAndUpdateDietMeal(
        { _id: dietDinner.dietMealId },
        mealTotal,
        {
          new: true,
        }
      );

      dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
      console.log(updatedMeal);
    } catch (e) {
      console.log(e);
    }

    //count dinners total
  }
); // Register for eventOne

dietEmitter.on(
  'dietDinner::updated',
  (code: number, dietDinner: IDietDinnerDocument) => {
    console.log(`Got ${code} and ${dietDinner._id}`);
  }
); // Register for eventOne

dietEmitter.on(
  'dietDinner::deleted',
  async (code: number, dietDinner: IDietDinnerDocument) => {
    console.log(`Got ${code} and ${dietDinner._id}`);

    console.log({ dietDinner });

    //mealId

    const dietDinners = await getDietDinners({
      dietMealId: dietDinner.dietMealId,
    });

    console.log({ dietDinners });

    //jesli brak potraw w posiłku zmienic total na 0
    if (dietDinners.length < 1) {
      const dietMeal = await getDietMeal({
        _id: dietDinner.dietMealId,
      });

      const mealTotal = {
        ...dietMeal,
        total: sumDietDinnersTotal({
          dietDayTotalKcal: 2000,
        }),
      };

      try {
        const updatedMeal = await getAndUpdateDietMeal(
          { _id: dietDinner.dietMealId },
          mealTotal,
          {
            new: true,
          }
        );

        dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
        console.log(updatedMeal);
      } catch (e) {
        console.log(e);
      }
      return;
    }

    const dietDinnersQuery = await Promise.all(
      dietDinners.map(async (dietDinner) => {
        const dinnerPortion = await getDinnerPortion({
          _id: dietDinner.dinnerPortionId,
        });

        return {
          ...dietDinner,
          dinnerPortion: dinnerPortion,
        };
      })
    );

    console.log({ dietDinnersQueryPortion: dietDinnersQuery[0].dinnerPortion });

    const dietMeal = await getDietMeal({
      _id: dietDinner.dietMealId,
    });

    const mealTotal = {
      ...dietMeal,
      total: sumDietDinnersTotal({
        dietDinners: dietDinnersQuery as any,
        dietDayTotalKcal: 2000,
      }),
    };

    try {
      const updatedMeal = await getAndUpdateDietMeal(
        { _id: dietDinner.dietMealId },
        mealTotal,
        {
          new: true,
        }
      );

      dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
      console.log(updatedMeal);
    } catch (e) {
      console.log(e);
    }
  }
); // Register for eventOne

dietEmitter.on(
  'dietMeal::created',
  async (code: number, dietMeal: IDietMealDocument) => {
    console.log(dietMeal);
  }
);

dietEmitter.on(
  'dietMeal::updated',
  async (code: number, dietMeal: IDietMealDocument) => {
    console.log(`Edytowano ${dietMeal.name}`);

    const dietDayMeals = await getDietMeals({
      dayId: dietMeal.dayId,
    });

    const dietDay = await getDietDay({
      _id: dietMeal.dayId,
    });

    const dayTotal = {
      ...dietDay,
      total: sumDietDayMealsTotal({
        dietMeals: dietDayMeals,
      }),
    };

    try {
      const updatedDay = await getAndUpdateDietDay(
        { _id: dietDay?._id },
        dayTotal,
        {
          new: true,
        }
      );
      console.log('updated day');
      console.log(updatedDay);
    } catch (e) {
      console.log(e);
    }
  }
);
