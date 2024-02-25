'use strict';
const {Service} = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const MailSender = require('./mailSender');

module.exports = class FavoriteService extends Service {

    async addFavorite(userId, bookId) {
        const {Favorite} = this.server.models();

        try {
            // Check if the book is already in the user's favorites

            const isFavorite = await Favorite.query()
                .where('userId', userId)
                .where('bookId', bookId)
                .skipUndefined()
                .first();


            if (isFavorite) {
                return { success: false, message: 'Book is already in favorites' };
            }

            // Add the book to the user's favorites
            await Favorite.query().insert({
                userId: userId,
                bookId: bookId
            });

            return { success: true };
        } catch (error) {
            console.error('Error adding book to favorites:', error);
            return { success: false, message: 'An error occurred while adding book to favorites' };
        }
    }

    async getFavorites(userId) {
        const { Favorite } = this.server.models();

        try {
            const favorites = await Favorite.query()
                .where('userId', userId)
                .joinRelated('book')
                .select('book.id','book.title', 'book.author');

            return favorites;
        } catch (error) {
            console.error('Error getting user favorites:', error);
            throw error;
        }
    }

    async removeFavorite(userId, bookId) {
        const { Favorite } = this.server.models();

        try {
            const favorite = await Favorite.query().findOne({ userId: userId, bookId: bookId });

            if (!favorite) {
                return {success: false, message: 'Favorite not found'};
            }

            await favorite.$query().delete();

            return {success: true};
        } catch (error) {
            console.error('Error removing book from favorites:', error);
            return {success: false, message: 'An error occurred while removing book from favorites'};
        }
    }


};