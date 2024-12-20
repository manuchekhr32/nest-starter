import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { EnvVars } from './shared/enum/env';
import { SwaggerConfig } from './shared/config/swagger.config';
import { CorsConfig } from './shared/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  new SwaggerConfig(app).enable(process.env[EnvVars.SWAGGER] == 'true');
  new CorsConfig(app).enable(process.env[EnvVars.CORS] as string);
  await app.listen(parseInt(process.env[EnvVars.PORT] as string));
}
bootstrap();
