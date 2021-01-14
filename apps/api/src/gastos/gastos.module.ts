import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './gasto.entity';
import { GastosResolver } from './gastos.resolver';
import { GastosService } from './gastos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto]), ConfigModule],
  providers: [
    GastosService,
    GastosResolver,
    {
      provide: 'EMAIL_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('EMAIL_SERVICE_QUEUE_URI')],
            queue: configService.get('EMAIL_SERVICE_QUEUE_NAME'),
          },
        });
      },
    },
  ],
  exports: [TypeOrmModule],
})
export class GastosModule { }
