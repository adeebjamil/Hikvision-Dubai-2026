import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
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
    const products = await Product.find({}).populate("category", "name").populate("subCategory", "name").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
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
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const subTitle = formData.get("subTitle") as string;
    const featuresStr = formData.get("features") as string;
    const features = featuresStr ? featuresStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const keyFeaturesStr = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const isFeatured = formData.get("isFeatured") === "true";
    const imageFiles = formData.getAll("images") as File[];

    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        await writeFile(path.join(process.cwd(), "public", "uploads", filename), buffer);
        imageUrls.push(`/uploads/${filename}`);
      }
    }

    const product = await Product.create({ name, slug, subTitle, description, features, keyFeatures, category, subCategory, isFeatured, images: imageUrls });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await Product.findByIdAndDelete(id);
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
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const subTitle = formData.get("subTitle") as string;
    const featuresStr = formData.get("features") as string;
    const features = featuresStr ? featuresStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const keyFeaturesStr = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split("\n").map(f => f.trim()).filter(f => f) : [];
    const isFeatured = formData.get("isFeatured") === "true";
    const imageFiles = formData.getAll("images") as File[];

    if (!id) return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });

    const updateData: any = { name, slug, subTitle, description, features, keyFeatures, category, subCategory, isFeatured };

    if (imageFiles.length > 0 && imageFiles[0].size > 0) {
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const filename = `${Date.now()}-${file.name}`;
          await writeFile(path.join(process.cwd(), "public", "uploads", filename), buffer);
          imageUrls.push(`/uploads/${filename}`);
        }
      }
      updateData.images = imageUrls;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
