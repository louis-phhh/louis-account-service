import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { constants } from '@louis-phhh/louis-shared';

const { NATS_QUEUE_NAME } = constants;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER],
        queue: NATS_QUEUE_NAME.ACCOUNT_SERVICE,
        user: process.env.NATS_USER,
        pass: process.env.NATS_PASS,
      },
    },
  );
  await app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
