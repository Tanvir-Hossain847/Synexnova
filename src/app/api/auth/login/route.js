import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const USERS_API = "https://synexnova-backend.vercel.app/users";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "synexnova-secret-key-change-in-production"
);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Fetch users from the database API
    const res = await fetch(`${USERS_API}?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error("Failed to reach user database");

    const users = await res.json();
    const user = Array.isArray(users)
      ? users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
      : null;

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare password with bcrypt hash
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Sign JWT — expires in 8 hours
    const token = await new SignJWT({
      sub: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role || "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    // Set token in httpOnly cookie
    const response = NextResponse.json({ ok: true, name: user.name });
    response.cookies.set("sn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
