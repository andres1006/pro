import { createClient } from '@supabase/supabase-js'
import NextAuth from 'next-auth'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Inicializa el cliente de Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Extiende el tipo de usuario de NextAuth para incluir id
declare module "next-auth" {
    interface User {
        id: string;
        username?: string;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            username?: string;
        }
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    // Configura los proveedores de autenticación
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const { data, error } = await supabase
                        .auth.signInWithPassword({
                            email: credentials.email,
                            password: credentials.password
                        })

                    if (error) {
                        throw new Error(error.message)
                    }

                    return {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.user_metadata.full_name,
                        image: data.user.user_metadata.avatar_url,
                        access_token: data.session?.access_token,
                        refresh_token: data.session?.refresh_token,
                    }
                } catch (error) {
                    console.error('Error al autenticar:', error)
                    return null
                }
            }
        })
    ],

    // Configuración de sesiones y páginas
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login',
        newUser: '/signup',
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;

                // Obtener nombre de usuario del perfil
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('userid', session.user.id)
                    .single();

                if (profile) {
                    session.user.username = profile.username;
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 