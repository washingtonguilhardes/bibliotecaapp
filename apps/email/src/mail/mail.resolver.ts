import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateMailInput } from './dto/create-mail.input';
import { Mail } from './entities/mail.entity';
import { MailService } from './mail.service';

@Resolver(() => Mail)
export class MailResolver {
  constructor(private readonly mailService: MailService) { }

  @Mutation(() => Mail)
  createMail(@Args('createMailInput') createMailInput: CreateMailInput) {
    return this.mailService.composeMail();
  }

  @Query(() => [Mail])
  async getMail() {
    return await this.mailService.composeMail();
  }
}
