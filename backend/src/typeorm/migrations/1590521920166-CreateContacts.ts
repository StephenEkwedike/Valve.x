import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContacts1590521920166 implements MigrationInterface {
  name = "CreateContacts1590521920166";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contacts" 
      (
        "id" character varying NOT NULL,
        "user" character varying NOT NULL, 
        "wallet" character varying NOT NULL, 
        "name" character varying NOT NULL, 
        "email" character varying NOT NULL,
        "timestamp" character varying NOT NULL, 
        "signature" character varying NOT NULL,
        PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contacts"`, undefined);
  }
}
