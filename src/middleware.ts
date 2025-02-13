import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  //const isAuthPage = request.nextUrl.pathname === "/register" || request.nextUrl.pathname === "/login";

  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  //if (token && isAuthPage) {
  //  return NextResponse.redirect(new URL("/", request.url));
  //}

  return NextResponse.next();
}

export const config = {
  matcher: ["/"] // "/register", "/login"
};