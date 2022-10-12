import axios from 'axios';
import { forEach } from 'lodash';
import { IDietMealDocument } from '../../../../interfaces/diet/dietMeal.interfaces';
import { IDietDinnerDocument } from '../../../../interfaces/diet/dietDinner.interfaces';
import { getDietDinners } from '../../../diet/dietDinner.service';
import { getDietMeal, getDietMeals } from '../../../diet/dietMeal.service';
import { getAllDietMealsController } from '../../../../controllers/diet/dietMeal.controller';

// interface IRecommendDietDinnerArg {
//   _id: string;
//   userId: string;
//   'diet._id': string;
//   'diet.name': string;
//   'diet.clientId': string;
//   'diet.clientPreferencesGroup': number;
//   'dinner._id': string;
//   'dinner.name': string;
//   'dinner.products': string[];
//   'dinner.likedProductsPoints': number;
//   'meal._id': string;
//   'meal.name': string;
//   'meal.type': string;
// }

// interface IRecommendDinnerData {
//   distance: number;
//   recommend_dinner: string;
//   recommend_dinner_id: string;
//   mealType: string;
// }

interface IRecommendDietDayData {
  dayDistance: number;
  dayId: string;
}

export interface IMealRecommend {
  dayMealId: string;
  dayMealType: IDietMealDocument['type'];
  dayMealDinners: IDietDinnerDocument[];
  dayDistance?: number;
  dayMealGenerateType?: 'recommend' | 'random';
  dayId: string;
}

//dietDinner
export interface ICurrentDayRecommendDinner {
  _id: string;
  userId: string;
  'diet._id': string;
  'diet.name': string;
  'diet.clientId': string;
  'diet.clientPreferencesGroup': number;
  'dinner._id': string;
  'dinner.name': string;
  'dinner.products': [];
  'dinner.likedProductsPoints': number;
  'day._id': string;
  'day.name': string;
  'meal._id': string;
  'meal.name': string;
  'meal.type': IDietMealDocument['type'];
}

interface IRecommendDietDayArgs {
  mealDayId: string;
  mealType: IDietMealDocument['type'];
  currentDayRecommendDinners: ICurrentDayRecommendDinner[];
}

export const mealRecommend = async ({
  mealDayId,
  mealType,
  currentDayRecommendDinners,
}: IRecommendDietDayArgs) => {
  try {
    //w generowaniu diety przekazanie już wygenerowanych posiłków
    const recommendDietDaysRes = await axios.post<IRecommendDietDayData[]>(
      'https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-days-to-diet',
      { currentDayRecommendDinners: currentDayRecommendDinners }
    );

    // const recommendDietDaysRes = { data: [] as IRecommendDietDayData[] };

    //zwraca rekomendowany dzień
    if (!recommendDietDaysRes || recommendDietDaysRes.data.length < 1) {
      throw 'Brak rekomendowanych dni';
    }

    console.log({ recommendDietDaysRes });

    const recommendMeals = await Promise.all(
      recommendDietDaysRes.data.map(async (day) => {
        const dayMeal = (await getDietMeal({
          dayId: day.dayId,
          type: mealType,
        })) as IDietMealDocument;
        const dayMealDinners = await getDietDinners({
          dietMealId: dayMeal?._id,
        });

        const recommendMealObj: IMealRecommend = {
          ...day,
          dayMealId: dayMeal._id,
          dayMealType: dayMeal.type,
          dayMealDinners,
          dayMealGenerateType: 'recommend',
        };
        return recommendMealObj;
      })
    );

    const recommendMeal = recommendMeals.find(
      (meal) => meal.dayMealDinners.length > 0
    );

    console.log({ recommendMeals, recommendMeal });

    if (!recommendMeal) throw 'Rekomendowany posiłek nie zawiera potraw';

    return recommendMeal;
  } catch (e) {
    console.log(`Błąd podczas rekomendacji posiłku`);
    const allDietMeals = await getDietMeals({});

    const allDietMealsValidDinners: IDietMealDocument[] = [];

    const allDietMealsWithDinners = await Promise.all(
      allDietMeals.map(async (dietMeal) => {
        const mealDinners = await getDietDinners({ dietMealId: dietMeal._id });
        if (mealDinners.length > 0) {
          allDietMealsValidDinners.push(dietMeal);
        }
      })
    );
    const filteredDietMealsByType = allDietMealsValidDinners.filter(
      (dietMeal) => dietMeal.type === mealType
    );

    const randomDietMeal =
      filteredDietMealsByType[
        Math.floor(Math.random() * filteredDietMealsByType.length)
      ];

    const dayMealDinners = await getDietDinners({
      dietMealId: randomDietMeal._id,
    });

    const randomMealObj: IMealRecommend = {
      dayMealId: randomDietMeal._id,
      dayMealType: randomDietMeal.type,
      dayMealDinners,
      dayId: randomDietMeal.dayId,
      dayMealGenerateType: 'random',
    };

    console.log({ randomMealObj });

    return randomMealObj;
  }
};
