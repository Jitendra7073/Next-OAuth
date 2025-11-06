import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const authRoutes = ["/auth/signin", "/auth/signup"];

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise allow navigation
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/signin", "/auth/signup"],
};
