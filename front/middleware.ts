import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const publicRoutes = [
    '/',                    // Главная страница - доступна всем
    '/about',              // О нас
    '/contact',            // Контакты
    '/auth/signin', 
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/callback'
  ];

  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/cards',
    '/transactions',
    '/admin',
    '/profile'
  ];
  
  // Проверяем защищенные маршруты
  if (protectedRoutes.includes(pathname)) {
    const session = await auth();
    
    if (!session) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Проверяем доступ к админским страницам
    if (pathname.startsWith('/admin') && !session.isAdmin) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }   
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};