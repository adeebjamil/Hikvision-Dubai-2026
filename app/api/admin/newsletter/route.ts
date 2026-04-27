import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { Session } from "@/models/Session";

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
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await Newsletter.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id, isRead, isActive } = await req.json();
    
    const updateData: any = {};
    if (isRead !== undefined) updateData.isRead = isRead;
    if (isActive !== undefined) updateData.isActive = isActive;

    await Newsletter.findByIdAndUpdate(id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
