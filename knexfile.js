//require('ts-node/register');
var migrations = __dirname+'/src/migrations/'
var seeds = __dirname+'/src/seeds/'

require('dotenv').config()


module.exports = {

  development: {
    client: process.env.DEV_DB_CLIENT||'postgresql',
    connection: {
      host: process.env.DEV_DB_HOST||'127.0.0.1',
      port: process.env.DEV_DB_PORT||'5432',
      database: process.env.DEV_DB_NAME||'wald',
      user: process.env.DEV_DB_USER||'postgres',
      password: process.env.DEV_DB_PASS||'postgres',
      filename: process.env.DEB_FILE_NAME||'./db.sqlite'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrations,
    },
    seeds: {
      directory: seeds
    }
  },

  staging: {
    client: process.env.STA_DB_CLIENT||'postgresql',
    connection: {
      host: process.env.STA_DB_HOST||'127.0.0.1',
      port: process.env.STA_DB_PORT||'5432',
      database: process.env.STA_DB_NAME||'wald',
      user:     process.env.STA_DB_USER||'postgres',
      password: process.env.STA_DB_PASS||'postgres',
      filename: process.env.STA_FILE_NAME||'./db.sqlite'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrations
    },
    seeds: {
      directory: seeds
    }
  },

  production: {
    client: process.env.PROD_DB_CLIENT||'postgresql',
    connection: {
      host: process.env.PROD_DB_HOST||'127.0.0.1',
      port: process.env.PROD_DB_PORT||'5432',
      database: process.env.PROD_DB_NAME||'wald',
      user:     process.env.PROD_DB_USER||'postgres',
      password: process.env.PROD_DB_PASS||'postgres',
      filename: process.env.PROD_FILE_NAME||'./db.sqlite'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrations
    },
    seeds: {
      directory: seeds
    }
  }

};
