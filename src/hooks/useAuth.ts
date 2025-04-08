"use client";

import { useState, useCallback } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { apiService } from "@/lib/api";

interface AuthError {
    message: string;
    code?: string;
}

interface LoginCredentials {
    email: string;
    password: string;
    redirect?: boolean;
    callbackUrl?: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
    fullName: string;
}

export function useAuth() {
    const { data: session, status, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);

    const login = useCallback(
        async ({ email, password, redirect = false, callbackUrl = "/dashboard" }: LoginCredentials) => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await signIn("credentials", {
                    redirect,
                    email,
                    password,
                    callbackUrl,
                });

                if (result?.error) {
                    setError({
                        message: "Credenciales inválidas o cuenta no confirmada",
                        code: "auth/invalid-credentials",
                    });
                    return false;
                }

                return true;
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                setError({
                    message: error instanceof Error ? error.message : "Error al iniciar sesión",
                    code: "auth/unknown-error",
                });
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const register = useCallback(async (credentials: RegisterCredentials) => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await apiService.auth.register(credentials);
            return result;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setError({
                message: error instanceof Error ? error.message : "Error al registrar usuario",
                code: "auth/registration-failed",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            await signOut({ redirect: true, callbackUrl: "/" });
            return true;
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setError({
                message: error instanceof Error ? error.message : "Error al cerrar sesión",
                code: "auth/logout-failed",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginWithGoogle = useCallback(async (callbackUrl = "/dashboard") => {
        try {
            setIsLoading(true);
            setError(null);
            await signIn("google", { callbackUrl });
            return true;
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            setError({
                message: error instanceof Error ? error.message : "Error al iniciar sesión con Google",
                code: "auth/google-failed",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshUserData = useCallback(async () => {
        try {
            if (session?.user) {
                // Actualiza los datos del usuario en la sesión
                await update();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error);
            return false;
        }
    }, [session, update]);

    return {
        user: session?.user,
        isAuthenticated: status === "authenticated",
        isLoading: isLoading || status === "loading",
        error,
        login,
        register,
        logout,
        loginWithGoogle,
        refreshUserData,
        status,
    };
} 