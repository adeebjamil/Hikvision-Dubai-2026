import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    // Attempt to connect to the database
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, message: "MONGODB_URI environment variable is not defined in .env.local" },
        { status: 500 }
      );
    }

    await connectToDatabase();
    
    const email = "admin@hikvision.com";
    const password = "AdminPassword123!";
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ 
        success: true, 
        message: "Admin already exists! You can log in.",
        email: existingAdmin.email
      });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await Admin.create({
      email,
      password: hashedPassword
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin account successfully created!",
      credentials: { 
        email, 
        password 
      },
      note: "Please save these credentials and delete this API route (/app/api/admin/setup/route.ts) for security!"
    });

  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to setup admin: " + error.message },
      { status: 500 }
    );
  }
}
