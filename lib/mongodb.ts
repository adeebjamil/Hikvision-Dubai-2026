import mongoose from "mongoose";

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI!).then((m) => m).catch(err => {
      cached.promise = null; // Reset promise so it can retry next time
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
