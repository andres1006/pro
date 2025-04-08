"use client";

import { supabaseClient } from "./supabase/client";

/**
 * Servicio para hacer peticiones API desde el cliente
 */
export const apiService = {
    // Funciones relacionadas con autenticación
    auth: {
        /**
         * Iniciar sesión con email y contraseña
         */
        async login(email: string, password: string) {
            try {
                // Usamos directamente el cliente Supabase
                const result = await supabaseClient.auth.signInWithPassword(email, password);
                return result;
            } catch (error) {
                console.error("Error en login:", error);
                throw error;
            }
        },

        /**
         * Registrar un nuevo usuario usando el endpoint API
         */
        async register(data: {
            email: string;
            password: string;
            fullName: string;
            username: string;
        }) {
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Error al registrar usuario");
                }

                return await response.json();
            } catch (error) {
                console.error("Error en registro:", error);
                throw error;
            }
        },

        /**
         * Cerrar sesión
         */
        async logout() {
            try {
                return await supabaseClient.auth.signOut();
            } catch (error) {
                console.error("Error en logout:", error);
                throw error;
            }
        },

        /**
         * Obtener la sesión actual
         */
        async getSession() {
            try {
                return await supabaseClient.auth.getSession();
            } catch (error) {
                console.error("Error al obtener sesión:", error);
                throw error;
            }
        },
    },

    // Funciones relacionadas con perfiles
    profiles: {
        /**
         * Obtener el perfil del usuario actual 
         */
        async getCurrentProfile() {
            try {
                // Primero obtenemos el usuario actual
                const { data: sessionData } = await supabaseClient.auth.getSession();

                if (!sessionData.session?.user.id) {
                    throw new Error("No hay usuario autenticado");
                }

                // Luego obtenemos su perfil
                return await supabaseClient.profiles.getByUserId(sessionData.session.user.id);
            } catch (error) {
                console.error("Error al obtener perfil:", error);
                throw error;
            }
        },

        /**
         * Verificar si un nombre de usuario ya está en uso
         */
        async checkUsername(username: string): Promise<boolean> {
            try {
                const res = await fetch(`/api/profiles/check-username?username=${encodeURIComponent(username)}`);
                if (!res.ok) throw new Error('Error al verificar username');

                const data = await res.json();
                return data.exists;
            } catch (error) {
                console.error('Error al verificar username:', error);
                return false;
            }
        },

        // Actualizar perfil de usuario
        async updateProfile(data: { fullName: string; username: string }): Promise<{ success: boolean; message?: string }> {
            try {
                const res = await fetch('/api/profiles/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Error al actualizar perfil');
                }

                return { success: true };
            } catch (error) {
                console.error('Error al actualizar perfil:', error);
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al actualizar perfil'
                };
            }
        },
    },

    /**
     * Verificar conexión con Supabase
     */
    async checkConnection() {
        return await supabaseClient.testConnection();
    },
}; 