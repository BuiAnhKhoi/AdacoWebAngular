import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddConstraintToCart1716795752470 implements MigrationInterface {
    public async up(queryRunner: QueryRunner):Promise<void>{
        await queryRunner.query(`
            ALTER TABLE cart ADD CONSTRAINT check_price_non_negative CHECK (price::int >= 0)
        `);

        await queryRunner.query(`
            ALTER TABLE cart ADD CONSTRAINT check_quantity_non_negative CHECK (quantity >= 0)
        `)
    }
    
    public async down(queryRunner: QueryRunner):Promise<void>{
        await queryRunner.query(`
            ALTER TABLE cart DROP CONSTRAINT check_price_non_negative
        `);

        await queryRunner.query(`
            ALTER TABLE cart DROP CONSTRAINT check_quantity_non_negative
        `)
    }
}