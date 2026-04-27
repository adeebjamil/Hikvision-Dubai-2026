import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SubCategory } from "@/models/SubCategory";
import { Category } from "@/models/Category";
import { Session } from "@/models/Session";
import { writeFile } from "fs/promises";
import path from "path";

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
    const subCategories = await SubCategory.find({}).populate("category", "name").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subCategories });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug || !category) return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      await writeFile(path.join(process.cwd(), "public", "uploads", filename), buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newSubCategory = await SubCategory.create({ name, slug, category, image: imageUrl });
    return NextResponse.json({ success: true, data: newSubCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await SubCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !slug || !category) return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    const updateData: any = { name, slug, category };

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name}`;
      await writeFile(path.join(process.cwd(), "public", "uploads", filename), buffer);
      updateData.image = `/uploads/${filename}`;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedSubCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
