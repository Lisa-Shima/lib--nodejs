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
    }
})