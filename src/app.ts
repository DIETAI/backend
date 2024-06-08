import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
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
import { corsOptions } from './api/v1/utils/corsOptions';

const port = process.env.PORT || 1337;
const app = express();

app.use(
  cors({
    origin: corsOptions.origin,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

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
