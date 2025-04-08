import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { pathname } = request.nextUrl

    // Rutas protegidas
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
        if (!token) {
            const url = new URL('/login', request.url)
            url.searchParams.set('callbackUrl', encodeURI(request.url))
            return NextResponse.redirect(url)
        }
    }

    // Si ya está autenticado, redirigir desde páginas de auth
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// Proteger solo las rutas específicas
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/signup']
}
