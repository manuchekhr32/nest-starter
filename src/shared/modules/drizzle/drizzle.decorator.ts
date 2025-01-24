import { Inject } from '@nestjs/common';
import { ServiceToken } from 'src/shared/enum/service-token.enum';

export function InjectDrizzle(): ParameterDecorator {
  return Inject(ServiceToken.DRIZZLE_PROVIDER);
}
