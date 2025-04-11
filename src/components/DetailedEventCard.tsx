"use client"; // Necesario si los botones tendrán onClick handlers

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Route } from "lucide-react"; // O usar otros iconos si prefieres
import { cn } from "@/lib/utils"; // Para combinar clases condicionalmente

// --- Tipos de Props ---
interface Participant {
  id: string;
  avatarUrl: string;
  name?: string; // Opcional para fallback
}

export interface DetailedEventData {
  id: string;
  imageUrl: string;
  status: "ACTIVE" | "UPCOMING" | "FULL" | "CANCELLED" | string; // Permitir otros strings
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;
  sport: string;
  title: string;
  time: string;
  date: string;
  primaryLocation: string;
  secondaryLocation?: string; // Hacer opcional
  locationDescription?: string;
  participants: Participant[];
  totalParticipants: number;
}

interface DetailedEventCardProps {
  event: DetailedEventData;
  onJoinClick?: (eventId: string) => void;
  onDetailsClick?: (eventId: string) => void;
}
// ---------------------

// Helper para colores de status (púrpura para activo/upcoming)
const getStatusBadgeVariant = (status: string): string => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
    case "UPCOMING":
      return "bg-purple-600 hover:bg-purple-700";
    case "FULL":
      return "bg-yellow-600 hover:bg-yellow-700";
    case "CANCELLED":
      return "bg-red-600 hover:bg-red-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

// Helper para colores de nivel (azul para intermedio)
const getLevelBadgeVariant = (level: string): string => {
  switch (level.toUpperCase()) {
    case "INTERMEDIATE":
      return "bg-blue-600 hover:bg-blue-700";
    case "ADVANCED":
      return "bg-red-600 hover:bg-red-700";
    case "BEGINNER":
      return "bg-green-600 hover:bg-green-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

export function DetailedEventCard({
  event,
  onJoinClick,
  onDetailsClick,
}: DetailedEventCardProps) {
  const MAX_VISIBLE_AVATARS = 3;
  const remainingParticipants = event.totalParticipants - MAX_VISIBLE_AVATARS;

  return (
    <Card className="overflow-hidden bg-card border border-border shadow-lg card dashboard-event-card">
      {" "}
      {/* Añadir clases para animación si es necesario */}
      {/* Sección Imagen con Badges */}
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        {/* Contenedor de Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-start items-start gap-1 pointer-events-none">
          {/* Badge 1: Status (Púrpura) */}
          <Badge
            variant="default"
            className={cn(
              "pointer-events-auto text-white text-xs font-semibold",
              getStatusBadgeVariant(event.status)
            )}
          >
            {event.status}
          </Badge>
          {/* Badge 2: Level (Azul) */}
          <Badge
            variant="default"
            className={cn(
              "pointer-events-auto text-white text-xs font-semibold",
              getLevelBadgeVariant(event.level)
            )}
          >
            {event.level}
          </Badge>
          {/* Badge 3: Sport (Gris/Secundario) */}
          <Badge
            variant="secondary" // Usar variante secundaria para gris/tema
            className="pointer-events-auto text-secondary-foreground text-xs font-semibold"
          >
            {event.sport}
          </Badge>
        </div>
      </div>
      {/* Sección Contenido */}
      <CardContent className="p-4 space-y-4">
        {/* Fila Título y Fecha/Hora */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-semibold text-foreground flex-grow break-words">
            {event.title}
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="text-md font-medium text-foreground">{event.time}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
        </div>

        {/* Detalles de Ubicación */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{event.primaryLocation}</span>
          </div>
          {event.secondaryLocation && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Route className="h-4 w-4 flex-shrink-0 text-primary/70" />{" "}
              {/* Icono diferente o mismo */}
              <span>{event.secondaryLocation}</span>
            </div>
          )}
          {event.locationDescription && (
            <p className="text-xs text-muted-foreground/80 pl-6">
              {/* Sangría o sin icono */}
              {event.locationDescription}
            </p>
          )}
        </div>

        {/* Fila Participantes */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
            {event.participants.slice(0, MAX_VISIBLE_AVATARS).map((p) => (
              <Avatar
                key={p.id}
                className="h-8 w-8 border-2 border-background shadow"
              >
                <AvatarImage src={p.avatarUrl} alt={p.name || "Participant"} />
                <AvatarFallback className="text-xs">
                  {p.name?.charAt(0) || "P"}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {remainingParticipants > 0 && (
            <div className="text-xs font-medium text-muted-foreground">
              +{remainingParticipants}
            </div>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Botón JOIN (Púrpura) */}
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={() => onJoinClick && onJoinClick(event.id)}
          >
            JOIN
          </Button>
          {/* Botón View Details (Outline Azul) */}
          <Button
            className="flex-1 text-white bg-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-600  dark:bg-cyan-500 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-300"
            onClick={() => onDetailsClick && onDetailsClick(event.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
