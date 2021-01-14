import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Gasto1610568197481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /*
    id descricao valor previsao vencimento pago createdAt updatedAt
    */
    await queryRunner.createTable(
      new Table({
        name: 'gastos',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'previsao',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'vencimento',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'pago',
            type: 'boolean',
            isNullable: true,
            default: 'false',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
        ],
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gastos');
  }
}
