import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Session } from "@/models/Session";
import mongoose from "mongoose";

async function validateSession(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : null;
  if (!token) return false;
  const session = await Session.findOne({ token });
  return session && new Date() < session.expiresAt;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const isConnected = mongoose.connection.readyState === 1;
    let dbSize = 0;
    
    if (isConnected && mongoose.connection.db) {
      const stats = await mongoose.connection.db.stats();
      dbSize = stats.dataSize + stats.indexSize; // Total size in bytes
    }

    return NextResponse.json({
      success: true,
      status: {
        database: isConnected ? "Connected" : "Disconnected",
        system: "Online",
        storage: dbSize, // in bytes
        uptime: process.uptime(),
        nodeVersion: process.version,
        platform: process.platform
      }
    });
  } catch (error) {
    console.error("System status error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
