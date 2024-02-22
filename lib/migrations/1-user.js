'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.string('email').notNullable();
            table.string('username').notNullable();
            table.string('password').notNullable();
        });
    },

    async down(knex) {
        await knex.schema.alterTable('user', (table) => {
            table.dropColumn('email'); // Supprimer la colonne email
            table.dropColumn('username'); // Supprimer la colonne username
            table.dropColumn('password'); // Supprimer la colonne password
        });
    }
};
