import {MigrationInterface, QueryRunner} from "typeorm";

export class generatedClienteEndereco1620164358167 implements MigrationInterface {
    name = 'generatedClienteEndereco1620164358167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "table_endereco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "endereco" varchar NOT NULL, "numero" integer NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" varchar NOT NULL, "latitude" decimal(9,2) NOT NULL, "longitude" decimal(9,2) NOT NULL, "id_fk_cliente" varchar)`);
        await queryRunner.query(`CREATE TABLE "table_cliente" ("cnpj" varchar PRIMARY KEY NOT NULL, "razao-social" varchar NOT NULL, "contato" varchar NOT NULL, "telefone" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_table_endereco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "endereco" varchar NOT NULL, "numero" integer NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" varchar NOT NULL, "latitude" decimal(9,2) NOT NULL, "longitude" decimal(9,2) NOT NULL, "id_fk_cliente" varchar, CONSTRAINT "FK_372a4ceae1ee35f66488c944bb4" FOREIGN KEY ("id_fk_cliente") REFERENCES "table_cliente" ("cnpj") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_table_endereco"("id", "endereco", "numero", "complemento", "bairro", "cidade", "estado", "cep", "latitude", "longitude", "id_fk_cliente") SELECT "id", "endereco", "numero", "complemento", "bairro", "cidade", "estado", "cep", "latitude", "longitude", "id_fk_cliente" FROM "table_endereco"`);
        await queryRunner.query(`DROP TABLE "table_endereco"`);
        await queryRunner.query(`ALTER TABLE "temporary_table_endereco" RENAME TO "table_endereco"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table_endereco" RENAME TO "temporary_table_endereco"`);
        await queryRunner.query(`CREATE TABLE "table_endereco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "endereco" varchar NOT NULL, "numero" integer NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" varchar NOT NULL, "latitude" decimal(9,2) NOT NULL, "longitude" decimal(9,2) NOT NULL, "id_fk_cliente" varchar)`);
        await queryRunner.query(`INSERT INTO "table_endereco"("id", "endereco", "numero", "complemento", "bairro", "cidade", "estado", "cep", "latitude", "longitude", "id_fk_cliente") SELECT "id", "endereco", "numero", "complemento", "bairro", "cidade", "estado", "cep", "latitude", "longitude", "id_fk_cliente" FROM "temporary_table_endereco"`);
        await queryRunner.query(`DROP TABLE "temporary_table_endereco"`);
        await queryRunner.query(`DROP TABLE "table_cliente"`);
        await queryRunner.query(`DROP TABLE "table_endereco"`);
    }

}
