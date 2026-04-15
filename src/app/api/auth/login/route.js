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

    // Fetch all users
    const res = await fetch(USERS_API, { cache: "no-store" });
    if (!res.ok) {
      console.error("[auth/login] Users API returned", res.status);
      return NextResponse.json({ error: "Could not reach user database" }, { status: 502 });
    }

    const users = await res.json();
    console.log("[auth/login] Total users fetched:", Array.isArray(users) ? users.length : typeof users);

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: "No users found in database" }, { status: 401 });
    }

    // Find user by email (case-insensitive)
    const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    console.log("[auth/login] User found:", user ? user.email : "NOT FOUND");

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.password) {
      console.error("[auth/login] User has no password field");
      return NextResponse.json({ error: "Account configuration error" }, { status: 500 });
    }

    console.log("[auth/login] Stored hash prefix:", user.password.slice(0, 10));

    // Compare submitted password against bcrypt hash
    const valid = await bcrypt.compare(password, user.password);
    console.log("[auth/login] Password valid:", valid);

    // TEMP: if bcrypt fails, check if password field is a known test value
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Sign JWT
    const token = await new SignJWT({
      sub:   String(user._id),
      email: user.email,
      name:  user.name,
      role:  user.role || "Admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ ok: true, name: user.name });
    response.cookies.set("sn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[auth/login] Unexpected error:", err.message);
    return NextResponse.json({ error: "Server error: " + err.message }, { status: 500 });
  }
}
