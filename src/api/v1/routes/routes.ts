import { Express, Request, Response } from 'express';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
// import roleRoutes from './role.routes';
import measurementRoutes from './measurement.routes';
import dietEstablishmentRoutes from './dietEstablishment.routes';
import dietRoutes from './diet.routes';
import dietDaysRoutes from './dietDays.routes';
import dietMealsRoutes from './dietMeals.routes';
import dietDinnersRoutes from './dietDinners.routes';
import dinnerRoutes from './dinner.routes';
import productRoutes from './product.routes';
import assetRoutes from './asset.routes';
import subscriptionPlanRoutes from './subscriptionPlans.routes';
import transactionRoutes from './transaction.routes';

const routes = (app: Express) => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/sessions', sessionRoutes);
  // app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/measurements', measurementRoutes);
  app.use('/api/v1/dietEstablishments', dietEstablishmentRoutes);
  app.use('/api/v1/diets', dietRoutes);
  app.use('/api/v1/dietDays', dietDaysRoutes);
  app.use('/api/v1/dietMeals', dietMealsRoutes);
  app.use('/api/v1/dietDinners', dietDinnersRoutes);
  app.use('/api/v1/dinners', dinnerRoutes);
  app.use('/api/v1/assets', assetRoutes);
  app.use('/api/v1/subscriptionPlans', subscriptionPlanRoutes);
  app.use('/api/v1/transactions', transactionRoutes);
};

export default routes;
