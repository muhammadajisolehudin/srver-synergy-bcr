import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.string('id', 255).primary().notNullable();
        table.string('plate', 10).unique().notNullable();
        table.string('manufacture', 100).notNullable();
        table.string('model', 100).notNullable();
        table.string('img', 255);
        table.integer('price').notNullable();
        table.integer('capacity').notNullable();
        table.enu('transmission', ['manual', 'automatic', 'cvt', 'dct', 'wet_clutch'], { useNative: true, enumName: 'transmission_enum' }).notNullable();
        table.integer('year').notNullable();
        table.string('type', 100);
        table.enu('driver_type', ['lepas kunci', 'dengan supir'], { useNative: true, enumName: 'driver_type_enum' }).notNullable();
        table.boolean('available').notNullable().defaultTo(true);
        table.time('available_at');
        table.string('description', 255);

        table.string('create_by').unsigned().notNullable();
        table.foreign('create_by').references('users.id');

        table.string('update_by').unsigned().notNullable();
        table.foreign('update_by').references('users.id');

        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}

