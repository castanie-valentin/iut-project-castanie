'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    email: Joi.string().email().required().example('jd@gmail.com').description('Email of the user'),
                    username: Joi.string().required().min(3).example('jdg').description('Username of the user'),
                    password: Joi.string().required().min(8).example('Password123!').description('Password of the user'),
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api'],
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.get();
        }
    },

    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('User ID')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            const userId = request.params.id;

            return await userService.delete(userId, h);
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('User ID')
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Updated firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Updated lastname of the user'),
                    email: Joi.string().email().example('jd@gmail.com').description('Updated email of the user'),
                    username: Joi.string().min(3).example('jdg').description('Updated username of the user'),
                    password: Joi.string().min(8).example('Password123!').description('Updated password of the user'),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const userId = request.params.id;

            return await userService.update(userId, request.payload);
        }
    },

    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required().example('jd@gmail.com').description('Email of the user'),
                    password: Joi.string().required().min(8).example('Password123!').description('Password of the user'),
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return userService.login(request.payload, h);
        }
    }


];

