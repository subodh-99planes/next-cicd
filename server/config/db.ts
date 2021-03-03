import MongoClient from 'mongodb'
import config from '../config/vars'

const dbService = (() => {
  let client: any
  const dbURI = `mongodb+srv://${config.dbConfig.dbUser}:${config.dbConfig.dbPass}@cluster0-bmai3.gcp.mongodb.net/?retryWrites=true&w=majority`

  return {
    getDb: async () => {
      try {
        if (!client) {
          client = await MongoClient.connect(dbURI, {
            useNewUrlParser: true,
            wtimeout: 2000,
            useUnifiedTopology: true
          })
        }
        if (client && !client.isConnected()) {
          await client.connect()
        }
        return await client.db(config.dbConfig.dbName)
      } catch (e) {
        console.error(`Unable to connect to DB: ${e}`)
      }
      return client.db(config.dbConfig.dbName)
    }
  }
})()

export default dbService
