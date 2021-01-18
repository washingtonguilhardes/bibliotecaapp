import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailStatusTable1610720175131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: 'mailschedule',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'from',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'to',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'text',
            isNullable: true,
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
    return await queryRunner.dropTable('mail');
  }

}
