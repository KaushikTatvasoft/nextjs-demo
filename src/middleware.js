import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "@/constants/general.js";

export function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (!request.cookies.get('token')?.value && PUBLIC_ROUTES.indexOf(request.nextUrl.pathname) === -1) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (request.cookies.get('token')?.value && PUBLIC_ROUTES.indexOf(request.nextUrl.pathname) !== -1 &&  request.nextUrl.pathname !== '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }