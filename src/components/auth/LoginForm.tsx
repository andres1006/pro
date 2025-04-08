"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Esquema de validación
const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(
    error ? error.message : null
  );

  // Define el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoginError(null);
      const success = await login({
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error de login:", error);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error durante el inicio de sesión"
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Iniciar sesión
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      {loginError && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
          {loginError}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* show error login message response server */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
              {error.message}
            </div>
          )}
          <div className="text-sm text-right">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
