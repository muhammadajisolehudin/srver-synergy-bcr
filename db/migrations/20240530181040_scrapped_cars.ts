import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('scrapped_cars', (table: Knex.TableBuilder)=>{
        table.string('id', 255).notNullable();
        table.string('plat_no', 10).unique().notNullable();
        table.string('delete_by').notNullable();
        table.foreign('delete_by').references('users.id');
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
}

