import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class GastoParaAtualizar {
  @Field()
  id: number;
  @Field({ nullable: true })
  descricao?: string;

  @Field({ nullable: true })
  valor?: number;

  @Field({ nullable: true })
  previsao?: Date;

  @Field({ nullable: true })
  vencimento?: Date;

  @Field({ nullable: true })
  pago?: boolean;
}