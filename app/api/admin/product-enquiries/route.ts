import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductEnquiry } from "@/models/ProductEnquiry";
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
    if (!(await validateSession(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const enquiries = await ProductEnquiry.find({})
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    // Ensure status field exists for all enquiries (migration/compatibility)
    const normalizedEnquiries = enquiries.map((e: any) => {
      const doc = e.toObject();
      if (!doc.status) {
        doc.status = doc.isRead ? 'read' : 'unread';
      }
      return doc;
    });

    return NextResponse.json({ success: true, data: normalizedEnquiries });
  } catch (error) {
    console.error("GET Enquiries Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    const { id, status } = await req.json();
    
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "Missing id or status" }, { status: 400 });
    }
    
    // Use findOne and then save to ensure hooks and full persistence
    const enquiry = await ProductEnquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
    }

    enquiry.status = status;
    // Also update isRead for legacy compatibility
    enquiry.isRead = (status === 'read' || status === 'resolved');
    
    await enquiry.save();

    console.log(`Successfully saved enquiry ${id} as ${status}`);
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error("PATCH Enquiry Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await ProductEnquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
