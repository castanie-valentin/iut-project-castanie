'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {

            table.increments('id').primary();
            table.integer('userId').unsigned().notNullable().references('id').inTable('user');
            table.integer('bookId').unsigned().notNullable().references('id').inTable('book');
            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }

};
