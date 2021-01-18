import { MailSenderModule } from '@mailsender/mail-sender';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { join, resolve } from 'path';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    // ConfigModule.load(join(__dirname, '.config', '**/!(*.d).{ts,js}')),
    ConfigModule.load(resolve(__dirname, 'config/**/!(*.d).{ts,js}')),
    MailSenderModule.forAsync({
      useFactory: (config: ConfigService) => {
        return config.get('google');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'gql/schema.gql'),
    }),
    MailModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }
