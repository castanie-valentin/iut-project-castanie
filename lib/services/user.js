'use strict';
const encrypt = require('@castanie-valentin/iut-encrypt');
const {Service} = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    async create(user) {

        const {User} = this.server.models();

        const {firstName, lastName, email, username, password} = user;

        const encryptedPassword = await encrypt.sha1(password);

        try {
            const newUser = await User.query().insertAndFetch({
                firstName,
                lastName,
                email,
                username,
                password: encryptedPassword
            });

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    get() {

        const {User} = this.server.models();

        return User.query().select()
    }

    async delete(id, h) {
        const {User} = this.server.models();

        try {
            await User.query().findById(id).throwIfNotFound();

            const deleteUser = await User.query().deleteById(id);

            return ' ';

        } catch (error) {

            return h.response().code(404);
        }
    }

    async update(id, userData) {
        const {User} = this.server.models();

        try {
            await User.query().findById(id).throwIfNotFound();

            if (userData.password) {
                userData.password = await encrypt.sha1(userData.password);
            }

            const updatedUser = await User.query().patchAndFetchById(id, userData);

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }


    async authenticate(email, password) {
        const {User} = this.server.models();

        try {
            const user = await User.query().findOne({email});

            if (user && encrypt.compareSha1(password, user.password)) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    async login(data, h) {

        const { User } = this.server.models();

        const {email, password} = data;

        const isAuthenticated = await this.authenticate(email, password);

        if (isAuthenticated) {
            const user = await User.query().findOne({ email });

            return {
                jwt: Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        scope: user.role
                    },
                    {
                        key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                )
            };
        } else {
            return h.response().code(401);
        }
    }
};
