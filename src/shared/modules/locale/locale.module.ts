import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  I18nModule,
  I18nOptionsWithoutResolvers,
} from 'nestjs-i18n';
import * as path from 'path';
import { LocaleKey } from './locale.types';
import { EnvVars } from 'src/shared/enum/env.enum';

@Global()
@Module({
  imports: [
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.getOrThrow(EnvVars.NODE_ENV) === 'development';
        const setup: I18nOptionsWithoutResolvers = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          fallbackLanguage: LocaleKey.EN,
          loaderOptions: {
            includeSubfolders: true,
            path: path.join(__dirname, '/locales/'),
            watch: isDev,
          },
          logging: isDev,
          throwOnMissingKey: isDev,
        };
        if (isDev) {
          Object.assign(setup, {
            typesOutputPath: path.join(
              process.cwd(),
              '/src/shared/modules/locale/generated/i18n.types.ts',
            ),
          });
        }
        return setup;
      },
      resolvers: [AcceptLanguageResolver],
    }),
  ],
})
export class LocaleModule {}
