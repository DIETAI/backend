import { databaseResponseTimeHistogram } from '../../../utils/metrics';
import { getDiet } from '../../diet/diet.service';
import { getDietMeal } from '../../diet/dietMeal.service';
import { getDietEstablishment } from '../../dietEstablishment.service';
import { IDinnerDocument } from '../../../interfaces/dinners/dinners.interfaces';
import { IDinnerPortionDocument } from '../../../interfaces/dinners/dinnerPortions.interfaces';

//functions
import {
  ICurrentDayRecommendDinner,
  IMealRecommend,
  mealRecommend,
} from './mealRecommend/mealRecommend';
import { getMealDinnersPortionsMacro } from './portionsMacro/getDinnerPortionsMacro';
import {
  cartesianDinners,
  ICartesianResult,
} from './cartesianDinners/cartesianDinners';
import { selectGroups } from './selectGroups';
import { getDinnerPortion } from '../../dinner/dinnerPortion.service';
import { getDinner } from '../../dinner/dinner.service';
import { IMealToRecommend } from './dietDayGenerate';
import { getDietDinners } from '../../diet/dietDinner.service';
import { IDietDinnerDocument } from '../../../interfaces/diet/dietDinner.interfaces';
import { getDietDay } from '../../diet/dietDay.service';
import { IDietMealDocument } from '../../../interfaces/diet/dietMeal.interfaces';
import { IDietEstablishmentDocument } from '../../../interfaces/dietEstablishments.interfaces';

interface IMealsGenerateArgs {
  mealsToRecommend: IMealToRecommend[];
  currentDayId: string;
}

export interface IGenerateDinner {
  _id: string;
  dinnerId: string;
  dinnerName: string;
  dinnerImage?: string;
  dinnerProducts: ICartesianResult['products'];
  total: {
    kcal: number;
    protein: {
      gram: number;
    };
    fat: {
      gram: number;
    };
    carbohydrates: {
      gram: number;
    };
  };
}

export interface IDietGenerateMeal {
  _id: string; //dietDayMealID to generate,
  name: string;
  type: IDietMealDocument['type'];
  generatedType: 'new' | 'added' | 'addedChangePortion'; //or added or addedChangePortion,
  randomType: IMealRecommend['dayMealGenerateType'];
  totalGroups?: number;
  selectedGroup?: {
    type: string;
    name: string;
    description: string;
    macroTotalCount?: ICartesianResult['macroTotalCount'];
    missingProcentCount?: ICartesianResult['missingProcentCount'];
  };
  total: IDietMealDocument['total']; //albo dodane już meal total albo przerobić generatedMacroTotalCount
  generatedDinners?: IGenerateDinner[];
  addedMealObj?: IDietMealDocument; //or undefined when new,
}

interface IMealRecommendWithGeneratedType extends IMealRecommend {
  generatedType: 'new' | 'added' | 'addedChangePortion';
}

export const mealsGenerate = async ({
  mealsToRecommend,
  currentDayId,
}: IMealsGenerateArgs) => {
  const metricsLabels = {
    operation: 'mealsGenerate',
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    //random dietMeals
    const dayRecommendMeals: IMealRecommendWithGeneratedType[] = [];

    for (
      let mealIndex = 0, length = mealsToRecommend.length;
      mealIndex < length;
      mealIndex++
    ) {
      console.log('start generowania posiłku');

      const meal = mealsToRecommend[mealIndex];

      console.log({ mealIndex });
      if (meal.generatedType === 'addedChangePortion') {
        const mealDinners = await getDietDinners({ dietMealId: meal._id });
        const mealObj = {
          dayMealId: meal._id,
          dayMealType: meal.type,
          dayMealDinners: mealDinners,
          dayId: meal.dayId,
          generatedType: meal.generatedType,
        };
        console.log({ mealObj });
        dayRecommendMeals.push(mealObj);
      } else {
        if (dayRecommendMeals.length < 1) {
          //ważne
          //poprawić funkcje rekomendacji z pustą tablicą
          const recommendMeal = await mealRecommend({
            mealDayId: meal.dayId,
            mealType: meal.type,
            currentDayRecommendDinners: [],
          });

          const randomMealWithGeneratedType = {
            ...recommendMeal,
            generatedType: meal.generatedType,
          };

          dayRecommendMeals.push(randomMealWithGeneratedType);
        } else {
          const flatDayDinners = dayRecommendMeals.flatMap(
            ({ dayMealDinners }) => dayMealDinners
          );

          const currentDayRecommendDinners = await Promise.all(
            flatDayDinners.map(async (dietDinner) => {
              const dinnerPortion = (await getDinnerPortion({
                _id: dietDinner.dinnerPortionId,
              })) as IDinnerPortionDocument;

              const dinner = (await getDinner({
                _id: dinnerPortion.dinnerId,
              })) as IDinnerDocument;

              //dayMealDietDinners
              const dietDinnerToRecommend: ICurrentDayRecommendDinner = {
                _id: dietDinner._id,
                userId: dietDinner.user,
                'diet.clientId': 'sda',
                'diet.clientPreferencesGroup': 1,
                'dinner._id': dinner._id, //ważne
                'dinner.name': dinner.name, ////ważne
                'dinner.products': [],
                'dinner.likedProductsPoints': 0,
                'diet._id': dietDinner.dietId,
                'diet.name': 'dieta 5',
                'day._id': 'nowy',
                'day.name': 'dzien 1',
                'meal._id': dietDinner.dietMealId,
                'meal.name': meal.name,
                'meal.type': meal.type,
              };

              return dietDinnerToRecommend;
            })
          );
          const recommendMeal = await mealRecommend({
            mealDayId: meal.dayId,
            mealType: meal.type,
            currentDayRecommendDinners,
          });

          const randomMealWithGeneratedType = {
            ...recommendMeal,
            generatedType: meal.generatedType,
          };

          console.log(
            `Wybrano posiłek poprzez: ${recommendMeal.dayMealGenerateType}`
          );

          dayRecommendMeals.push(randomMealWithGeneratedType);
        }
      }
    }

    const mealsDinnersPortionsMacro = await Promise.all(
      dayRecommendMeals.map(async (recommendMeal) => {
        const dinnerPortionsMacro = await Promise.all(
          recommendMeal.dayMealDinners.map(async (recommendDietDinner) => {
            const dinnerMacroPortion = await getMealDinnersPortionsMacro(
              recommendDietDinner
            );

            return {
              ...recommendDietDinner,
              dinnerMacroPortion,
            };
          })
        );

        return {
          ...recommendMeal,
          dinnerPortionsMacro,
        };
      })
    );

    if (!mealsDinnersPortionsMacro) return;

    const mealDinners = mealsDinnersPortionsMacro.map((meal) => {
      const allMealDinnerProductsWithPortions = meal.dinnerPortionsMacro.map(
        ({ dinnerMacroPortion }) => {
          const portions = dinnerMacroPortion.dinnerProductsPortions;

          return portions;
        }
      );

      // console.log({ allMealDinnerProductsWithPortions });

      const concatMealDinnersPortions =
        allMealDinnerProductsWithPortions.flatMap((mealDinners) => mealDinners);

      // console.log({ concatMealDinnersPortions });

      //złączenie wszystkich produktów w posiłku (odróżnienie za pomocą dinnerId)
      //concatMealDinners => algorytm kartezjański

      return {
        ...meal,
        concatMealDinnersPortions,
      };
    });

    const day = await getDietDay({ _id: currentDayId });
    const diet = await getDiet({ _id: day?.dietId });

    if (!diet) return;

    const dietEstablishment = await getDietEstablishment({
      _id: diet.establishmentId,
    });

    if (!dietEstablishment) return;

    console.time('cartesianProduct');
    // połączone porcje wszystkich dań posiłków np (danie główne i danie uzupełniające)

    const dinnersCartesianGroups = await Promise.all(
      mealDinners.map(async (mealDinner) => {
        const meal = (await getDietMeal({
          _id: mealDinner.dayMealId,
        })) as IDietMealDocument;
        const currentDayMeal = (await getDietMeal({
          dayId: currentDayId,
          type: meal.type,
        })) as IDietMealDocument; //znajduje meal danego dnia
        const mealEstablishment = dietEstablishment.meals.find(
          ({ _id }) => _id === currentDayMeal.establishmentMealId
        ) as IDietEstablishmentDocument['meals'][0]; //błąd

        // console.log({
        //   mealEstablishmentId: currentDayMeal.establishmentMealId, //inCorrect
        //   dietEstablishmentMealsId: dietEstablishment.meals.map(
        //     (mealE) => mealE._id //correct
        //   ),
        // });

        const cartesianResultGroups = [];

        for (
          let currentProcent = 2, l = 100;
          currentProcent < l;
          currentProcent++
        ) {
          const dinnersCartesianGroups = cartesianDinners(
            currentProcent,
            mealEstablishment, //get establishment
            dietEstablishment,
            ...mealDinner.concatMealDinnersPortions
          );

          if (dinnersCartesianGroups.length > 0) {
            console.log(`Procent odchylenia grup: ${currentProcent}`);
            cartesianResultGroups.push(...dinnersCartesianGroups);
            break;
          }

          if (currentProcent === l - 1) {
            console.log({ mealName: meal.name, procent: currentProcent });
          }
        }

        const cartesianGroup = {
          mealId: meal._id,
          mealName: meal.name,
          mealsType: meal.type,
          generatedType: mealDinner.generatedType, // błąd => dodać info czy typ == new, changeAddedPortion itp
          randomType: mealDinner.dayMealGenerateType,
          mealEstablishment: mealEstablishment,
          groups: cartesianResultGroups,
        };

        console.log({
          groupsLength: cartesianResultGroups.length,
          mealName: meal.name,
        });

        return cartesianGroup;
      })
    );

    console.timeEnd('cartesianProduct');

    const selectedDinners = dinnersCartesianGroups.map((meal) => ({
      mealId: meal.mealId,
      mealName: meal.mealName,
      generatedType: meal.generatedType,
      randomType: meal.randomType,
      mealType: meal.mealsType,
      groups: selectGroups(meal.groups),
    }));

    const generatedMeals: IDietGenerateMeal[] = await Promise.all(
      selectedDinners.map(async (meal) => {
        const randomMeal = dayRecommendMeals.filter(
          (randomMeal) => randomMeal.dayMealId == meal.mealId.toString()
        )[0];

        const mealDinners = await Promise.all(
          randomMeal.dayMealDinners.map(async (dietDinner) => {
            const dinnerPortion = (await getDinnerPortion({
              _id: dietDinner.dinnerPortionId,
            })) as IDinnerPortionDocument;
            const dinner = (await getDinner({
              _id: dinnerPortion.dinnerId,
            })) as IDinnerDocument;

            console.log({ mainGroup: meal.groups.main });

            const mealDinnerObj = {
              _id: dietDinner._id,
              dinnerId: dinner._id,
              dinnerName: dinner.name,
              dinnerImage: dinner.image,
              dinnerProducts: meal.groups.main?.group?.products.filter(
                ({ dinnerId }) => dinnerId == dinner._id.toString()
              ),
              total: {
                kcal: roundValue(
                  meal.groups.main.group.products.reduce(
                    (acc, field) => acc + Number(field.portionKcal),
                    0
                  )
                ),
                protein: {
                  gram: roundValue(
                    meal.groups.main.group.products.reduce(
                      (acc, field) => acc + Number(field.portionProteinGram),
                      0
                    )
                  ),
                },
                fat: {
                  gram: roundValue(
                    meal.groups.main.group.products.reduce(
                      (acc, field) => acc + Number(field.portionFatGram),
                      0
                    )
                  ),
                },
                carbohydrates: {
                  gram: roundValue(
                    meal.groups.main.group.products.reduce(
                      (acc, field) =>
                        acc + Number(field.portionCarbohydratesGram),
                      0
                    )
                  ),
                },
              },
            };

            return mealDinnerObj;
          })
        );

        const currentDayMeal = (await getDietMeal({
          dayId: currentDayId,
          type: meal.mealType,
        })) as IDietMealDocument;

        const mealObj: IDietGenerateMeal = {
          _id: currentDayMeal._id, //meal danego dnia
          name: meal.mealName,
          type: meal.mealType,
          generatedType: meal.generatedType, //edytować meal.generatedType
          randomType: meal.randomType,
          totalGroups: dinnersCartesianGroups.find(
            (cartesianGroup) => cartesianGroup.mealsType === meal.mealType
          )?.groups.length,
          selectedGroup: {
            type: meal.groups.main.type,
            name: meal.groups.main.name,
            description: meal.groups.main.description,
            macroTotalCount: meal.groups.main.group?.macroTotalCount,
            missingProcentCount: meal.groups.main.group?.missingProcentCount,
          },
          generatedDinners: mealDinners,
          total: {
            kcal: meal.groups.main.group.macroTotalCount?.total_kcal,
            procent: 0,
            protein: {
              procent: 0,
              kcal: 0,
              gram: meal.groups.main.group.macroTotalCount?.total_protein_gram,
            },
            fat: {
              procent: 0,
              kcal: 0,
              gram: meal.groups.main.group.macroTotalCount?.total_fat_gram,
            },
            carbohydrates: {
              procent: 0,
              kcal: 0,
              gram: meal.groups.main.group.macroTotalCount
                ?.total_carbohydrates_gram,
            },
            fiber: {
              kcal: 0,
              gram: 0,
            },
          },
        };

        return mealObj;
      })
    );

    console.log({ dayRecommendMeals });
    timer({ ...metricsLabels, success: 'true' });
    return generatedMeals;
  } catch (e) {
    console.log(e);
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
};

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
