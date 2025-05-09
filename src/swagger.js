//  src/swagger.js

const { title } = require('process')
const swaggerJSDoc = require('swagger-jsdoc')

//  Basic metadata for my apis
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Book APIs',
        version: '1.0.0',
        description: 'A simple CRUD API for managing books',
        contact: {
            name: 'Lisa',
            email: 'lisa@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local dev server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter your JWT token as: **Bearer &lt;token&gt;**'
            },
        },
        schemas: {
            // Move user schame definitions here
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format : 'date-time' }
                }
            },
            Token: {
                type: 'object',
                properties: {
                    token: { type: 'string' }
                }
            },
            Book: {
                type: 'object',
                properties: {
                    id:        { type: 'integer' },
                    title:     { type: 'string' },
                    author:    { type: 'string' },
                    userId:    { type: 'integer', description: "ID of the user who created this book" },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
        }
    },
    // Apply Bearer auth globally, but you can remove this if you want only some certain routes protected
    // security: [{ bearerAuth: []}],
}

const options = {
    swaggerDefinition,
    // Files to be processed by swagger-jsdoc:
    // we’ll point it at our route files to pick up any JSDoc comments
    apis: ['src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec