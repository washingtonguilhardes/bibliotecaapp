import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GastoParaAtualizar from './dtos/gastoParaAtualizar.dto';
import NovoGasto from './dtos/novogasto.dto';
import { Gasto } from './gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private gastosRepository: Repository<Gasto>,

    @Inject('EMAIL_SERVICE')
    private client: ClientProxy,
  ) { }

  async getAll() {
    return this.gastosRepository.find();
  }

  async create(novoGasto: NovoGasto) {
    debugger;
    const gasto = new Gasto();
    gasto.createdAt = new Date();
    gasto.updatedAt = new Date();
    gasto.descricao = novoGasto.descricao;
    gasto.pago = novoGasto.pago || false;
    gasto.previsao = novoGasto.previsao;
    gasto.valor = novoGasto.valor;
    gasto.vencimento = novoGasto.vencimento;

    this.client.emit({ cmd: 'novo_gasto' }, JSON.stringify(gasto));

    return this.gastosRepository.save(gasto);
  }
  async update(gastoParaAtualizar: GastoParaAtualizar) {
    if (!gastoParaAtualizar.id) {
      throw new Error('Não é possível atualizar um gasto sem id');
    }
    const count = await this.gastosRepository.count({
      where: { id: gastoParaAtualizar.id },
    });
    if (count < 1) {
      throw new Error('O gasto informado não está cadastrado na base');
    }
    try {
      await this.client
        .emit('gasto_atualizado', gastoParaAtualizar)
        .toPromise();
      await this.gastosRepository.update(
        { id: gastoParaAtualizar.id },
        { ...gastoParaAtualizar, updatedAt: new Date() },
      );

      return await this.gastosRepository.findOne(gastoParaAtualizar.id);
    } catch (e) {
      console.error(e);
      throw new Error('Não foi possível atualizar o gasto');
    }
  }
}
