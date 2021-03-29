import dotenv from 'dotenv';
import path from 'path';

try {
  const envFile = path.resolve(__dirname, '.env');

  const result = dotenv.config({ path: envFile });
  if (result.error) {
    throw result.error;
  }
} catch (error) {
  console.log('.env not found')
}

