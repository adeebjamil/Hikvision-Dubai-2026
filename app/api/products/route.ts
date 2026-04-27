import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { SubCategory } from "@/models/SubCategory";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const subCatSlug = searchParams.get('subcat');
    const isFeatured = searchParams.get('featured');
    const productSlug = searchParams.get('slug');
    
    let query: any = {};
    
    if (productSlug) {
      const product = await Product.findOne({ slug: productSlug })
        .populate('category', 'name slug')
        .populate('subCategory', 'name slug');
      return NextResponse.json({ success: true, data: product });
    }
    
    if (subCatSlug) {
      const subCategory = await SubCategory.findOne({ slug: subCatSlug });
      if (subCategory) {
        query.subCategory = subCategory._id;
      } else {
        return NextResponse.json({ success: true, data: [] });
      }
    }

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('subCategory', 'name slug')
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
