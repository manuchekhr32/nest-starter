import * as Joi from 'joi';
import { EnvVars } from 'src/shared/enum/env.enum';

export const configValidationSchema = Joi.object({
  [EnvVars.PORT]: Joi.number(),
  [EnvVars.SWAGGER]: Joi.bool(),
  [EnvVars.CORS]: Joi.string(),
  // Redis
  [EnvVars.REDIS_PASSWORD]: Joi.string(),
  [EnvVars.REDIS_HOST]: Joi.string(),
  [EnvVars.REDIS_PORT]: Joi.number(),
  [EnvVars.REDIS_DB]: Joi.number(),
  [EnvVars.NODE_ENV]: Joi.string()
    .required()
    .valid('development', 'production')
    .required(),
});
