// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Example: Protect routes
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    // redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Optional: define which routes to apply middleware to
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
