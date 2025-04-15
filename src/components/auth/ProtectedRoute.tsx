"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo redirigir si no estamos cargando y no estamos autenticados
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  // Mientras estamos comprobando, mostramos un indicador de carga
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-cyan-900">
        <Image src="/assets/LOGO.png" alt="logo" width={300} height={300} />
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary "></div>
      </div>
    );
  }

  // Si no estamos autenticados, no mostramos nada (la redirección ocurrirá en el useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Si estamos autenticados, mostramos el contenido
  return <>{children}</>;
}
