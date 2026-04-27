import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // We only protect /admin routes
  if (path.startsWith('/admin')) {
    // If it's the login page, don't protect it
    if (path === '/admin/login' || path === '/api/admin/login') {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('admin_session');
    
    if (!sessionCookie) {
      if (path.startsWith('/api/')) {
         return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // For non-API admin routes, we might want to validate the token by calling our API
    if (!path.startsWith('/api/')) {
        const baseUrl = request.nextUrl.origin;
        try {
        const response = await fetch(`${baseUrl}/api/admin/check-session`, {
            headers: {
            Cookie: `admin_session=${sessionCookie.value}`
            }
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        } catch (error) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
