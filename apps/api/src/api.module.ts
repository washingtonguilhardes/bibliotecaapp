import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { join } from 'path';
import { GastosModule } from './gastos/gastos.module';
import { Gasto } from './gastos/gasto.entity';
import ormconfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'gql/schema.gql'),
    }),
    GastosModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }
