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
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";
import { AuthSuccess } from "./AuthSuccess";
import { apiService } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

// Esquema de validación
const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Solo puede contener letras, números y guiones bajos",
      }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState(false);

  const { register, isLoading } = useAuth();

  // Define el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Función para validar username único
  const validateUsername = async (username: string) => {
    try {
      const exists = await apiService.profiles.checkUsername(username);
      if (exists) {
        return "Este nombre de usuario ya está en uso";
      }
      return true;
    } catch (error) {
      console.error("Error al validar username:", error);
      return true; // Permitir continuar en caso de error
    }
  };

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(null);

      // Validar username único
      const usernameValidation = await validateUsername(values.username);
      if (usernameValidation !== true) {
        setError(usernameValidation);
        return;
      }

      // Usar el hook de autenticación para registrar
      const result = await register({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        username: values.username,
      });

      // Verificar si se requiere confirmación de email
      if (result.requiresEmailConfirmation) {
        setEmailConfirmation(true);
        setSignupSuccess(true);
        return;
      }

      // Mostrar mensaje de éxito
      setSignupSuccess(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error durante el registro";
      setError(errorMessage);
      console.error("Error al registrar:", error);
    }
  }

  // Si el registro fue exitoso, mostrar el componente de éxito
  if (signupSuccess) {
    return (
      <AuthSuccess
        message={
          emailConfirmation
            ? "¡Revisa tu correo electrónico!"
            : "¡Registro exitoso!"
        }
        redirectTo={emailConfirmation ? "/login" : "/dashboard"}
        redirectDelay={emailConfirmation ? 5000 : 2000}
      >
        {emailConfirmation && (
          <p className="text-center text-sm text-gray-600 mt-2">
            Hemos enviado un enlace de confirmación a tu correo electrónico.
            Debes confirmar tu cuenta antes de iniciar sesión.
          </p>
        )}
      </AuthSuccess>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center flex flex-col items-center">
        <Image
          src="/assets/LOGO.png"
          alt="Logo"
          width={200}
          height={200}
          priority
          className="brightness-0 invert"
        />
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Crear una cuenta
        </h1>
        <p className="text-sm text-white font-light">
          Completa el formulario para unirte a PRO
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-md text-red-800 text-sm">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Pérez"
                    {...field}
                    className="text-white placeholder:text-white/50 active:border-cyan-500 active:shadow-purple-500 focus-visible:border-cyan-500 focus-visible:shadow-purple-500 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="juanito"
                    {...field}
                    className="text-white placeholder:text-white/50 active:border-cyan-500 active:shadow-purple-500 focus-visible:border-cyan-500 focus-visible:shadow-purple-500 focus-visible:ring-0"
                  />
                </FormControl>
                <FormDescription className="text-white font-light text-sm">
                  Tu nombre de usuario único en la plataforma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    className="text-white placeholder:text-white/50 active:border-cyan-500 active:shadow-purple-500 focus-visible:border-cyan-500 focus-visible:shadow-purple-500 focus-visible:ring-0"
                  />
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
                <FormLabel className="text-white">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="********"
                    className="text-white placeholder:text-white/50 active:border-cyan-500 active:shadow-purple-500 focus-visible:border-cyan-500 focus-visible:shadow-purple-500 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Confirmar contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="text-white placeholder:text-white/50 active:border-cyan-500 active:shadow-purple-500 focus-visible:border-cyan-500 focus-visible:shadow-purple-500 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-white">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
