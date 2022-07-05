import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const dbUri = process.env.DB_CONNECTION as string;

async function connect() {
  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
