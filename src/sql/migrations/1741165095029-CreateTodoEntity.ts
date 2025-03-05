import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodoEntity1741165095029 implements MigrationInterface {
    name = 'CreateTodoEntity1741165095029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(3), "title" character varying NOT NULL, "description" character varying, "deadline" TIMESTAMP(3), "completed" boolean NOT NULL DEFAULT false, "userUuid" uuid, CONSTRAINT "PK_17b57427465caa8ca57e2741db2" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
