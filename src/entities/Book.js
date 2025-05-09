// src/entities/Book.js

const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name: 'Book',
    tableName: 'books',

    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        title: {
            type: 'varchar',
            nullable: false
        },
        author: {
            type: 'varchar',
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            createDate: true
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true
        }
    },
    relations: {
        // Add a user relation: each book “belongs to” one user
        user: {
            type: 'many-to-one',
            target: 'User', // the User entity
            joinColumn: { name: 'userId'},
            nullable: false, // every book must have an owner
            onDELETE: 'CASCADE'  // if the user is deleted, their books are too
        }
    }
})