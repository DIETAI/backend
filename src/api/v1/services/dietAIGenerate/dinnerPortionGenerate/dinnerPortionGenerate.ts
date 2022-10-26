import { databaseResponseTimeHistogram } from '../../../utils/metrics';
import { getDiet } from '../../diet/diet.service';
import { getDietMeal } from '../../diet/dietMeal.service';
import { getDietEstablishment } from '../../dietEstablishment.service';
import { IDinnerDocument } from '../../../interfaces/dinners/dinners.interfaces';
import { IDinnerPortionDocument } from '../../../interfaces/dinners/dinnerPortions.interfaces';
import { ITotal } from '../../../interfaces/total/totalCount.interfaces';

//functions
import { getDinnerPortionsMacro } from './portionsMacro/getDinnerPortionsMacro';
import {
  cartesianDinners,
  ICartesianResult,
} from './cartesianDinners/cartesianDinners';
import { selectGroups } from './selectGroups';
import { getDinnerPortion } from '../../dinner/dinnerPortion.service';
import { getDinner } from '../../dinner/dinner.service';
import { IDietEstablishmentMacrohydrateMinMax } from '../../../interfaces/dietEstablishments.interfaces';

export interface IDinnerPortionsGenerateArgs {
  dietId: string;
  dinnerId: string;
  mealEstablishment: {
    kcal: number;
    // protein: IDietEstablishmentMacrohydrateMinMax;
    // fat: IDietEstablishmentMacrohydrateMinMax;
    // carbohydrates: IDietEstablishmentMacrohydrateMinMax;
  }; //mealTotal - (sum(dinnersTotal)) = kcal - 150
}
interface IGeneratedPortion {
  uid: string;
  total: ITotal;
  dinnerProducts: {
    _id: string;
    portionGram: number;
    total: ITotal;
  }[];
}

export const dinnerPortionGenerate = async ({
  dietId,
  dinnerId,
  mealEstablishment,
}: IDinnerPortionsGenerateArgs) => {
  console.log('start generowania zestawu porcji');
  const metricsLabels = {
    operation: 'dinnerPortionGenerate',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  console.log({ dietId, dinnerId, mealEstablishment });

  try {
    const dinnerAllPortionsMacro = await getDinnerPortionsMacro(dinnerId);
    console.log({ dinnerAllPortionsMacro });

    if (!dinnerAllPortionsMacro) return;
    const diet = await getDiet({ _id: dietId });

    if (!diet) return;

    const dietEstablishment = await getDietEstablishment({
      _id: diet.establishmentId,
    });

    if (!dietEstablishment) return;

    // const mealEstablishment = dietEstablishment.meals.find(
    //   ({ _id }) => _id === meal.establishmentMealId
    // );

    // if (!mealEstablishment) return;

    console.time('cartesianProduct');
    //    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

    // //zabezpieczenie przed brakiem grup (zmiana procenta)
    const cartesianResultGroups = [];

    for (let currentProcent = 2, l = 10; currentProcent < l; currentProcent++) {
      const dinnersCartesianGroups = cartesianDinners(
        dietEstablishment,
        mealEstablishment,
        currentProcent,
        ...dinnerAllPortionsMacro
      );

      if (dinnersCartesianGroups.length > 0) {
        console.log(`Procent odchylenia grup: ${currentProcent}`);
        cartesianResultGroups.push(...dinnersCartesianGroups);
        break;
      }
    }

    console.timeEnd('cartesianProduct');

    console.log({ groupsLength: cartesianResultGroups.length });

    const selectedDinnersGroups = selectGroups(cartesianResultGroups);

    if (!selectedDinnersGroups.main.group) {
      return;
    }

    const dinnerProducts: IGeneratedPortion['dinnerProducts'] =
      selectedDinnersGroups.main.group.products.map((dinnerProduct) => {
        return {
          _id: dinnerProduct.dinnerProductId,
          portionGram: dinnerProduct.portion,
          total: {
            kcal: dinnerProduct.portionKcal,
            protein: {
              gram: dinnerProduct.portionProteinGram,
              kcal: dinnerProduct.portionProteinKcal,
            },
            fat: {
              gram: dinnerProduct.portionFatGram,
              kcal: dinnerProduct.portionFatKcal,
            },
            carbohydrates: {
              gram: dinnerProduct.portionCarbohydratesGram,
              kcal: dinnerProduct.portionCarbohydratesKcal,
            },
            fiber: {
              gram: dinnerProduct.portionFiberGram,
              kcal: dinnerProduct.portionFiberKcal,
            },
            digestableCarbohydrates: {
              gram: dinnerProduct.portionDisgestibleCarbohydratesGram,
              kcal: dinnerProduct.portionDisgestibleCarbohydratesKcal,
            },
            carbohydrateExchangers: 5,
            proteinFatExchangers: 5,
          },
        };
      });

    const generatedDinnerPortion: IGeneratedPortion = {
      uid: 'custom1',
      dinnerProducts: dinnerProducts,
      total: {
        kcal: selectedDinnersGroups.main.group.macroTotalCount.total_kcal,
        protein: {
          gram: selectedDinnersGroups.main.group.macroTotalCount
            .total_protein_gram,
          kcal: selectedDinnersGroups.main.group.macroTotalCount
            .total_protein_kcal,
        },
        fat: {
          gram: selectedDinnersGroups.main.group.macroTotalCount.total_fat_gram,
          kcal: selectedDinnersGroups.main.group.macroTotalCount.total_fat_kcal,
        },
        carbohydrates: {
          gram: selectedDinnersGroups.main.group.macroTotalCount
            .total_carbohydrates_gram,
          kcal: selectedDinnersGroups.main.group.macroTotalCount
            .total_carbohydrates_kcal,
        },
        fiber: {
          gram: selectedDinnersGroups.main.group.macroTotalCount
            .total_fiber_gram,
          kcal: selectedDinnersGroups.main.group.macroTotalCount
            .total_fiber_kcal,
        },
        digestableCarbohydrates: {
          gram: selectedDinnersGroups.main.group.macroTotalCount
            .total_digestableCarbohydrates_gram,
          kcal: selectedDinnersGroups.main.group.macroTotalCount
            .total_digestableCarbohydrates_kcal,
        },
        carbohydrateExchangers: 5,
        proteinFatExchangers: 5,
      },
    };

    console.log('Wybrano grupy');

    timer({ ...metricsLabels, success: 'true' });
    return generatedDinnerPortion;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
};

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
