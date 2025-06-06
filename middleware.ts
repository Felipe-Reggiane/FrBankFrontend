import { NextRequest, NextResponse } from "next/server";

const publicRegex = /^\/($|register(\/|$))/;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuth = !!token;
  let { pathname } = request.nextUrl;

  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const isPublic = publicRegex.test(pathname);

  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
