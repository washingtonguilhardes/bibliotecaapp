import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import AtualizarGasto from './dtos/gastoParaAtualizar.dto';
import NovoGasto from './dtos/novogasto.dto';
import { Gasto } from './gasto.entity';
import { GastosService } from './gastos.service';

@Resolver(() => Gasto)
export class GastosResolver {
  constructor(private gastosServices: GastosService) { }

  @Query(() => [Gasto])
  async gastos() {
    return this.gastosServices.getAll();
  }

  @Mutation(() => Gasto)
  async novoGasto(@Args('gasto') gasto: NovoGasto) {
    try {
      return await this.gastosServices.create(gasto);
    } catch (e) {
      throw e;
    }
  }

  @Mutation(() => Gasto)
  async atualizarGasto(@Args('gasto') gasto: AtualizarGasto) {
    try {
      return await this.gastosServices.update(gasto);
    } catch (e) {
      throw e;
    }
  }
}
