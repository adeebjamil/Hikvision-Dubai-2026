import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "You are already subscribed!" }, { status: 400 });
    }

    await Newsletter.create({ email });

    return NextResponse.json({ success: true, message: "Thank you for subscribing!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
