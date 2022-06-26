import { Request, Response } from 'express';
import {
  CreateProductInput,
  UpdateProductInput,
  DeleteProductInput,
  GetProductInput,
} from '../schema/products.schema';
import {
  createProduct,
  deleteProduct,
  getAndUpdateProduct,
  getProduct,
  getUserProducts,
} from '../services/products.service';

export async function createProductController(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const product = await createProduct({
    ...body,
    user: userId,
  });

  return res.send(product);
}

export async function updateProductController(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const productId = req.params.productId;
  const update = req.body;

  const product = await getProduct({
    _id: productId,
  });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await getAndUpdateProduct({ _id: productId }, update, {
    new: true,
  });

  return res.send(updatedProduct);
}

export async function getProductController(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await getProduct({
    _id: productId,
  });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  return res.send(product);
}

export async function getProductsController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const products = await getUserProducts({ user: userId });

  if (!products) {
    return res.sendStatus(404);
  }

  return res.send(products);
}

export async function deleteProductController(
  req: Request<DeleteProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await getProduct({
    _id: productId,
  });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ _id: productId });

  return res.sendStatus(200);
}
