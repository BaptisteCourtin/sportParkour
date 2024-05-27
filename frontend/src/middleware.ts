import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
}

// mettre dotenv en front
const SECRET_KEY = process.env.SECRET_KEY || "";

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("tokenParkour");

  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(SECRET_KEY)
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const payload = await verify(token);

    if (payload?.email) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.error("Verification failed", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
