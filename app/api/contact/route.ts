import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { name, email, phone, service, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 });
    }

    await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json({ success: true, message: "Enquiry sent successfully!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
