import { MigrationInterface, QueryRunner } from 'typeorm';
import ormconfig from '../ormconfig';

export class CreateDatabase1610558067788 implements MigrationInterface {
  name = 'CreateDatabase1610558067788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SCHEMA IF NOT EXISTS  ${ormconfig.database}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('not down for create database');
  }
}
