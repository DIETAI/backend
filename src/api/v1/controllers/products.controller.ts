import { Request, Response } from 'express';
import {
  CreateProductInput,
  UpdateProductInput,
  DeleteProductInput,
  GetProductInput,
  GetProductsInput,
} from '../schema/products.schema';
import {
  createProduct,
  deleteProduct,
  getAndUpdateProduct,
  getProduct,
  getUserProducts,
} from '../services/products.service';

import ProductModel from '../models/product.model';
import { getAsset } from '../services/asset.service';

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

  const productImage = await getAsset({ _id: product.image });

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const productObj = {
    ...product,
    imageURL: productImage ? productImage.imageURL : undefined,
  };

  return res.send(productObj);
}

export async function getAllProductsController(req: Request, res: Response) {
  const products = await getUserProducts({});

  if (!products) {
    return res.sendStatus(404);
  }

  return res.send(products);
}

export async function getProductsController(
  req: Request<{}, {}, {}, GetProductsInput['query']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const queryPage = req.query.page;
  const itemsCount = req.query.itemsCount;

  console.log({ productsQuery: queryPage, itemsCount });

  if (queryPage && itemsCount) {
    const page = parseInt(queryPage);
    const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
    console.log({ skip });
    const countPromise = ProductModel.estimatedDocumentCount();
    const productsPromise = ProductModel.find({ user: userId })
      .limit(parseInt(itemsCount))
      .skip(skip);

    const [count, products] = await Promise.all([
      countPromise,
      productsPromise,
    ]);

    console.log({ productCounts: count });

    const productsQuery = await Promise.all(
      products.map(async (productDocument) => {
        const product = productDocument.toObject();
        if (!product.image) {
          return { ...product, imageURL: undefined };
        }

        const productAsset = await getAsset({ _id: product.image });

        if (!productAsset) {
          return { ...product, imageURL: undefined };
        }

        return { ...product, imageURL: productAsset.imageURL };
      })
    );

    const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
    console.log({ productsPageCount: pageCount });

    if (!count || !products) {
      return res.sendStatus(404);
    }

    return res.send({
      pagination: {
        count,
        pageCount,
      },
      products: productsQuery,
    });
  }

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
