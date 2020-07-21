import knex from 'knex';

require('dotenv').config()

var config = require('../knexfile')[process.env.DEV_MODE||'development']

export default knex(config)