// middleware pour savoir si tu as le droit d'accéder à la page demandée

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
}

// l'appel de dotenv est fait dans le next.config
const SECRET_KEY = process.env.SECRET_KEY || "";

const LOGIN_URL = "/auth/login";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("tokenParkour")?.value;
  const response = await checkToken(token, request);
  return response;
}

async function checkToken(
  token: string | undefined,
  request: NextRequest
): Promise<NextResponse> {
  if (!token) {
    return handleInvalidToken(request);
  }

  try {
    const payload = await jwtVerify<Payload>(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );
    const { pathname } = request.nextUrl;
    const { email, role } = payload.payload;

    if (pathname.startsWith("/user/profil") && email) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/admin") && role === "ADMIN" && email) {
      return NextResponse.next();
    }

    if (
      (pathname.startsWith("/user/favoris") ||
        pathname.startsWith("/user/notes")) &&
      role === "CLIENT" &&
      email
    ) {
      return NextResponse.next();
    }

    return handleInvalidToken(request);
  } catch (err) {
    console.error("Token verification failed", err);
    return handleInvalidToken(request);
  }
}

// redirige quand invalide
function handleInvalidToken(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
  response.cookies.delete("tokenParkour");
  return response;
}

// check pour ces routes là
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
