'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Book = require('./Book');

module.exports = class Favorite extends Model {

    static get tableName() {
        return 'favorite';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().required().description('User ID'),
            bookId: Joi.number().integer().required().description('Book ID'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get relationMappings() {
        return {
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: 'favorite.bookId',
                    to: 'book.id'
                }
            }
        };
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};
