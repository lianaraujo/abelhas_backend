import dotenv from 'dotenv';
import path from 'path';

const envFile = path.resolve(__dirname, '.env');

const result = dotenv.config({ path: envFile });
if (result.error) {
  throw result.error;
}

