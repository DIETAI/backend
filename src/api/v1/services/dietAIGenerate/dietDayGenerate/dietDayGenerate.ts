import { databaseResponseTimeHistogram } from '../../../utils/metrics';
import { getDiet } from '../../diet/diet.service';
import { getDietMeal, getDietMeals } from '../../diet/dietMeal.service';
import { getDietEstablishment } from '../../dietEstablishment.service';
import { IDinnerDocument } from '../../../interfaces/dinners/dinners.interfaces';
import { IDinnerPortionDocument } from '../../../interfaces/dinners/dinnerPortions.interfaces';

//functions
import { mealsGenerate } from './mealGenerate';
import { mealRecommend } from './mealRecommend/mealRecommend';
import { getMealDinnersPortionsMacro } from './portionsMacro/getDinnerPortionsMacro';
import {
  cartesianDinners,
  ICartesianResult,
} from './cartesianDinners/cartesianDinners';
import { selectGroups } from './selectGroups';
import { getDinnerPortion } from '../../dinner/dinnerPortion.service';
import { getDinner } from '../../dinner/dinner.service';
import {
  IDietMealDocument,
  IDietMealInput,
} from '../../../interfaces/diet/dietMeal.interfaces';
import { getDietDinners } from '../../diet/dietDinner.service';

interface IDayGenerateArgs {
  currentDayId: string;
  mealsToGenerate: {
    uid: string;
    type: IDietMealDocument['type'];
  }[];
  generateMealsSettings:
    | 'changeAmountAddedMeals'
    | 'saveAddedMeals'
    | 'newMeals';
}

export interface IMealToRecommend extends IDietMealInput {
  _id: string;
  generatedType: 'new' | 'added' | 'addedChangePortion';
}

export const dietDayGenerate = async ({
  currentDayId,
  mealsToGenerate,
  generateMealsSettings,
}: IDayGenerateArgs) => {
  console.log('start generowania dnia');
  const metricsLabels = {
    operation: 'dayGenerate',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  const generatedAllDayMeals = [];

  try {
    const addedDayMeals = await getDietMeals({ dayId: currentDayId });

    //z dodanych posiłków do dnia wybranie tylko tych które zaznaczono do wygenerowania
    const checkMeals = [];

    for (
      let mealIndex = 0, length = addedDayMeals.length;
      mealIndex < length;
      mealIndex++
    ) {
      const dayMeal = addedDayMeals[mealIndex];
      const checkMealInGenerate = mealsToGenerate.find(
        (mealType) => mealType.type === dayMeal.type
      );
      if (checkMealInGenerate) {
        checkMeals.push(dayMeal);
      }
    }

    const sortedCheckMeals = [...checkMeals].sort((a, b) => a.order - b.order);

    if (generateMealsSettings === 'changeAmountAddedMeals') {
      //przy losowaniu sprawdzić meal.dinners.length
      //jeśli są potrawy wybrać ten posiłek (sortedCheckMeals[0]) zamiast losować
      //obliczać porcje
      const mealsToRecommend: IMealToRecommend[] = await Promise.all(
        sortedCheckMeals.map(async (meal) => {
          const mealDinners = await getDietDinners({ dietMealId: meal._id });
          if (mealDinners.length > 0) {
            return {
              ...meal,
              generatedType: 'addedChangePortion',
            };
          }

          return {
            ...meal,
            generatedType: 'new',
          };
        })
      ); //correct

      //przy losowaniu zwrócić uwagę na generatedType
      //if addedChangePortion => nie losować posiłku tylko zostawić a następnie dostosować ilość
      const generatedDayMeals = await mealsGenerate({
        mealsToRecommend,
        currentDayId,
      });

      console.log({ generatedDayMeals });

      generatedAllDayMeals.push(generatedDayMeals);

      //   const dietDayGenerateObj: IDietGenerateDay = {
      //     _id: currentDayId,
      //     total: {
      //       kcal: roundValue(
      //         generatedMeals.reduce(
      //           (acc, field) => acc + Number(field.total.kcal),
      //           0
      //         )
      //       ),
      //       protein: {
      //         gram: roundValue(
      //           generatedMeals.reduce(
      //             (acc, field) => acc + Number(field.total.protein.gram),
      //             0
      //           )
      //         ),
      //       },
      //       fat: {
      //         gram: roundValue(
      //           generatedMeals.reduce(
      //             (acc, field) => acc + Number(field.total.fat.gram),
      //             0
      //           )
      //         ),
      //       },
      //       carbohydrates: {
      //         gram: roundValue(
      //           generatedMeals.reduce(
      //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
      //             0
      //           )
      //         ),
      //       },
      //     },
      //     meals: generatedMeals,
      //   };

      //   generatedDays.push(dietDayGenerateObj);
    }

    // if (generateMealsSettings === "newMeals") {
    //   const mealsToRandom: IMealToRandom[] = sortedCheckMeals.map((meal) => ({
    //     ...meal,
    //     generatedType: "new",
    //   }));

    //   const generatedMeals = generateMeals({
    //     mealsToGenerate: mealsToRandom,
    //     availableMealsToRandom: availableDietMealsToRandom,
    //     currentDayId,
    //     allDietMeals,
    //   });

    //   const dietDayGenerateObj: IDietGenerateDay = {
    //     _id: currentDayId,
    //     total: {
    //       kcal: roundValue(
    //         generatedMeals.reduce(
    //           (acc, field) => acc + Number(field.total.kcal),
    //           0
    //         )
    //       ),
    //       protein: {
    //         gram: roundValue(
    //           generatedMeals.reduce(
    //             (acc, field) => acc + Number(field.total.protein.gram),
    //             0
    //           )
    //         ),
    //       },
    //       fat: {
    //         gram: roundValue(
    //           generatedMeals.reduce(
    //             (acc, field) => acc + Number(field.total.fat.gram),
    //             0
    //           )
    //         ),
    //       },
    //       carbohydrates: {
    //         gram: roundValue(
    //           generatedMeals.reduce(
    //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
    //             0
    //           )
    //         ),
    //       },
    //     },
    //     meals: generatedMeals,
    //   };

    //   generatedDays.push(dietDayGenerateObj);
    // }

    // if (generateMealsSettings === "saveAddedMeals") {
    //   //nie wybiera posiłków z potrawami - poprawić
    //   const savedMeals = sortedCheckMeals.filter(
    //     (meal) => meal.dinners.length >= 1
    //   );
    //   const filterMealsToRandom = sortedCheckMeals.filter(
    //     (meal) => meal.dinners.length < 1
    //   );

    //   console.log({ savedMeals, filterMealsToRandom });

    //   const mealsToRandom: IMealToRandom[] = filterMealsToRandom.map(
    //     (meal) => ({
    //       ...meal,
    //       generatedType: "new",
    //     })
    //   );

    //   const generatedMeals = generateMeals({
    //     mealsToGenerate: mealsToRandom,
    //     availableMealsToRandom: availableDietMealsToRandom,
    //     currentDayId,
    //     allDietMeals,
    //   });

    //   const savedMealsCheck: IDietGenerateMeal[] = savedMeals.map((meal) => ({
    //     _id: meal._id,
    //     name: meal.name,
    //     type: meal.type,
    //     generatedType: "added",
    //     total: meal.total,
    //     selectedGroup: undefined,
    //     generatedDinners: [],
    //     addedMealObj: meal,
    //   }));

    //   const allMeals = savedMealsCheck.concat(generatedMeals);

    //   console.log({ allMeals });

    //   const dietDayGenerateObj: IDietGenerateDay = {
    //     _id: currentDayId,
    //     total: {
    //       kcal: roundValue(
    //         allMeals.reduce((acc, field) => acc + Number(field.total.kcal), 0)
    //       ),
    //       protein: {
    //         gram: roundValue(
    //           allMeals.reduce(
    //             (acc, field) => acc + Number(field.total.protein.gram),
    //             0
    //           )
    //         ),
    //       },
    //       fat: {
    //         gram: roundValue(
    //           allMeals.reduce(
    //             (acc, field) => acc + Number(field.total.fat.gram),
    //             0
    //           )
    //         ),
    //       },
    //       carbohydrates: {
    //         gram: roundValue(
    //           allMeals.reduce(
    //             (acc, field) => acc + Number(field.total.carbohydrates.gram),
    //             0
    //           )
    //         ),
    //       },
    //     },
    //     meals: allMeals,
    //   };

    // }

    timer({ ...metricsLabels, success: 'true' });
    return {
      generatedAllDayMeals,
    };
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
};

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
