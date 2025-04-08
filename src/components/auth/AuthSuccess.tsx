"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AuthSuccessProps {
  message: string;
  redirectTo: string;
  redirectDelay?: number; // en milisegundos
  children?: ReactNode;
}

export function AuthSuccess({
  message,
  redirectTo,
  redirectDelay = 3000,
  children,
}: AuthSuccessProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(Math.floor(redirectDelay / 1000));

  useEffect(() => {
    // Iniciar cuenta regresiva
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirigir después del tiempo especificado
    const redirect = setTimeout(() => {
      router.push(redirectTo);
    }, redirectDelay);

    // Limpieza de los temporizadores
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [redirectDelay, redirectTo, router]);

  // Función para redirigir inmediatamente
  const handleRedirectNow = () => {
    router.push(redirectTo);
  };

  return (
    <div className="text-center space-y-6">
      <div className="rounded-full bg-green-100 w-20 h-20 flex items-center justify-center mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold">{message}</h2>

      {children}

      <p className="text-gray-600">
        Serás redirigido automáticamente en {countdown}{" "}
        {countdown === 1 ? "segundo" : "segundos"}
      </p>

      <Button onClick={handleRedirectNow}>Continuar ahora</Button>
    </div>
  );
}
