import {Sequelize, INTEGER} from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();


export const database = new Sequelize(
  {
    dialect: 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    storage: ':memory:',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false
  }
);