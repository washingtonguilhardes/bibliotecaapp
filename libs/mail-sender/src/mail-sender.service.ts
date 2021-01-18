import {
  Global,
  Injectable,
  Logger,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { gmail_v1, google } from 'googleapis';
import { MailSenderModule } from './mail-sender.module';

export interface MailSenderOptions {
  credentialsFile?: string;
  tokenFile?: string;
}

export interface MailSenderOptionsAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<MailSenderOptions> | MailSenderOptions;
  inject?: any[];
}

@Injectable()
export class MailSenderService {
  private static logger = new Logger('MailSenderService');

  private static gservices: gmail_v1.Gmail;
  private static oAuth2Client;
  private static settings: any;

  getSettings() {
    return MailSenderService.settings;
    // const { crendetials, auth } = MailSenderService.settings;
    // const { client_id, client_secret, redirect_uris } = crendetials;

    // MailSenderService.oAuth2Client = new google.auth.OAuth2(
    //   client_id,
    //   client_secret,
    //   redirect_uris[0],
    // );
    // MailSenderService.oAuth2Client.setCredentials(auth);
    // return MailSenderService.gservices;
  }

  static load(
    options: MailSenderOptions,
  ): MailSenderService | Promise<MailSenderService> {
    this.logger.log('Try create google apis loggin');
    if (!options.credentialsFile) {
      throw new Error('credentialsFile settings not found in options');
    }
    if (!options.tokenFile) {
      throw new Error(
        'tokenFile settings not found in options. If you need to generate one, check https://developers.google.com/gmail/api/quickstart/nodejs',
      );
    }
    const { installed } = JSON.parse(
      readFileSync(options.credentialsFile).toString() as string,
    );
    if (!installed) {
      throw new Error(
        `Installed instance not found in ${options.credentialsFile}`,
      );
    }

    const { client_id, client_secret, redirect_uris } = installed;

    const token = JSON.parse(
      readFileSync(options.tokenFile).toString() as string,
    );
    MailSenderService.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
    MailSenderService.oAuth2Client.setCredentials(token);
    MailSenderService.gservices = google.gmail({
      version: 'v1',
      auth: MailSenderService.oAuth2Client,
    });
    MailSenderService.settings = { crendentials: installed, token };

    return new MailSenderService();
  }
}
