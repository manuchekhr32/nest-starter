import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from './shared/modules/locale/generated/i18n.types';

@Controller()
export class AppController {
  @Get()
  getHello(@I18n() i18n: I18nContext<I18nTranslations>) {
    return i18n.t('test.hi');
  }
}
