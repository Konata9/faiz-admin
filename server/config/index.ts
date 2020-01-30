const { NODE_ENV, SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT, DB_NAME } = process.env

import CONSTANTS from '../src/constants'
const { DEV } = CONSTANTS

export default {
  mode: NODE_ENV || DEV,
  server: {
    host: SERVER_HOST || '127.0.0.1',
    port: Number(SERVER_PORT) || 3333
  },
  database: {
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || 27017,
    dbname: DB_NAME || 'faizAdmin'
  }
}
