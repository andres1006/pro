import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Intercambiar el código por una sesión (verificación de correo)
        await supabase.auth.exchangeCodeForSession(code)
    }

    // Redirigir a la página de login con mensaje de éxito
    return NextResponse.redirect(new URL('/login?verified=true', request.url))
} 