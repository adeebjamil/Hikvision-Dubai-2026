import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Session } from "@/models/Session";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionTokenMatch = cookieHeader.match(/admin_session=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (!sessionToken) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const session = await Session.findOne({ token: sessionToken });
    
    if (!session || new Date() > session.expiresAt) {
      return NextResponse.json({ success: false, message: "Session expired" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Authorized" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
