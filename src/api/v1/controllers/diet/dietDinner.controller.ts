import { Request, Response } from 'express';
//dietDays
import {
  CreateDietDinnerInput,
  UpdateDietDinnerInput,
  DeleteDietDinnerInput,
  GetDietDinnerInput,
  GetDietDinnersInput,
  GetDietDinnersByPortionInput,
} from '../../schema/diet/dietDinner.schema';

import {
  createDietDinner,
  deleteDietDinner,
  getAndUpdateDietDinner,
  getDietDinner,
  getDietDinners,
} from '../../services/diet/dietDinner.service';

import { getDiet } from '../../services/diet/diet.service';

import { getDinnerPortion } from '../../services/dinner/dinnerPortion.service';
import { getDinnerProduct } from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';
import { getDinner } from '../../services/dinner/dinner.service';
import { dietEmitter } from './events';

export async function createDietDinnerController(
  req: Request<{}, {}, CreateDietDinnerInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dietDinner = await createDietDinner({
    ...body,
    user: userId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  // const dinnerPortion = await getDinnerPortion({
  //   _id: dietDinner.dinnerPortionId,
  // });

  // if (!dinnerPortion) {
  //   return res.sendStatus(404);
  // }

  // const dinner = await getDinner({
  //   _id: dinnerPortion.dinnerId,
  // });

  dietEmitter.emit('dietDinner::created', 200, dietDinner);

  // const dietDinnerPortionProducts = await Promise.all(
  //   dinnerPortion.dinnerProducts.map(async (dinnerPortionProduct) => {
  //     const dinnerProduct = await getDinnerProduct({
  //       _id: dinnerPortionProduct.dinnerProductId,
  //     });
  //     const product = await getProduct({ _id: dinnerProduct?.productId });

  //     return {
  //       ...dinnerPortionProduct,
  //       dinnerProduct: {
  //         ...dinnerProduct,
  //         product,
  //       },
  //     };
  //   })
  // );

  // const dietDinnerQueryObj = {
  //   ...dietDinner,
  //   dinnerPortion: {
  //     ...dinnerPortion,
  //     dinner,
  //     dinnerProducts: dietDinnerPortionProducts,
  //   },
  // }; //correct => przeniesc do get dietDinner

  console.log('send dinner to frontend');

  return res.send(dietDinner);
  // return res.send(dietDinnerQueryObj);
}

export async function updateDietDinnerController(
  req: Request<UpdateDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const update = req.body;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDietDinner = await getAndUpdateDietDinner(
    { _id: dietDinnerId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDietDinner);
}

export async function getDietDinnerController(
  req: Request<GetDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;
  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dietDinner);
}

export async function getAllDietDinnersController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  // const userId = res.locals.user._id;
  // const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({});

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });
      const dinner = await getDinner({ _id: dinnerPortion?.dinnerId });

      return {
        ...dietDinner,
        diet,
        dinner,
      };
    })
  );

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({
    user: userId,
    dietMealId: mealId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const sortedDinners = [...dietDinners].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersByPortionIdController(
  req: Request<GetDietDinnersByPortionInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const portionId = req.params.dinnerPortionId;

  const dietDinners = await getDietDinners({
    user: userId,
    dinnerPortionId: portionId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const diet = await getDiet({ _id: dietDinner.dietId });

      return {
        ...dietDinner,
        diet,
      };
    })
  );

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function getDietDinnersQueryController(
  req: Request<GetDietDinnersInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const mealId = req.params.dietMealId;

  const dietDinners = await getDietDinners({
    user: userId,
    dietMealId: mealId,
  });

  if (!dietDinners) {
    return res.sendStatus(404);
  }

  const dietDinnersQuery = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      const dinnerPortion = await getDinnerPortion({
        _id: dietDinner.dinnerPortionId,
      });

      return {
        ...dietDinner,
        dinnerPortion,
      };
    })
  );

  const sortedDinners = [...dietDinnersQuery].sort((a, b) => a.order - b.order);

  return res.send(sortedDinners);
}

export async function deleteDietDinnerController(
  req: Request<DeleteDietDinnerInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dietDinnerId = req.params.dietDinnerId;

  const dietDinner = await getDietDinner({
    _id: dietDinnerId,
  });

  if (!dietDinner) {
    return res.sendStatus(404);
  }

  if (String(dietDinner.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteDietDinner({ _id: dietDinnerId });

  return res.sendStatus(200);
}
