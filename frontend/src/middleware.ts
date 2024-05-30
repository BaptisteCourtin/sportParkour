import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

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
  let response: NextResponse<unknown>;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const payload = await jwtVerify<Payload>(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    // cherche si email et role selon path
    if (
      // l'admin aussi a un profil
      request.nextUrl.pathname.startsWith("/user/profil") &&
      payload?.payload.email
    ) {
      response = NextResponse.next();
    } else if (
      // les pages admin
      request.nextUrl.pathname.startsWith("/admin") &&
      payload?.payload.role == "ADMIN" &&
      payload?.payload.email
    ) {
      response = NextResponse.next();
    } else if (
      // favoris, que pour les clients
      request.nextUrl.pathname.startsWith("/user/favoris") &&
      payload?.payload.role == "CLIENT" &&
      payload?.payload.email
    ) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("tokenParkour");
    }

    return response;
  } catch (err) {
    console.error("Verification failed", err);
    response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("tokenParkour");
    return response;
  }
}

// check pour ces routes là
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
