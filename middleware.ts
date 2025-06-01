import { NextRequest, NextResponse } from "next/server";

const publicRegex = /^\/($|register(\/|$))/;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuth = !!token;
  let { pathname } = request.nextUrl;

  // Normaliza pathname (remove barra final, exceto para "/")
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const isPublic = publicRegex.test(pathname);

  // Usuário deslogado tentando acessar rota protegida
  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Usuário logado tentando acessar login ou registro
  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
