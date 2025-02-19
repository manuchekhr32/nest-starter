import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  private logger = new Logger('Swagger Config');
  private readonly nestApp: INestApplication;
  private config = new DocumentBuilder()
    .setTitle('nestjs-starter')
    .setDescription('API docs')
    .setVersion('1')
    .build();

  constructor(app: INestApplication) {
    this.nestApp = app;
  }

  public enable(bool: boolean) {
    if (!bool) return false;
    const document = SwaggerModule.createDocument(this.nestApp, this.config);
    SwaggerModule.setup('swagger', this.nestApp, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
    this.logger.log('Swagger documentation path: /swagger');
    return true;
  }
}
