import { Express, Request, Response } from 'express';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
// import roleRoutes from './role.routes';
import measurementRoutes from './measurement.routes';
import dietEstablishmentRoutes from './dietEstablishment.routes';
import dietKindRoutes from './dietKind.routes';
import dietRoutes from './diet.routes';
import dietDaysRoutes from './dietDays.routes';
import dietMealsRoutes from './dietMeals.routes';
import dietDinnersRoutes from './dietDinners.routes';
import dinnerRoutes from './dinner/dinner.routes';
import dinnerProductRoutes from './dinner/dinnerProduct.routes';
import dinnerPortionRoutes from './dinner/dinnerPortion.routes';
import productAllRoutes from './productAll.routes';
import productRoutes from './product.routes';
import assetRoutes from './asset.routes';
import subscriptionPlanRoutes from './subscriptionPlans.routes';
import transactionRoutes from './transaction.routes';
import clientRoutes from './client.routes';

const routes = (app: Express) => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/sessions', sessionRoutes);
  // app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/all-products', productAllRoutes);
  app.use('/api/v1/measurements', measurementRoutes);
  app.use('/api/v1/dietEstablishments', dietEstablishmentRoutes);
  app.use('/api/v1/dietKinds', dietKindRoutes);
  app.use('/api/v1/diets', dietRoutes);
  app.use('/api/v1/dietDays', dietDaysRoutes);
  app.use('/api/v1/dietMeals', dietMealsRoutes);
  app.use('/api/v1/dietDinners', dietDinnersRoutes);
  app.use('/api/v1/dinners', dinnerRoutes);
  app.use('/api/v1/dinnerProducts', dinnerProductRoutes);
  app.use('/api/v1/dinnerPortions', dinnerPortionRoutes);
  app.use('/api/v1/assets', assetRoutes);
  app.use('/api/v1/subscriptionPlans', subscriptionPlanRoutes);
  app.use('/api/v1/transactions', transactionRoutes);
  app.use('/api/v1/clients', clientRoutes);
};

export default routes;
