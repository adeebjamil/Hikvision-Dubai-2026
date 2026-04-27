import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SubCategory } from "@/models/SubCategory";
import { Category } from "@/models/Category";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const catSlug = searchParams.get('cat');
    
    let query = {};
    
    if (catSlug) {
      const category = await Category.findOne({ slug: catSlug });
      if (category) {
        query = { category: category._id };
      } else {
        return NextResponse.json({ success: true, data: [] });
      }
    }

    const subCategories = await SubCategory.find(query)
      .populate('category', 'name slug')
      .sort({ name: 1 });
    return NextResponse.json({ success: true, data: subCategories });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
