import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(new LoggerMiddleware().use);

  const port = process.env.PORT ?? 3000;
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `App is running on port ${port} at url: [http://localhost:${port}/api/v1]`,
    );
  });
}
bootstrap();
