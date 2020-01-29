const mongoose = require('mongoose')

const { DEV, DB_CONNECTION } = require('../constants')
const { mode, database } = require('../../config')
const dbPath = `mongodb://${database.host}:${database.port}/${database.dbname}`

class Database {
  constructor(options = {}) {
    this.options = options
    mongoose.set('debug', mode === DEV)
  }

  init() {
    try {
      mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true, ...this.options })

      mongoose.connection.on(DB_CONNECTION.DISCONNECT, () => {
        console.warn('db connection has disconnected')
      })

      mongoose.connection.on(DB_CONNECTION.ERROR, (error) => {
        console.error(error)
      })

      mongoose.connection.on(DB_CONNECTION.OPEN, async () => {
        console.info('db connection has established')
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Database