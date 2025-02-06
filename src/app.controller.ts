import { Controller, Get, Inject } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from './shared/modules/locale/generated/i18n.types';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  @Get()
  async getHello(@I18n() i18n: I18nContext<I18nTranslations>) {
    const key = 'hello-nestjs';
    const cached = await this.cache.get(key);
    if (cached) {
      return { cached: true, message: cached };
    }
    await this.cache.set(key, i18n.t('test.hi'), 10000);
    return { cached: false, message: i18n.t('test.hi') };
  }
}
