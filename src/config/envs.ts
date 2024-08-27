import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONTO_DB: env.get("MONGO_DB").required().asString()
};