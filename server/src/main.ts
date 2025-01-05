import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with specific origin
  app.enableCors({
    origin: '*'
  });

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('FitGPT API')
    .setDescription('The FitGPT API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
