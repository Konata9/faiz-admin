import mongoose from 'mongoose'

import CONSTANTS from '@constants'
const { DEV, DB_CONNECTION } = CONSTANTS

import config from '@config'
const { mode, database } = config
const dbPath = `mongodb://${database.host}:${database.port}/${database.dbname}`

class Database {

  private options: {}

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

      mongoose.connection.on(DB_CONNECTION.ERROR, (error: any) => {
        console.error(error)
      })

      mongoose.connection.on(DB_CONNECTION.OPEN, async () => {
        console.info('db connection has established')
      })
    } catch (error) {
      console.error(error)
    }
  }

  close() {
    mongoose.connection.close()
  }
}

export default Database