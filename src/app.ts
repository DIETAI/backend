import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import connect from './api/v1/utils/dbConnect';
import logger from './api/v1/utils/logger';
import routes from './api/v1/routes/routes';
import deserializeUser from './api/v1/middleware/deserializeUser';

import {
  restResponseTimeHistogram,
  startMetricsServer,
} from './api/v1/utils/metrics';

import { createStripePaymentWebhook } from './api/v1/controllers/transaction/transaction.webhook';

const port = process.env.PORT || 1337;
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://diet-ai-vaq5g.ondigitalocean.app',
      'https://dashboard.dietai.mederak.com',
      'https://dashboard.dietai.pl',
      'https://recommend-server.dietai.pl',
    ],
    // origin: process.env.ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());

// app.use(express.raw({ type: '*/*' }));
// app.use(express.json())
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
); //correct

app.use(deserializeUser);

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

const environment = process.env.NODE_ENV;

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  console.log({ processENV: environment });
  await connect();

  routes(app);

  startMetricsServer();
});
