import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('EMAIL_SERVICE_DB_HOST'),
        port: configService.get('EMAIL_SERVICE_DB_PORT'),
        name: configService.get('EMAIL_SERVICE_DB_NAME'),
        username: configService.get('EMAIL_SERVICE_DB_USERNAME'),
        password: configService.get('EMAIL_SERVICE_DB_PASSWORD'),
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }
