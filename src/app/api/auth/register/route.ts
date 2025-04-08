import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const body = await request.json();
        const { email, password, fullName, username } = body;

        // Validar los datos recibidos
        if (!email || !password || !fullName || !username) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Usar nuestro servicio para registrar el usuario
        const result = await supabaseServer.auth.registerUser({
            email,
            password,
            fullName,
            username
        });

        // Manejar errores
        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 400 }
            );
        }

        // Devolver respuesta exitosa
        return NextResponse.json(
            {
                success: true,
                message: 'Usuario registrado exitosamente',
                user: {
                    id: result.user?.id,
                    email: result.user?.email,
                },
                requiresEmailConfirmation: !result.user?.email_confirmed_at
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error en el registro:', error);

        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
} 