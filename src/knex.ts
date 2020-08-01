import knex from 'knex';

require('dotenv').config()

var config: any = require('../knexfile')[process.env.DEV_MODE||'development']

var Knex: knex = knex(config)

export default Knex