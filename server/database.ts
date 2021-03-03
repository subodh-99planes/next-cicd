import dotenv from 'dotenv-safe'
import dbService from './config/db'

dotenv.config()
const initDB = async (): Promise<void> => {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await dbService.getDb()
  await db
    .collection('users')
    .createIndexes([
      { key: { email: 1 }, name: 'email', unique: true }
    ], { unique: true })
  console.log('Database setup complete...')
}
export default initDB

