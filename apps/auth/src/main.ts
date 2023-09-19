import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {ValidationPipe} from "@nestjs/common";
import {Logger} from "nestjs-pino";
import {ConfigService} from "@nestjs/config";

interface AppConfig {
  PORT: number
}

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useLogger(app.get(Logger))
  const configService = app.get<ConfigService<AppConfig>>(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
