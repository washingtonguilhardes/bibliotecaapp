import { MailSenderService } from '@mailsender/mail-sender';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Repository } from 'typeorm';
import { Mail } from './entities/mail.entity';


@Injectable()
export class MailService {
  constructor(
    private sender: MailSenderService,
    @InjectRepository(Mail)
    private mailStatusRepo: Repository<Mail>,
  ) {
    console.log(sender);
  }
  async composeMail() {
    const { crendentials, token } = await this.sender.getSettings();
    const { client_id, client_secret, redirect_uris } = crendentials;

    const client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
    client.setCredentials(token);

    console.log([crendentials, token, client]);

    const gmail = google.gmail({ version: 'v1', auth: client });
    console.log({ gmail });

    const subject = '🤘 Bb te amo ❤️❤️❤️❤️';
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      'base64',
    )}?=`;
    const messageParts = [
      'From: Treinamento Gmail API <junior201110@gmail.com>',
      'To: Leid <leid.fidelis2015@gmail.com>',
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      'This is a message just to say hello.',
      'So... <b>Lindaaa</b>  🤘❤️😎',
    ];
    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log(res.data);

    const mail = new Mail();
    mail.createdAt = mail.updatedAt = new Date();
    mail.from = 'junior201110@gmail.com';
    mail.status = 'sent';
    mail.to = 'leid.fidelis2015@gmail.com';

    await this.mailStatusRepo.save(mail);

    return [mail];
  }
}
