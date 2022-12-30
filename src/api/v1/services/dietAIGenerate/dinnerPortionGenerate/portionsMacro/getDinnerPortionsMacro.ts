import { IProductDocument } from '../../../../interfaces/products.interfaces';
import { getDinnerProducts } from '../../../dinner/dinnerProduct.service';
import { getProduct } from '../../../products.service';

export const getDinnerPortionsMacro = async (dinnerId: string) => {
  const dinnerProducts = await getDinnerProducts({
    dinnerId: dinnerId,
  });

  const dinnerProductsPortions = await Promise.all(
    dinnerProducts.map(
      async ({ dinnerId, defaultAmount, portionsGram, productId, _id }) => {
        const product = (await getProduct({
          _id: productId,
        })) as IProductDocument;
        //getProduct by productId aby obliczyć makro dla każdej porcji
 
        const macroForPortions = portionsGram.map((portionGram) => {
          const portionMacro = countMacroPortion(portionGram, product);
          return portionMacro;
        });

        return macroForPortions.map((macroPortion) => ({
          ...macroPortion,
          dinnerId,
          product,
          dinnerProductId: _id,
        }));
      }
    )
  );

  return dinnerProductsPortions;
};

export const countMacroPortion = (
  portion: number,
  productObj: IProductDocument
) => {
  const portionProteinGram = (portion * productObj.protein.gram) / 100;
  const portionProteinKcal = portionProteinGram * 4;

  const portionFatGram = (portion * productObj.fat.gram) / 100;
  const portionFatKcal = portionFatGram * 9;

  const portionCarbohydratesGram =
    (portion * productObj.carbohydrates.gram) / 100;
  const portionCarbohydratesKcal = portionCarbohydratesGram * 4;

  const portionFiberGram = (portion * productObj.fiber.gram) / 100;

  const portionFiberKcal = portionFiberGram * 2;

  const portionDisgestibleCarbohydratesGram =
    portionCarbohydratesGram - portionFiberGram;
  const portionDisgestibleCarbohydratesKcal =
    portionDisgestibleCarbohydratesGram * 4;

  const portionKcal =
    portionProteinKcal + portionFatKcal + portionCarbohydratesKcal;

  return {
    productId: productObj._id,
    productName: productObj.name,
    portion,
    portionKcal: roundMacro(portionKcal),
    portionProteinGram: roundMacro(portionProteinGram),
    portionProteinKcal: roundMacro(portionProteinKcal),
    portionFatGram: roundMacro(portionFatGram),
    portionFatKcal: roundMacro(portionFatKcal),
    portionCarbohydratesGram: roundMacro(portionCarbohydratesGram),
    portionCarbohydratesKcal: roundMacro(portionCarbohydratesKcal),
    portionFiberGram: roundMacro(portionFiberGram),
    portionFiberKcal: roundMacro(portionFiberKcal),
    portionDisgestibleCarbohydratesGram: roundMacro(
      portionDisgestibleCarbohydratesGram
    ),
    portionDisgestibleCarbohydratesKcal: roundMacro(
      portionDisgestibleCarbohydratesKcal
    ),
  };
};

const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

export type PortionMacro = ReturnType<typeof countMacroPortion>;

export type DinnerPortionsMacro = Awaited<
  ReturnType<typeof getDinnerPortionsMacro>
>;
