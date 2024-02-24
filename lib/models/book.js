'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Book extends Model {

    static get tableName() {

        return 'book';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Tintin').description('Title of the book'),
            description: Joi.string().min(3).example('Les aventures de Tintin').description('Description of the book'),
            releaseDate: Joi.date().description('Release date of the book'),
            author: Joi.string().min(3).example('Superman').description('Author of the book'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};