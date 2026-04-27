import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { ProductEnquiry } from "@/models/ProductEnquiry";
import { Newsletter } from "@/models/Newsletter";
import { SubCategory } from "@/models/SubCategory";
import { Session } from "@/models/Session";
import { Contact } from "@/models/Contact";

async function validateSession(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const sessionTokenMatch = cookieHeader.match(/admin_session=([^;]+)/);
  const sessionToken = sessionTokenMatch ? sessionTokenMatch[1] : null;

  if (!sessionToken) return false;

  const session = await Session.findOne({ token: sessionToken });
  if (!session || new Date() > session.expiresAt) return false;

  return true;
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    if (!(await validateSession(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const [totalProducts, totalCategories, totalSubCategories, totalProductEnquiries, totalSubscribers, totalContacts, unreadContacts, unreadProductEnquiries] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      SubCategory.countDocuments(),
      ProductEnquiry.countDocuments(),
      Newsletter.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      ProductEnquiry.countDocuments({ isRead: false }),
    ]);

    const totalEnquiries = totalProductEnquiries + totalContacts;
    const totalUnreadEnquiries = unreadContacts + unreadProductEnquiries;

    // Mock chart data for now, or fetch real monthly counts
    const chartData = [
      { name: 'Jan', enquiries: 4, products: 2 },
      { name: 'Feb', enquiries: 7, products: 5 },
      { name: 'Mar', enquiries: 12, products: 8 },
      { name: 'Apr', enquiries: totalEnquiries, products: totalProducts },
    ];

    const recentActivity = [
      { text: "Latest enquiry received", time: "Just now", type: "enquiry" },
      { text: "Products catalogue updated", time: "Today", type: "product" },
    ];

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        totalSubCategories,
        totalProductEnquiries,
        totalContacts,
        totalSubscribers
      },
      chartData,
      recentActivity
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
