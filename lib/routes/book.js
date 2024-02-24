'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/book',
        options: {
            tags: ['api'],
            auth : {
                scope: [ 'admin' ]
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Tintin').description('Title of the book'),
                    description: Joi.string().required().min(3).example('Les aventures de Tintin').description('Description of the book'),
                    releaseDate: Joi.date().required().description('Release date of the book'),
                    author: Joi.string().required().min(3).example('Superman').description('Author of the book'),
                })
            }
        },
        handler: async (request, h) => {

            const { bookService } = request.services();

            return await bookService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/book',
        options: {
            auth : {
                scope: [ 'user' , 'admin' ]
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const { bookService } = request.services();

            return await bookService.get();
        }
    },

    {
        method: 'delete',
        path: '/book/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('User ID')
                })
            }
        },
        handler: async (request, h) => {

            const { bookService } = request.services();
            const bookId = request.params.id;

            return await bookService.delete(bookId, h);
        }
    },
    {
        method: 'patch',
        path: '/book/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('User ID')
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Tintin').description('Title of the book'),
                    description: Joi.string().required().min(3).example('Les aventures de Tintin').description('Description of the book'),
                    releaseDate: Joi.date().required().description('Release date of the book'),
                    author: Joi.string().required().min(3).example('Superman').description('Author of the book'),
                })
            }
        },
        handler: async (request, h) => {
            const { bookService } = request.services();
            const bookId = request.params.id;

            return await bookService.update(bookId, request.payload);
        }
    }

];

