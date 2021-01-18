import { MailSenderService } from '@mailsender/mail-sender';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { MailResolver } from './mail.resolver';
import { MailService } from './mail.service';

@Module({
  providers: [MailResolver, MailService, MailSenderService],
  imports: [MailSenderService, TypeOrmModule.forFeature([Mail])],
  exports: [TypeOrmModule],
})
export class MailModule { }
