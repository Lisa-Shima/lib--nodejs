// src/data-source.js

// 1. Enable TypeORM metadata support
require('reflect-metadata');

const { DataSource } = require('typeorm');

// 2. Pull in your environment variables
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

// 3. Define the DataSource
const AppDataSource = new DataSource({
  type: 'postgres',           // we’re using PostgreSQL
  host: DB_HOST,              // from .env
  port: parseInt(DB_PORT),    // convert string → number
  username: DB_USER,          // from .env
  password: DB_PASS,          // from .env
  database: DB_NAME,          // from .env
  synchronize: true,          // auto-create tables (dev only)
  logging: true,              // log SQL queries to console
  entities: [
    /* we’ll add our entity schemas here soon */
  ],
});

module.exports = AppDataSource;
