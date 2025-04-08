import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: NextRequest) {
    try {
        // Verificar sesión de usuario
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Obtener datos del body
        const { fullName, username } = await req.json();

        if (!fullName || !username) {
            return NextResponse.json(
                { error: 'Se requieren todos los campos' },
                { status: 400 }
            );
        }

        // Verificar si el username ya existe (si es diferente al actual)
        const profileResponse = await supabaseServer.profiles.getByUserId(session.user.id);

        if (profileResponse.error) {
            throw new Error('Error al obtener perfil de usuario');
        }

        // Si hay datos y el username es diferente al actual
        if (profileResponse.data && username !== profileResponse.data.username) {
            const exists = await supabaseServer.profiles.usernameExists(username);
            if (exists) {
                return NextResponse.json(
                    { error: 'El nombre de usuario ya está en uso' },
                    { status: 400 }
                );
            }
        }

        // Actualizar perfil
        const { error } = await supabaseServer.profiles.update(session.user.id, {
            fullname: fullName,
            username,
        });

        if (error) {
            throw new Error(error.message);
        }

        // Actualizar usuario
        const updateResult = await supabaseServer.users.update(session.user.id, {
            name: fullName,
        });

        if (updateResult.error) {
            console.warn('Error al actualizar datos de usuario:', updateResult.error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error al actualizar el perfil de usuario' },
            { status: 500 }
        );
    }
} 