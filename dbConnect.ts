import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI!;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!process.env.MONGO_DB_URI) {
    throw new Error("Add Mongo URI to .env.local");
  }

  if (!client) {
    client = await MongoClient.connect(uri);
    return client;
  } else {
    return client;
  }
}
export default connectToDatabase;
