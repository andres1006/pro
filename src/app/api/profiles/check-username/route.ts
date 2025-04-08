import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'Se requiere un nombre de usuario' },
                { status: 400 }
            );
        }

        const exists = await supabaseServer.profiles.usernameExists(username);

        return NextResponse.json({ exists });
    } catch (error) {
        console.error('Error al verificar username:', error);
        return NextResponse.json(
            { error: 'Error al verificar el nombre de usuario' },
            { status: 500 }
        );
    }
} 