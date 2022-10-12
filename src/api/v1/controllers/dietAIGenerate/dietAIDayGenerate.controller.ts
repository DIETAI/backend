import { Request, Response } from 'express';
//dietDays
import { GenerateDayInput } from '../../schema/dietAIGenerate/dietAIDayGenerate.schema';

import { dietDayGenerate } from '../../services/dietAIGenerate/dietDayGenerate/dietDayGenerate';

export async function dayGenerateController(
  req: Request<{}, {}, GenerateDayInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const generatedDay = await dietDayGenerate({
    ...body,
  });

  if (!generatedDay) {
    return res.sendStatus(404);
  }

  return res.send(generatedDay);
}
