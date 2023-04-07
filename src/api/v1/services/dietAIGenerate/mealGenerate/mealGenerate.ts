import { databaseResponseTimeHistogram } from '../../../utils/metrics';
import { getDiet } from '../../diet/diet.service';
import { getDietMeal } from '../../diet/dietMeal.service';
import { getDietEstablishment } from '../../dietEstablishment.service';
import { IDinnerDocument } from '../../../interfaces/dinners/dinners.interfaces';
import { IDinnerPortionDocument } from '../../../interfaces/dinners/dinnerPortions.interfaces';

//functions
import { IMealRecommend, mealRecommend } from './mealRecommend/mealRecommend';
import { getMealDinnersPortionsMacro } from './portionsMacro/getDinnerPortionsMacro';
import {
  cartesianDinners,
  ICartesianResult,
} from './cartesianDinners/cartesianDinners';
import { selectGroups } from './selectGroups';
import { getDinnerPortion } from '../../dinner/dinnerPortion.service';
import { getDinner } from '../../dinner/dinner.service';
import { getDietDinners } from '../../diet/dietDinner.service';

interface IMealGenerateArgs {
  mealId: string;
  mealGenerateOption: 'changeAmountAddedMealDinners' | 'newMeal';
}

export const mealGenerate = async ({
  mealId,
  mealGenerateOption,
}: IMealGenerateArgs) => {
  console.log('start generowania posiłku');
  const metricsLabels = {
    operation: 'mealGenerate',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const meal = await getDietMeal({ _id: mealId });
    //correct

    if (!meal) {
      return;
    }

    let recommendMeal;

    if (mealGenerateOption === 'changeAmountAddedMealDinners') {
      const mealDinners = await getDietDinners({ dietMealId: mealId });
      const mealObj: IMealRecommend = {
        dayMealId: mealId,
        dayMealDinners: mealDinners,
        dayId: meal.dayId,
      };

      recommendMeal = { ...mealObj, mealGenerateOption };
    } else {
      const recommendedMeal = await mealRecommend({
        mealDayId: meal.dayId,
        mealType: meal.type,
      });

      if (!recommendedMeal) return; //random dietMeal

      recommendMeal = { ...recommendedMeal, mealGenerateOption };

      console.log(recommendMeal);
    }

    console.log(
      `Wybrano posiłek poprzez: ${recommendMeal.dayMealGenerateType}`
    );

    const mealDinnersPortionsMacro = await Promise.all(
      recommendMeal.dayMealDinners.map(async (dinner) => {
        const dinnerMacroPortion = await getMealDinnersPortionsMacro(dinner);

        return dinnerMacroPortion;
      })
    );

    if (!mealDinnersPortionsMacro) return;

    const mealDinners = mealDinnersPortionsMacro.flatMap((mealDinner) => {
      return mealDinner.dinnerProductsPortions;
    });
    // złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)

    const diet = await getDiet({ _id: meal.dietId });

    if (!diet) return;

    const dietEstablishment = await getDietEstablishment({
      _id: diet.establishmentId,
    });

    if (!dietEstablishment) return;

    const mealEstablishment = dietEstablishment.meals.find(
      ({ _id }) => _id === meal.establishmentMealId
    );

    if (!mealEstablishment) return;

    console.time('cartesianProduct');
    //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

    const maxCartesianGroups = mealDinners.length < 6 ? 50000 : 100;

    // //zabezpieczenie przed brakiem grup (zmiana procenta)
    const cartesianResultGroups = [];

    for (
      let currentProcent = 2, l = 100;
      currentProcent < l;
      currentProcent++
    ) {
      const dinnersCartesianGroups = cartesianDinners(
        mealEstablishment,
        dietEstablishment,
        maxCartesianGroups,
        currentProcent,
        ...mealDinners
      );

      if (dinnersCartesianGroups.length > 0) {
        console.log(`Procent odchylenia grup: ${currentProcent}`);
        cartesianResultGroups.push(...dinnersCartesianGroups);
        break;
      }
    }

    // const currentProcent = 5;
    // const dinnersCartesianGroups = cartesianDinners(
    //   mealEstablishment,
    //   dietEstablishment,
    //   maxCartesianGroups,
    //   currentProcent,
    //   ...mealDinners
    // );

    console.timeEnd('cartesianProduct');

    const selectedDinnersGroups = selectGroups(cartesianResultGroups);

    console.log({ cartesianResultGroups });

    console.log('Wybrano grupy'); //correct
    console.log({ selectedDinnersGroups });

    // console.log(selectedDinnersGroups.main);

    const selectedMealDinners = await Promise.all(
      recommendMeal.dayMealDinners.map(async (dietDinner) => {
        const dinnerPortion = (await getDinnerPortion({
          _id: dietDinner.dinnerPortionId,
        })) as IDinnerPortionDocument;
        const dinner = (await getDinner({
          _id: dinnerPortion.dinnerId,
        })) as IDinnerDocument;

        const dinnerId = dinner._id.toString();

        const dinnerObj = {
          _id: dietDinner._id,
          dinnerId: dinner._id,
          dinnerName: dinner.name,
          dinnerProducts: selectedDinnersGroups.main.group.products.filter(
            (dinnerProduct) => dinnerProduct.dinnerId == dinnerId
          ),
        };

        return dinnerObj;
      })
    );

    const generatedMealObj = {
      dietMeal: {
        _id: meal._id,
        dayId: meal.dayId,
        dietId: meal.dietId,
      },
      selectedMealGroup: {
        type: selectedDinnersGroups.main.type,
        name: selectedDinnersGroups.main.name,
        description: selectedDinnersGroups.main.description,
        macroTotalCount: selectedDinnersGroups.main.group.macroTotalCount,
        missingProcentCount:
          selectedDinnersGroups.main.group.missingProcentCount,
      },
      mealGenerateOption,
      mealDinners: selectedMealDinners,
      totalGroups: cartesianResultGroups.length,
    };
    //mealDinnersCartesianGroups
    //mealDinnersSelectGroups

    timer({ ...metricsLabels, success: 'true' });
    return {
      recommendMeal,
      selectedDinnersGroups,
      generatedMealObj,
    };
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
};
