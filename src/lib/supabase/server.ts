import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase.d';

// Función para crear un cliente de Supabase del lado del servidor
export function createServerSupabaseClient() {
  const cookieStore = cookies();

  // Verifica las variables de entorno del servidor
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Variables de entorno de Supabase no disponibles en el servidor');
    throw new Error('Variables de entorno de Supabase no configuradas');
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: {
          'X-Client-Info': 'nextjs-server',
        },
        fetch: async (url, options = {}) => {
          const request = new Request(url, options);
          request.headers.set('Cookie', cookieStore.toString());
          return fetch(request);
        },
      },
    }
  );
}

// Servicio de Supabase con métodos específicos
export const supabaseServer = {
  // Métodos para usuarios
  users: {
    // Obtener un usuario por ID
    async getById(userId: string) {
      const supabase = createServerSupabaseClient();
      return supabase.from('users').select('*').eq('id', userId).single();
    },

    // Obtener un usuario por email
    async getByEmail(email: string) {
      const supabase = createServerSupabaseClient();
      return supabase.from('users').select('*').eq('email', email).single();
    },

    // Actualizar un usuario
    async update(userId: string, data: Partial<Database['public']['Tables']['users']['Update']>) {
      const supabase = createServerSupabaseClient();
      return supabase.from('users').update(data).eq('id', userId);
    },
  },

  // Métodos para perfiles
  profiles: {
    // Obtener perfil por ID de usuario
    async getByUserId(userId: string) {
      const supabase = createServerSupabaseClient();
      return supabase.from('profiles').select('*').eq('userid', userId).single();
    },

    // Actualizar perfil
    async update(userId: string, data: Partial<Database['public']['Tables']['profiles']['Update']>) {
      const supabase = createServerSupabaseClient();
      return supabase.from('profiles').update(data).eq('userid', userId);
    },

    // Verificar si un username ya existe
    async usernameExists(username: string) {
      const supabase = createServerSupabaseClient();
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      return !!data;
    }
  },

  // Estadísticas de usuario
  stats: {
    // Obtener estadísticas por ID
    async getById(statsId: string) {
      const supabase = createServerSupabaseClient();
      return supabase.from('user_stats').select('*').eq('id', statsId).single();
    },

    // Actualizar estadísticas
    async update(statsId: string, data: Partial<Database['public']['Tables']['user_stats']['Update']>) {
      const supabase = createServerSupabaseClient();
      return supabase.from('user_stats').update(data).eq('id', statsId);
    }
  },

  // Método para registrar usuario (flujo completo)
  auth: {
    async registerUser({ email, password, fullName, username }: {
      email: string;
      password: string;
      fullName: string;
      username: string;
    }) {
      const supabase = createServerSupabaseClient();

      try {
        // 1. Verificar si el username ya existe
        const usernameExists = await supabaseServer.profiles.usernameExists(username);
        if (usernameExists) {
          return { error: { message: 'El nombre de usuario ya está en uso' } };
        }

        // 2. Registrar usuario en Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          }
        });

        if (authError) throw authError;
        if (!authData.user?.id) throw new Error('No se pudo crear el usuario');

        const userId = authData.user.id;

        // 3. Crear entrada en tabla users
        const { error: userError } = await supabase.from('users').insert({
          id: userId,
          name: fullName,
          email,
        });

        if (userError) throw userError;

        // 4. Crear estadísticas
        const { data: statsData, error: statsError } = await supabase
          .from('user_stats')
          .insert({
            matches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsscored: 0,
          })
          .select();

        if (statsError) throw statsError;
        if (!statsData || !Array.isArray(statsData) || !statsData[0]) {
          throw new Error('No se pudieron crear las estadísticas del usuario');
        }

        // 5. Crear perfil
        const { error: profileError } = await supabase.from('profiles').insert({
          userid: userId,
          fullname: fullName,
          username,
          statsid: statsData[0].id.toString(),
        });

        if (profileError) throw profileError;

        return { user: authData.user, session: authData.session };
      } catch (error) {
        console.error('Error en registro:', error);
        return {
          error: {
            message: error instanceof Error ? error.message : 'Error al registrar usuario'
          }
        };
      }
    }
  }
}; 