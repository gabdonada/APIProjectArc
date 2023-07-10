import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

class Database {
  private static instance: Database;
  private db!: Db;

  private constructor() {
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const mongoURL = process.env.DB_CONN_STRING || '';
      const client = new MongoClient(mongoURL);
      await client.connect();
      this.db = client.db(process.env.DB_NAME); 
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  public getDb(): Db {
    return this.db;
  }
}

export default Database;
