import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "synexnova-secret-key-change-in-production"
);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only protect /dashboard routes
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const token = req.cookies.get("sn_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("sn_token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
