import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let db;

if (uri) {
  client = new MongoClient(uri);
  db = client.db(process.env.MONGODB_DB || undefined);
}

export function getMongoDb() {
  if (!db) throw new Error("MongoDB is not configured. Add MONGODB_URI to .env.local.");
  return db;
}
