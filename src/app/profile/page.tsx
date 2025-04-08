"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiService } from "@/lib/api";

// Esquema para validación de formulario
const profileSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido").optional(),
});

export default function ProfilePage() {
  const { user, refreshUserData, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    try {
      setIsSaving(true);
      setMessage(null);

      // Verificar si el username cambió y ya existe
      if (data.username !== user?.username) {
        const exists = await apiService.profiles.checkUsername(data.username);
        if (exists) {
          setMessage({
            type: "error",
            text: "Este nombre de usuario ya está en uso",
          });
          return;
        }
      }

      // Actualizar perfil
      await apiService.profiles.updateProfile({
        fullName: data.fullName,
        username: data.username,
      });

      // Actualizar datos de sesión
      await refreshUserData();

      setMessage({
        type: "success",
        text: "Perfil actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setMessage({
        type: "error",
        text: "Error al actualizar el perfil. Inténtalo de nuevo.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`p-3 rounded-md mb-4 ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
