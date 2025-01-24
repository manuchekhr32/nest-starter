import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvVars } from './shared/enum/env.enum';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { DrizzleModule } from './shared/modules/drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
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
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      inject: [ConfigService],
      // eslint-disable-next-line
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.getOrThrow(EnvVars.REDIS_HOST),
            port: +configService.getOrThrow(EnvVars.REDIS_PORT),
          },
          password: configService.getOrThrow(EnvVars.REDIS_PASSWORD),
          database: parseInt(configService.getOrThrow(EnvVars.REDIS_DB)),
        }),
      }),
    }),
    // Shared modules
    DrizzleModule,
  ],
})
export class AppModule {}
