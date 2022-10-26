import { Request, Response } from 'express';
//dietDays
import { GenerateDinnerPortionInput } from '../../schema/dietAIGenerate/dietAIDinnerPortionGenerate.schema';

import { dinnerPortionGenerate } from '../../services/dietAIGenerate/dinnerPortionGenerate/dinnerPortionGenerate';

export async function dinnerPortionGenerateController(
  req: Request<{}, {}, GenerateDinnerPortionInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const generatedDinnerPortion = await dinnerPortionGenerate({
    ...body,
  });

  if (!generatedDinnerPortion) {
    return res.sendStatus(404);
  }

  return res.send(generatedDinnerPortion);
}
