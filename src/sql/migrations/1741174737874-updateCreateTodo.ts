import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCreateTodo1741174737874 implements MigrationInterface {
    name = 'UpdateCreateTodo1741174737874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299"`);
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "userUuid" TO "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "user_uuid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_0f06ae6e6255d6381c8eaa248aa" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_0f06ae6e6255d6381c8eaa248aa"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "user_uuid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "user_uuid" TO "userUuid"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
