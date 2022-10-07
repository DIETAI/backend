import axios from 'axios';

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

interface IRecommendDietMealData {
  distance: number;
  recommendMealId: string;
}

export const mealRecommend = async ({ mealDayId }: { mealDayId: string }) => {
  try {
    const recommendMealsRes = await axios.post<IRecommendDietMealData[]>(
      'https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-dinners',
      mealDayId
    );

    console.log({ recommendMealsRes });

    return recommendMealsRes.data;
  } catch (e) {
    return;
  }

  //przesłanie do algorytmu mealDayId => wybranie wszystkich dietDinners gdzie dietDinner.dayId === mealDayId

  // const allDietDinners: IRecommendDietDinnerArg[] = dietDinners.map(
  //   (dietDinner) => ({
  //     _id: dietDinner._id,
  //     userId: dietDinner.user,
  //     'diet._id': dietDinner.dietId + 'sed', //nie może być takie same id diety jak już dodanych dietDinners
  //     'diet.name': dietDinner.diet.name,
  //     'diet.clientId': dietDinner.diet.clientId,
  //     'diet.clientPreferencesGroup': 1,
  //     'dinner._id': dietDinner.dinner._id,
  //     'dinner.name': dietDinner.dinner.name,
  //     'dinner.products': ['dadqdqd', 'dqdwq'],
  //     'dinner.likedProductsPoints': 0,
  //     'meal._id': dietDinner.dietMealId,
  //     'meal.name': dietDinner.meal.name,
  //     'meal.type': dietDinner.meal.type,
  //   })
  // );
};
