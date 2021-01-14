import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailModule } from './email.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ as any,
    options: {
      urls: [
        configService.get(
          'EMAIL_SERVICE_QUEUE_URI',
          'amqp://guest:guest@localhost:5672',
        ),
      ],
      queue: configService.get('EMAIL_SERVICE_QUEUE_NAME', 'emailqueue'),
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(configService.get('EMAIL_SERVICE_PORT', 3001));
  // const emailService = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   EmailModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'cats_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
}
bootstrap();
