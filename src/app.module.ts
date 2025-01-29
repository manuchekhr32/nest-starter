import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVars } from './shared/enum/env.enum';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { configValidationSchema } from './shared/validation/schema/config-validation-schema';
import { DrizzleModule } from './shared/modules/drizzle/drizzle.module';
import { UsersModule } from './modules/users/users.module';
import { LocaleModule } from './shared/modules/locale/locale.module';
import { AppController } from './app.controller';

@Module({
  // TODO: Remove AppController
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
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
    LocaleModule,
    DrizzleModule,
    // Modules
    UsersModule,
  ],
})
export class AppModule {}
