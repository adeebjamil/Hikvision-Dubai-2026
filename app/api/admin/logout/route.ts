import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Session } from "@/models/Session";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionTokenMatch = cookieHeader.match(/admin_session=([^;]+)/);
    const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

    if (sessionToken) {
      await Session.deleteOne({ token: sessionToken });
    }

    const response = NextResponse.json({ success: true, message: "Logged out" });
    
    // Clear cookie
    response.cookies.delete("admin_session");

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
