import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Cambiamos el nombre de la función de middleware a proxy
export async function proxy(request: NextRequest) {
let response = NextResponse.next({
    request: {
    headers: request.headers,
    },
});

const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
        getAll() {
        return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
            request: {
            headers: request.headers,
            },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
        );
        },
    },
    }
);
const { data: { user } } = await supabase.auth.getUser();

  // Mantenemos la protección de la ruta admin para COBYTE
if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    
    return NextResponse.redirect(new URL('/login', request.url));
}

return response;
}

// El matcher sigue igual, vigilando la administración
export const config = {
matcher: [
    /*
     * Protege solo las rutas que empiezan con /admin
     * Ignora el resto (incluyendo /login)
     */
    '/admin/:path*',
],
}