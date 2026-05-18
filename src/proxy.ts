import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ÚNICO CAMBIO AQUÍ: Ahora lo exportamos como "default function proxy"
export default function proxy(request: NextRequest) {
  // El guardia busca la cookie que plantamos en el login
const hasAccess = request.cookies.has('sb-access');

  // Si intentas entrar a /admin y NO tienes la cookie, te expulsa al login
if (request.nextUrl.pathname.startsWith('/admin') && !hasAccess) {
    return NextResponse.redirect(new URL('/login', request.url));
}

  // Si tienes la cookie, te deja pasar al panel
return NextResponse.next();
}

export const config = {
matcher: [
    '/admin/:path*',
],
};