import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const connectDB =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("Please set environment variable MONGO_DB_URI.");
    }

    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }

    // Use new db connection
    await MongoClient.connect(process.env.MONGO_DB_URI);
    return handler(req, res);
  };

export default connectDB;
