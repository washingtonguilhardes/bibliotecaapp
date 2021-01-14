import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('gastos')
export class Gasto {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  descricao: string;

  @Column()
  @Field()
  valor: number;

  @Column()
  @Field()
  previsao: Date;

  @Column()
  @Field()
  vencimento?: Date;

  @Column()
  @Field({ nullable: true })
  pago?: boolean;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;

}
