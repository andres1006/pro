"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditProfileFormValues,
  editProfileSchema,
} from "@/lib/validators/edit-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AttributeEditor } from "@/components/profile/AttributeEditor"; // Reutilizar si es compatible o crear uno nuevo
// import { useAuth } from "@/hooks/useAuth"; // Para obtener datos iniciales
// Asume que tienes una función para guardar (ej: Server Action o API call)
// import { updateProfileAction } from '@/actions/profile';

// Nombres de los atributos (deben coincidir con el schema)
const statNames = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physicality",
] as const;

// Valores por defecto simulados (reemplazar con datos reales)
const defaultProfileData = {
  name: "JOHN DOE",
  age: 22,
  height: 180,
  weight: 75,
  position: "Forward" as const,
  preferredFoot: "Right" as const,
  stats: {
    pace: 84,
    shooting: 83,
    passing: 76,
    dribbling: 88,
    defending: 49,
    physicality: 79,
  },
};

export function EditProfileForm() {
  // const { user } = useAuth(); // Quitar si no se usa para cargar datos
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Configuración de react-hook-form
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    // Cargar valores por defecto (idealmente desde 'user' o API)
    defaultValues: defaultProfileData,
  });

  // Efecto para cargar datos del usuario si existen (comentado por ahora)
  /*
  useEffect(() => {
    if (user?.profile) { 
      form.reset(user.profile);
    }
  }, [user, form]);
  */

  // Función para manejar el envío del formulario
  async function onSubmit(data: EditProfileFormValues) {
    setIsLoading(true);
    setErrorMessage(null);
    console.log("Datos del formulario:", data);
    try {
      // --- Aquí iría la lógica para guardar los datos ---
      // Ejemplo con Server Action (necesitarías crearla):
      // const result = await updateProfileAction(data);
      // if (result.error) throw new Error(result.error);

      // Simulación de guardado exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Perfil guardado (simulado)");
      // Podrías redirigir al perfil o mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido al guardar."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del jugador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fila Age & Height */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="22" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="180" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fila Weight & Position */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="75" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona posición" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Forward">Forward (ST)</SelectItem>
                    <SelectItem value="Midfielder">Midfielder (CM)</SelectItem>
                    <SelectItem value="Defender">Defender (CB)</SelectItem>
                    <SelectItem value="Goalkeeper">Goalkeeper (GK)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Campo Preferred Foot */}
        <FormField
          control={form.control}
          name="preferredFoot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Foot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona pie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Right">Right</SelectItem>
                  <SelectItem value="Left">Left</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-8" />

        {/* Sección de Atributos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Attributes</h3>
          {statNames.map((statName) => (
            <AttributeEditor<EditProfileFormValues> // Especificar el tipo del formulario
              key={statName}
              control={form.control}
              name={`stats.${statName}`} // Nombre anidado para el atributo
              label={statName} // Etiqueta visible
              useSlider={true} // Usar slider
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        {/* Botón Guardar */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-lg mt-8"
        >
          {isLoading ? "Saving..." : "SAVE CHANGES"}
        </Button>
      </form>
    </Form>
  );
}
