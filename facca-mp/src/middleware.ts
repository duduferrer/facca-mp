import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt"; //------->alterada
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

const secret = process.env.JWT_SECRET; //------->alterada

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); //------->alterada
  const token = await getToken({ req, secret }); //------->alterada

  if (!token) {
    // Redireciona para a página inicial se não estiver logado
    url.pathname = "/"; //------->alterada
    return NextResponse.redirect(url); //------->alterada
  }

  const userRole = token.role as Role; //------->alterada

  // Protege rotas que requerem login
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next(); //------->alterada
  }

  // Protege rotas restritas a administradores
  if (adminRoutes.some((route) => url.pathname.startsWith(route))) {
    if (roleHierarchy[userRole] < roleHierarchy.ADMIN) {
      //------->alterada
      url.pathname = "/"; // Página de acesso negado //------->alterada
      return NextResponse.redirect(url); //------->alterada
    }
  }

  // Protege rotas restritas a masters
  if (masterRoutes.some((route) => url.pathname.startsWith(route))) {
    if (roleHierarchy[userRole] < roleHierarchy.MASTER) {
      //------->alterada
      url.pathname = "/"; //------->alterada
      return NextResponse.redirect(url); //------->alterada
    }
  }

  return NextResponse.next(); // Permite acesso se todas as verificações forem passadas //------->alterada
}

export const config = {
  matcher: ["/purchases/:path*", "/profile/:path*", "/manager/:path*"], //------->alterada
};
