import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceToken } from 'src/shared/enum/service-token.enum';
import { drizzle } from 'drizzle-orm/node-postgres';
import { EnvVars } from 'src/shared/enum/env.enum';
import { DrizzlePg, drizzleSchemas } from './types';
import { sql } from 'drizzle-orm';
import { InjectDrizzle } from './drizzle.decorator';

@Global()
@Module({
  exports: [ServiceToken.DRIZZLE_PROVIDER],
  providers: [
    {
      inject: [ConfigService],
      provide: ServiceToken.DRIZZLE_PROVIDER,
      useFactory: (configService: ConfigService) => {
        return drizzle({
          connection: {
            user: configService.getOrThrow(EnvVars.DB_USER),
            password: configService.getOrThrow(EnvVars.DB_PASSWORD),
            database: configService.getOrThrow(EnvVars.DB_NAME),
            host: configService.getOrThrow(EnvVars.DB_HOST),
            port: +configService.getOrThrow(EnvVars.DB_PORT),
          },
          schema: drizzleSchemas,
          casing: 'snake_case',
          logger: configService.get(EnvVars.NODE_ENV) === 'development',
        });
      },
    },
  ],
})
export class DrizzleModule implements OnModuleInit {
  constructor(@InjectDrizzle() private readonly db: DrizzlePg) {}

  async onModuleInit() {
    await this.db.execute(sql<number>`select 1 as ping`);
  }
}
