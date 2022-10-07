//functions
import { mealRecommend } from './mealRecommend/mealRecommend';

interface IMealGenerateArgs {
  mealDayId: string;
}

export const mealGenerate = async ({ mealDayId }: IMealGenerateArgs) => {
  const recommendMeals = await mealRecommend({ mealDayId });

  if (!recommendMeals || recommendMeals.length < 1) return; //random dietMeal
  const recommendMeal = recommendMeals[0];

  //mealDinnersMacroPortion
  //mealDinnersCartesianGroups
  //mealDinnersSelectGroups

  return recommendMeal;
};
