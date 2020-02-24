import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoOpts } from "../server/database";

const mongod = new MongoMemoryServer();

// Connect to the in-memory database.
const connectDB = async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, mongoOpts);
};

// Drop database, close the connection and stop mongod.
const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Remove all the data for all db collections.
const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

// can import this function when testing ...
// ... routes to setup a test database
export default function dbSetup() {
  beforeAll(async () => await connectDB());
  afterEach(async () => await clearDB());
  afterAll(async () => await closeDB());
}
