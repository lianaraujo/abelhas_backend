import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersAndRoles1607285349347 implements MigrationInterface {
    name = 'CreateUsers1607285349347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "roles" (
            "id"    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name"  VARCHAR(50) NOT NULL
          )
        `);

        await queryRunner.query(`
            INSERT INTO "roles"(name) VALUES ('MEMBER'), ('USER')
        `);
        
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id"          INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email"       VARCHAR(320) UNIQUE NOT NULL, 
                "password"    VARCHAR NOT NULL,
                "role_id"     INTEGER NOT NULL,
                FOREIGN KEY("role_id") REFERENCES roles("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }
}
