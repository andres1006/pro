"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Moon, Sun, Monitor, Bell, Globe, Languages } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div className="container space-y-6 py-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight text-[color:var(--color-primary)]">
          Configuración
        </h2>
        <p className="text-muted-foreground">
          Administra tus preferencias y configuración de la aplicación.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Configuración del Tema */}
        <Card className="border-[color:var(--color-secondary)]/20 bg-gradient-to-br from-[color:var(--color-primary)]/5 via-[color:var(--color-secondary)]/10 to-[color:var(--color-primary)]/20">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)]">
              Apariencia
            </CardTitle>
            <CardDescription>
              Personaliza cómo se ve PRO en tus dispositivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select
                value={theme}
                onValueChange={(value) =>
                  setTheme(value as "light" | "dark" | "system")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Claro</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Oscuro</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>Sistema</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Color de Acento</Label>
              <Select
                value={accentColor}
                onValueChange={(value) =>
                  setAccentColor(value as "cyan" | "purple" | "blue" | "green")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyan">Cyan</SelectItem>
                  <SelectItem value="purple">Púrpura</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                  <SelectItem value="green">Verde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card className="border-[color:var(--color-secondary)]/20 bg-gradient-to-br from-[color:var(--color-primary)]/5 via-[color:var(--color-secondary)]/10 to-[color:var(--color-primary)]/20">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)]">
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura cómo y cuándo quieres recibir notificaciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notificaciones Push
              </Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label
                htmlFor="email-notifications"
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Notificaciones por Email
              </Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Idioma */}
        <Card className="border-[color:var(--color-secondary)]/20 bg-gradient-to-br from-[color:var(--color-primary)]/5 via-[color:var(--color-secondary)]/10 to-[color:var(--color-primary)]/20">
          <CardHeader>
            <CardTitle className="text-[color:var(--color-primary)]">
              Idioma y Región
            </CardTitle>
            <CardDescription>
              Configura el idioma y las preferencias regionales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Idioma
              </Label>
              <Select defaultValue="es">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary)]/90">
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
