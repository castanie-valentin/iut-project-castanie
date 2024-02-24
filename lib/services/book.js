'use strict';
const {Service} = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const MailSender = require('./mailSender');

module.exports = class BookService extends Service {

    async create(book) {

        const {Book, User} = this.server.models();

        const {title, description, releaseDate, author} = book;

        try {
            const newBook = await Book.query().insertAndFetch({
                title,
                description,
                releaseDate,
                author
            });

            const users = await User.query().select('email');

            const mailSender = new MailSender();

            for (const user of users) {
                await mailSender.sendNewBookEmail(user.email, book.title);
            }

            return newBook;
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }

    get() {

        const {Book} = this.server.models();

        return Book.query().select()
    }

    async delete(id, h) {
        const {Book} = this.server.models();

        try {
            await Book.query().findById(id).throwIfNotFound();

            const deleteBook = await Book.query().deleteById(id);

            return ' ';

        } catch (error) {

            return h.response().code(404);
        }
    }

    async update(id, bookData) {
        const {Book} = this.server.models();

        try {
            await Book.query().findById(id).throwIfNotFound();

            const updatedBook = await Book.query().patchAndFetchById(id, bookData);

            return updatedBook;
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    }
};
