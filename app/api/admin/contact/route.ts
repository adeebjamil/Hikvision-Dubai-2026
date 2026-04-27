import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
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
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id, isRead, isResolved } = await req.json();
    
    const updateData: any = {};
    if (isRead !== undefined) updateData.isRead = isRead;
    if (isResolved !== undefined) updateData.isResolved = isResolved;
    
    if (isRead === undefined && isResolved === undefined) {
      updateData.isRead = true;
    }

    console.log("Updating contact:", id, updateData);
    
    // Explicitly use the collection to bypass any Mongoose schema caching issues
    const updated = await Contact.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) }, 
      { $set: updateData }, 
      { new: true, strict: false }
    );
    
    console.log("Update result from DB:", updated);

    if (!updated) {
      return NextResponse.json({ success: false, message: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
