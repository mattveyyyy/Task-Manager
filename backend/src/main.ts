import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увеличиваем лимит для JSON (если ожидаются большие запросы)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('t1 camp form api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Middleware
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS для Vercel
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:8080',
      process.env.VERCEL_URL || '',
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || ''}`
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  });

  // Для Vercel Serverless
  if (process.env.VERCEL) {
    await app.init();
    const server = app.getHttpAdapter().getInstance();
    
    // Добавляем health check для Vercel
    server.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });
    
    return server;
  }

  // Локальная разработка
  await app.listen(process.env.PORT || 4000);
}

// Экспорт для Vercel
const server = bootstrap()
  .then(app => {
    if (process.env.VERCEL) {
      console.log('Running on Vercel Serverless');
      return app;
    }
    console.log(`Running on port ${process.env.PORT || 4000}`);
    return null;
  })
  .catch(err => {
    console.error('Failed to start:', err);
    process.exit(1);
  });

export default server;