const { NODE_ENV, SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT, DB_NAME } = process.env
const { DEV } = require('../src/constants')

module.exports = {
  mode: NODE_ENV || DEV,
  server: {
    host: SERVER_HOST || '127.0.0.1',
    port: SERVER_PORT || 3333
  },
  database: {
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 27017,
    dbname: DB_NAME || 'faizAdmin'
  }
}
