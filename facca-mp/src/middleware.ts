import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/purchases", "/profile"];
const adminRoutes = ["/manager/balance"];
const masterRoutes = [""];

// Hierarquia de roles
const roleHierarchy: Record<Role, number> = {
  USER: 0,
  ADMIN: 1,
  MASTER: 2,
};

const secret = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret });

  if (!token) {
    // Redireciona para a página inicial se não estiver logado
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const userRole = token.role as Role;
  console.log(token);

  // Protege rotas que requerem login
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protege rotas restritas a administradores
  if (adminRoutes.some((route) => url.pathname.startsWith(route))) {
    if (roleHierarchy[userRole] < roleHierarchy.ADMIN) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Protege rotas restritas a masters
  if (masterRoutes.some((route) => url.pathname.startsWith(route))) {
    if (roleHierarchy[userRole] < roleHierarchy.MASTER) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Permite acesso se todas as verificações forem passadas
}

export const config = {
  matcher: ["/purchases/:path*", "/profile/:path*", "/manager/:path*"],
};
