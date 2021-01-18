import { DynamicModule, Global, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailSenderOptions, MailSenderService } from './mail-sender.service';

interface AsyncOption extends ModuleMetadata {
  useFactory: (...args: any[]) => MailSenderOptions;
  inject?: any[];
}

@Global()
@Module({
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {
  /**
   * From Glob
   * @param glob
   * @param {ConfigOptions} options
   * @returns {DynamicModule}
   */
  static load(options: MailSenderOptions): DynamicModule {
    const mailSenderService = {
      provide: MailSenderService,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<MailSenderService> => {
        return MailSenderService.load(options);
      },
    };
    return {
      module: MailSenderModule,
      providers: [mailSenderService],
      exports: [mailSenderService],
    };
  }
  static forAsync(option: AsyncOption) {
    const mailSenderService = {
      provide: MailSenderService,
      ...option,
      useFactory(...args) {
        return MailSenderService.load(option.useFactory(...args));
      },
    };
    return {
      module: MailSenderModule,
      providers: [mailSenderService],
      exports: [mailSenderService],
    };
  }
}
