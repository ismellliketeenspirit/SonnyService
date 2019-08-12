// Update with your config settings.
require('dotenv').config()

const pg = require('pg')
// pg.defaults.ssl = true

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/amazon' || process.env.DATABASE_URL
  }
};


