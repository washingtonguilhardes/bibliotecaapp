import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class NovoGasto {
  @Field()
  descricao: string;

  @Field()
  valor: number;

  @Field()
  previsao: Date;

  @Field()
  vencimento?: Date;

  @Field({ nullable: true })
  pago?: boolean;
}
