'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/favorites/add',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                payload: Joi.object({
                    bookId: Joi.number().integer().required().description('Book ID')
                })
            }
        },
        handler: async (request, h) => {
            const { bookId } = request.payload;
            const { favoriteService } = request.services();

            const userId = request.auth.credentials.userId; // Extraire l'ID de l'utilisateur du jeton JWT

            // Call the service function to add the book to favorites
            const result = await favoriteService.addFavorite(userId, bookId);

            // Handle the result and return the response
            if (result.success) {
                return h.response().code(200).message('Book added to favorites');
            } else {
                return h.response().code(400).message(result.message);
            }
        }
    },

    {
        method: 'get',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const userId = request.auth.credentials.userId; // Extraire l'ID de l'utilisateur du jeton JWT

            return await favoriteService.getFavorites(userId);
        }
    },

    {
        method: 'delete',
        path: '/favorites/{id}',
        options: {
            auth : {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('Book ID')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const userId = request.auth.credentials.userId;
            const bookId = request.params.id;

            return await favoriteService.removeFavorite(userId, bookId);
        }
    }


];

