import { EventEmitter } from 'events';
import { dietEmitter } from '../diet/events';

//services
import {
  getDietDinners,
  deleteDietDinner,
  getAndUpdateDietDinner,
} from '../../services/diet/dietDinner.service';

import {
  getDinnerPortion,
  getDinnerPortions,
  createDinnerPortion,
  getAndUpdateDinnerPortion,
} from '../../services/dinner/dinnerPortion.service';

import { getAndUpdateDietMeal } from '../../services/diet/dietMeal.service';

import { getDinnerProducts } from '../../services/dinner/dinnerProduct.service';
import { getProduct } from '../../services/products.service';

//helpers
import { sumDietDinnersTotal } from '../diet/helpers';
import { countTotal } from '../../helpers/countTotal';
import { sumTotal } from '../../helpers/sumTotal';

//interfaces
import { IProductDocument } from '../../interfaces/products.interfaces';
import { IDinnerPortionInput } from '../../interfaces/dinners/dinnerPortions.interfaces';

import { getDietMeal } from '../../services/diet/dietMeal.service';
import { IDinnerProductDocument } from '../../interfaces/dinners/dinnerProducts.interfaces';
export const dinnerEmitter = new EventEmitter();

dinnerEmitter.on(
  'dinnerProduct:create',
  async (dinnerProduct: IDinnerProductDocument, userId: string) => {
    //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro

    const dinnerProductQuery = await getProduct({
      _id: dinnerProduct.productId,
    });

    if (!dinnerProductQuery) return;
    //getDinnerPortions
    const dinnerPortions = getDinnerPortions({
      dinnerId: dinnerProduct.dinnerId,
    });

    const dinnerProducts = getDinnerProducts({
      dinnerId: dinnerProduct.dinnerId,
    });

    const [portions, products] = await Promise.all([
      dinnerPortions,
      dinnerProducts,
    ]);

    const dinnerProductsQuery = await Promise.all(
      products.map(async (dinnerProduct) => {
        const product = await getProduct({ _id: dinnerProduct.productId });

        return {
          ...dinnerProduct,
          product,
        };
      })
    );

    if (portions.length < 1) {
      //stworzyć model product portion {portion: 100, type: default}?

      const portionDinnerProducts = dinnerProductsQuery.map(
        (dinnerProduct) => ({
          dinnerProductId: dinnerProduct._id,
          portion: dinnerProduct.defaultAmount,
          total: countTotal({
            product: dinnerProduct.product as IProductDocument,
            portion: dinnerProduct.defaultAmount,
          }),
        })
      );

      const total = sumTotal({ dinnerPortionProducts: portionDinnerProducts });

      const newDinnerPortionObj: IDinnerPortionInput = {
        user: userId,
        type: 'default',
        dinnerId: dinnerProduct.dinnerId,
        total,
        dinnerProducts: portionDinnerProducts,
      };

      const newDinnerPortion = await createDinnerPortion({
        ...newDinnerPortionObj,
      });

      return;
    }

    if (portions.length > 0) {
      const newDinnerPortionProductObj = {
        dinnerProductId: dinnerProduct._id,
        portion: dinnerProduct.defaultAmount,
        total: countTotal({
          product: dinnerProductQuery,
          portion: dinnerProduct.defaultAmount,
        }),
      };

      const newPortions = await Promise.all(
        portions.map(async (dinnerPortion) => {
          const newDinerProducts = [
            ...dinnerPortion.dinnerProducts,
            newDinnerPortionProductObj,
          ];
          const editPortionObj = {
            ...dinnerPortion,
            total: sumTotal({ dinnerPortionProducts: newDinerProducts }),
            dinnerProducts: newDinerProducts,
          };
          const updatedPortion = await getAndUpdateDinnerPortion(
            { _id: dinnerPortion._id },
            editPortionObj,
            { new: true }
          );
        })
      );

      //jesli dietDinners include updatedPortion => change dietDinner => change dietMeal

      //change dietTotal
      // dinnerEmitter.emit('dinnerPortion:update', dinnerProduct, userId);
    }
  }
);

dinnerEmitter.on(
  'dinnerPortion:update',
  async (updatedDinnerPortionId: string) => {
    //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro

    const dietDinners = await getDietDinners({
      dinnerPortionId: updatedDinnerPortionId,
    });

    if (dietDinners.length < 1) {
      return;
    }

    const dietDinnersQuery = await Promise.all(
      dietDinners.map(async (dietDinner) => {
        const dinnerPortion = await getDinnerPortion({
          _id: dietDinner.dinnerPortionId,
        });

        return {
          ...dietDinner,
          dinnerPortion: dinnerPortion,
        };
      })
    );

    const dietMeals = dietDinners.map((dietDinner) => dietDinner.dietMealId);
    const uniqueDietMeals = [...new Set(dietMeals)];

    const updatedMeals = await Promise.all(
      uniqueDietMeals.map(async (dietMealId) => {
        const dietMeal = await getDietMeal({
          _id: dietMealId,
        });

        const mealDietDinners = dietDinnersQuery.filter(
          (dinnerQuery) => dinnerQuery.dietMealId === dietMealId
        );

        const mealTotal = {
          ...dietMeal,
          total: sumDietDinnersTotal({
            dietDinners: mealDietDinners as any,
            dietDayTotalKcal: 2000,
          }),
        };

        try {
          const updatedMeal = await getAndUpdateDietMeal(
            { _id: dietMealId },
            mealTotal,
            {
              new: true,
            }
          );

          dietEmitter.emit('dietMeal::updated', 200, updatedMeal);
        } catch (e) {
          console.log(e);
        }
      })
    );
  }
);

dinnerEmitter.on('dinnerPortion:delete', async (dinnerPortionId: string) => {
  //if dietDinners includes dinnerPortionId => deleteDietDinner => change mealMacro, dayMacro, dietMacro

  const dietDinners = await getDietDinners({
    dinnerPortionId: dinnerPortionId,
  });

  if (dietDinners.length < 1) {
    return;
  }

  const deleteDietDinners = await Promise.all(
    dietDinners.map(async (dietDinner) => {
      await deleteDietDinner({ _id: dietDinner._id });

      dietEmitter.emit('dietDinner::deleted', 200, dietDinner);

      //po usunięcu akcja dietDinners::deleted(dietDinnerId)
      //brak możliwości edytowania porcji
    })
  );

  //   const dietDinnersMealId = dietDinners.map((dietDinner) =>
  //     dietDinner._id.toString()
  //   );

  //   const uniqueMealsId = [...new Set(dietDinnersMealId)]; //remove duplicates

  //poprawić zliczanie total

  //   const updateDietMealsTotal = await Promise.all(
  //     uniqueMealsId.map(async (mealId) => {
  //       //edit dietDinnerMealIdTotal, dietDinnerDayIdTotal
  //       const dietMeal = await getDietMeal({
  //         _id: mealId,
  //       });
  //       const dietDinners = await getDietDinners({
  //         dietMealId: mealId,
  //       });

  //       const dietDinnersQuery = await Promise.all(
  //         dietDinners.map(async (dietDinner) => {
  //           const dinnerPortion = await getDinnerPortion({
  //             _id: dietDinner.dinnerPortionId,
  //           });

  //           return {
  //             ...dietDinner,
  //             dinnerPortion: dinnerPortion,
  //           };
  //         })
  //       );

  //       const mealTotal = {
  //         ...dietMeal,
  //         total: sumDietDinnersTotal({
  //           dietDinners: dietDinnersQuery as any,
  //           dietDayTotalKcal: 2000,
  //         }),
  //       };
  //     })
  //   );
});
