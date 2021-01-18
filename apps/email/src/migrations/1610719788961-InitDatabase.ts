import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1610719788961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createDatabase(
      process.env.EMAIL_SERVICE_DB_NAME ?? 'emaildb',
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
