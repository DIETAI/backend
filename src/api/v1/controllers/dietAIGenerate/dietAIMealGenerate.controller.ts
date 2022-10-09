import { Request, Response } from 'express';
//dietDays
import { GenerateMealInput } from '../../schema/dietAIGenerate/dietAIMealGenerate.schema';

import { mealGenerate } from '../../services/dietAIGenerate/mealGenerate/mealGenerate';

export async function mealGenerateController(
  req: Request<{}, {}, GenerateMealInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const generatedMeal = await mealGenerate({
    ...body,
  });

  if (!generatedMeal) {
    return res.sendStatus(404);
  }

  return res.send(generatedMeal);
}
