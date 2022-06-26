import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import config from 'config';
import cors from 'cors';
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

const port = config.get<number>('port');
const app = express();

app.use(
  cors({
    origin: config.get('origin'),
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

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

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);

  startMetricsServer();
});