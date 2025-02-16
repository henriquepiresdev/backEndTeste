import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1718569200000 implements MigrationInterface {
  name = 'CreateUsersTable1718569200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          wage INTEGER NOT NULL,
          enterprise INTEGER NOT NULL,
          "isSelected" BOOLEAN DEFAULT false,
          "createdAt" TIMESTAMP DEFAULT now(),
          "updatedAt" TIMESTAMP DEFAULT now()
        );
  
        CREATE INDEX IDX_USER_ENTERPRISE ON users(enterprise);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IDX_USER_ENTERPRISE`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
