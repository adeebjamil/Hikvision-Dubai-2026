import { NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/mongodb';
import { ProductEnquiry } from '@/models/ProductEnquiry';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { productId, name, email, phone, message } = body;

    if (!productId || !name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const enquiry = await ProductEnquiry.create({
      productId,
      name,
      email,
      phone,
      message,
      status: 'unread'
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error("Enquiry Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const enquiries = await ProductEnquiry.find({})
      .populate('productId', 'name slug images')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
    }
    
    const enquiry = await ProductEnquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
    }
    
    await ProductEnquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
