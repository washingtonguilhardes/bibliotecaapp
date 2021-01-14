import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Get()
  getHello(): string {
    return this.emailService.getHello();
  }
  @MessagePattern('gasto_atualizado')
  accumulate(data: any): any {
    console.log('recipes', data);
    throw new Error('invalid');
    return 'ok';
  }
}
