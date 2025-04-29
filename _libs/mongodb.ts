import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string

if(!URI) {
    throw new Error(".env missing mongodb URI")
}

let cached = (global as any).mongoose || {conn: null, promise: null}

export default async function connectDB() {
    if(cached.conn) return cached.conn

    if(!cached.promise) {
        cached.promise = await mongoose.connect(URI)
    }
    cached.conn = await cached.promise
    return cached.conn
}