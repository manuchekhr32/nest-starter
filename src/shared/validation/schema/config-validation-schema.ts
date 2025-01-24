import * as Joi from 'joi';
import { EnvVars } from 'src/shared/enum/env.enum';

export const configValidationSchema = Joi.object({
  [EnvVars.PORT]: Joi.number(),
  [EnvVars.SWAGGER]: Joi.bool(),
  [EnvVars.CORS]: Joi.string(),
  // Postgres
  [EnvVars.DB_USER]: Joi.string().required(),
  [EnvVars.DB_PASSWORD]: Joi.string().required(),
  [EnvVars.DB_NAME]: Joi.string().required(),
  [EnvVars.DB_PORT]: Joi.number().required(),
  [EnvVars.DB_HOST]: Joi.string().required(),
  // Redis
  [EnvVars.REDIS_PASSWORD]: Joi.string(),
  [EnvVars.REDIS_HOST]: Joi.string(),
  [EnvVars.REDIS_PORT]: Joi.number(),
  [EnvVars.REDIS_DB]: Joi.number(),
  // Core
  [EnvVars.NODE_ENV]: Joi.string()
    .valid('development', 'production', 'test')
    .default('development')
    .required(),
});
