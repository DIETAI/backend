import { Request, Response } from 'express';
import {
  CreateDinnerProductInput,
  UpdateDinnerProductInput,
  DeleteDinnerProductInput,
  GetDinnerProductInput,
  GetDinnerProductsInput,
} from '../../schema/dinners/dinnerProducts.schema';
import {
  createDinnerProduct,
  deleteDinnerProduct,
  getAndUpdateDinnerProduct,
  getDinnerProduct,
  getDinnerProducts,
} from '../../services/dinner/dinnerProduct.service';

import {
  getDinnerPortions,
  createDinnerPortion,
  getAndUpdateDinnerPortion,
  deleteDinnerPortion,
} from '../../services/dinner/dinnerPortion.service';
import { getProduct } from '../../services/products.service';
import { IDinnerPortionInput } from '../../interfaces/dinners/dinnerPortions.interfaces';

//helpers
import { countTotal } from '../../helpers/countTotal';
import { sumTotal } from '../../helpers/sumTotal';
import { IProductDocument } from '../../interfaces/products.interfaces';

//events
import { dinnerEmitter } from './events';

export async function createDinnerProductController(
  req: Request<{}, {}, CreateDinnerProductInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const dinnerProduct = await createDinnerProduct({
    ...body,
    user: userId,
  });

  dinnerEmitter.emit('dinnerProduct:create', dinnerProduct, userId);

  // //create dinnerPortion
  // const dinnerProductQuery = await getProduct({
  //   _id: dinnerProduct.productId,
  // });

  // if (!dinnerProductQuery) {
  //   return res.sendStatus(404);
  // }

  // const dinnerPortions = getDinnerPortions({
  //   user: userId,
  //   dinnerId: dinnerProduct.dinnerId,
  // });

  // const dinnerProducts = getDinnerProducts({
  //   user: userId,
  //   dinnerId: dinnerProduct.dinnerId,
  // });

  // const [portions, products] = await Promise.all([
  //   dinnerPortions,
  //   dinnerProducts,
  // ]);

  // const dinnerProductsQuery = await Promise.all(
  //   products.map(async (dinnerProduct) => {
  //     const product = await getProduct({ _id: dinnerProduct.productId });

  //     return {
  //       ...dinnerProduct,
  //       product,
  //     };
  //   })
  // );

  // if (portions.length < 1) {
  //   //stworzyć model product portion {portion: 100, type: default}?

  //   const portionDinnerProducts = dinnerProductsQuery.map((dinnerProduct) => ({
  //     dinnerProductId: dinnerProduct._id,
  //     portion: dinnerProduct.defaultAmount,
  //     total: countTotal({
  //       product: dinnerProduct.product as IProductDocument,
  //       portion: dinnerProduct.defaultAmount,
  //     }),
  //   }));

  //   const total = sumTotal({ dinnerPortionProducts: portionDinnerProducts });

  //   const newDinnerPortionObj: IDinnerPortionInput = {
  //     user: userId,
  //     type: 'default',
  //     dinnerId: dinnerProduct.dinnerId,
  //     total,
  //     dinnerProducts: portionDinnerProducts,
  //   };

  //   const newDinnerPortion = await createDinnerPortion({
  //     ...newDinnerPortionObj,
  //   });
  // }
  // if (portions.length > 0) {
  //   const newDinnerPortionProductObj = {
  //     dinnerProductId: dinnerProduct._id,
  //     portion: dinnerProduct.defaultAmount,
  //     total: countTotal({
  //       product: dinnerProductQuery,
  //       portion: dinnerProduct.defaultAmount,
  //     }),
  //   };

  //   const newPortions = await Promise.all(
  //     portions.map(async (dinnerPortion) => {
  //       const newDinerProducts = [
  //         ...dinnerPortion.dinnerProducts,
  //         newDinnerPortionProductObj,
  //       ];
  //       const editPortionObj = {
  //         ...dinnerPortion,
  //         total: sumTotal({ dinnerPortionProducts: newDinerProducts }),
  //         dinnerProducts: newDinerProducts,
  //       };
  //       const updatedPortion = await getAndUpdateDinnerPortion(
  //         { _id: dinnerPortion._id },
  //         editPortionObj,
  //         { new: true }
  //       );

  //       console.log({ updatedPortion });
  //     })
  //   );
  // }

  return res.send(dinnerProduct);
}

export async function updateDinnerProductController(
  req: Request<UpdateDinnerProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const dinnerProductId = req.params.dinnerProductId;
  const update = req.body;

  const dinnerProduct = await getDinnerProduct({
    _id: dinnerProductId,
  });

  if (!dinnerProduct) {
    return res.sendStatus(404);
  }

  if (String(dinnerProduct.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedDinnerProduct = await getAndUpdateDinnerProduct(
    { _id: dinnerProductId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedDinnerProduct);
}

export async function getDinnerProductController(
  req: Request<GetDinnerProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerProductId = req.params.dinnerProductId;
  const dinnerProduct = await getDinnerProduct({
    _id: dinnerProductId,
  });

  if (!dinnerProduct) {
    return res.sendStatus(404);
  }

  if (String(dinnerProduct.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(dinnerProduct);
}

export async function getDinnerProductQueryController(
  req: Request<GetDinnerProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerProductId = req.params.dinnerProductId;
  const dinnerProduct = await getDinnerProduct({
    _id: dinnerProductId,
  });

  if (!dinnerProduct) {
    return res.sendStatus(404);
  }

  if (String(dinnerProduct.user) !== userId) {
    return res.sendStatus(403);
  }

  const product = await getProduct({ _id: dinnerProduct.productId });

  if (!product) {
    return res.sendStatus(404);
  }

  const dinnerProductQueryObj = {
    ...dinnerProduct,
    product,
  };

  return res.send(dinnerProductQueryObj);
}

export async function getAllDinnerProductsController(
  req: Request,
  res: Response
) {
  // const userId = res.locals.user._id;
  const dinnerProducts = await getDinnerProducts({
    // user: userId,
  });

  if (!dinnerProducts) {
    return res.sendStatus(404);
  }

  const dinnerProductsQuery = await Promise.all(
    dinnerProducts.map(async (dinnerProduct) => {
      const product = await getProduct({ _id: dinnerProduct.productId });

      return {
        productName: product?.name,
        ...dinnerProduct,
      };
    })
  );

  return res.send(dinnerProductsQuery);
}

export async function getDinnerProductsController(
  req: Request<GetDinnerProductsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;
  const dinnerProducts = await getDinnerProducts({
    user: userId,
    dinnerId: dinnerId,
  });

  if (!dinnerProducts) {
    return res.sendStatus(404);
  }

  return res.send(dinnerProducts);
}

export async function getDinnerProductsQueryController(
  req: Request<GetDinnerProductsInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerId = req.params.dinnerId;
  const dinnerProducts = await getDinnerProducts({
    user: userId,
    dinnerId: dinnerId,
  });

  if (!dinnerProducts) {
    return res.sendStatus(404);
  }

  const dinnerProductsQuery = await Promise.all(
    dinnerProducts.map(async (dinnerProduct) => {
      const product = await getProduct({ _id: dinnerProduct.productId });

      return {
        ...dinnerProduct,
        product,
      };
    })
  );

  if (!dinnerProductsQuery) {
    return res.sendStatus(404);
  }

  return res.send(dinnerProductsQuery);
}

export async function deleteDinnerProductController(
  req: Request<DeleteDinnerProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const dinnerProductId = req.params.dinnerProductId;

  const dinnerProduct = await getDinnerProduct({
    _id: dinnerProductId,
  });

  if (!dinnerProduct) {
    return res.sendStatus(404);
  }

  if (String(dinnerProduct.user) !== userId) {
    return res.sendStatus(403);
  }

  //delete portions
  const dinnerPortions = getDinnerPortions({
    user: userId,
    dinnerId: dinnerProduct.dinnerId,
  });

  const dinnerProducts = getDinnerProducts({
    user: userId,
    dinnerId: dinnerProduct.dinnerId,
  });

  const [portions, products] = await Promise.all([
    dinnerPortions,
    dinnerProducts,
  ]);

  //delete dinnerPortion
  if (products.length === 1) {
    await Promise.all(
      portions.map(async (dinnerPortion) => {
        await deleteDinnerPortion({ _id: dinnerPortion._id });
      })
    );
  }

  //delete dinnerPortionProduct
  if (products.length > 1) {
    const newPortions = await Promise.all(
      portions.map(async (dinnerPortion) => {
        const editPortionObj = {
          ...dinnerPortion,
          dinnerProducts: dinnerPortion.dinnerProducts.filter(
            (dinnerProduct) =>
              dinnerProduct.dinnerProductId.toString() !== dinnerProductId
          ),
        };

        console.log({ editPortionObjProducts: editPortionObj.dinnerProducts });
        const updatedPortion = await getAndUpdateDinnerPortion(
          { _id: dinnerPortion._id },
          editPortionObj,
          { new: true }
        );

        console.log({ updatedPortion });
      })
    );
  }

  await deleteDinnerProduct({ _id: dinnerProductId });

  return res.sendStatus(200);
}
