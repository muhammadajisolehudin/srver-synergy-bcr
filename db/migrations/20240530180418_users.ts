import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder)=>{
        table.string('id', 255).primary().notNullable();
        table.string('name', 100).notNullable();
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('no_hp', 16);
        table.string('role', 20).notNullable();
        table.timestamps(true, true); 
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

