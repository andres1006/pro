import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Definición más explícita
let supabaseInstance: SupabaseClient<Database> | null = null;

// Función para obtener el cliente de Supabase (inicializarlo si no existe)
export function getSupabaseClient() {
    if (supabaseInstance) return supabaseInstance;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('❌ Variables de entorno de Supabase no disponibles en el cliente');
        throw new Error('Variables de entorno de Supabase no configuradas');
    }

    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
}

// API del cliente Supabase para componentes del lado del cliente
export const supabaseClient = {
    // Autenticación
    auth: {
        // Iniciar sesión con credenciales
        async signInWithPassword(email: string, password: string) {
            const supabase = getSupabaseClient();
            return supabase.auth.signInWithPassword({ email, password });
        },

        // Registrar nuevo usuario
        async signUp(email: string, password: string, userData: Database['public']['Tables']['profiles']['Insert']) {
            const supabase = getSupabaseClient();
            return supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData,
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        },

        // Cerrar sesión
        async signOut() {
            const supabase = getSupabaseClient();
            return supabase.auth.signOut();
        },

        // Obtener sesión actual
        async getSession() {
            const supabase = getSupabaseClient();
            return supabase.auth.getSession();
        },

        // Obtener usuario actual
        async getUser() {
            const supabase = getSupabaseClient();
            return supabase.auth.getUser();
        }
    },

    // Perfiles
    profiles: {
        // Obtener perfil por ID de usuario
        async getByUserId(userId: string) {
            const supabase = getSupabaseClient();
            return supabase.from('profiles').select('*').eq('userid', userId).single();
        },

        // Verificar si un username ya está en uso
        async usernameExists(username: string) {
            const supabase = getSupabaseClient();
            const { data } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();

            return !!data;
        }
    },

    // Prueba de conexión
    async testConnection() {
        try {
            const supabase = getSupabaseClient();
            const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });

            if (error) throw error;
            return { success: true, message: 'Conexión exitosa con Supabase' };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Error al conectar con Supabase'
            };
        }
    }
}; 