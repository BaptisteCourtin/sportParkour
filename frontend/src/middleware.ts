import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// vérifier par role et email
interface Payload {
  email: string;
  role: string;
}

// l'appel de dotenv est fait dans le next.config
const SECRET_KEY = process.env.SECRET_KEY || "";

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("tokenParkour");

  const response = await checkToken(token?.value, request);
  return response;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  const nextUrl = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const payload = await jwtVerify<Payload>(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    // cherche si email dans le token && role = ADMIN && path pour admin
    if (
      payload?.payload.email &&
      payload?.payload.role == "ADMIN" &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.next();
    } else if (
      payload?.payload.email &&
      payload?.payload.role == "CLIENT" &&
      request.nextUrl.pathname.startsWith("/user")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.error("Verification failed", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// check pour ces routes là
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
