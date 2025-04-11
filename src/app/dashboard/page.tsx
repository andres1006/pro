"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import {
  DetailedEventCard,
  DetailedEventData,
} from "@/components/DetailedEventCard";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createTimeline } from "animejs";
import { EventFilters } from "@/components/EventFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

const sampleEvents: DetailedEventData[] = [
  {
    id: "1",
    imageUrl: "/assets/img-5.jpg",
    title: "Pickup Match",
    status: "ACTIVE",
    level: "INTERMEDIATE",
    sport: "Soccer",
    primaryLocation: "Greenwood Park",
    secondaryLocation: "Field 3, 3 mi",
    locationDescription: "Entrada por la calle Elm, cerca del área de juegos.",
    time: "6:00 PM",
    date: "June 12",
    participants: [
      { id: "p1", avatarUrl: "/assets/avatars/avatar-1.png" },
      { id: "p2", avatarUrl: "/assets/avatars/avatar-2.png" },
      { id: "p3", avatarUrl: "/assets/avatars/avatar-3.png" },
    ],
    totalParticipants: 8,
  },
  {
    id: "2",
    imageUrl: "/assets/intramural-game.jpg",
    title: "Intramural Game",
    status: "UPCOMING",
    level: "BEGINNER",
    sport: "Soccer",
    primaryLocation: "Cancha Sintetica El Prado",
    secondaryLocation: "Main Field, 1 km",
    time: "2:30 PM",
    date: "June 15",
    participants: [
      { id: "p4", avatarUrl: "/assets/avatars/avatar-4.png" },
      { id: "p5", avatarUrl: "/assets/avatars/avatar-5.png" },
    ],
    totalParticipants: 5,
  },
  {
    id: "3",
    imageUrl: "/assets/basketball-court.jpg",
    title: "Partido de Baloncesto 3v3",
    status: "ACTIVE",
    level: "ADVANCED",
    sport: "Basketball",
    primaryLocation: "Parque Central",
    secondaryLocation: "Cancha #1, 5 km",
    locationDescription: "Traer balón propio.",
    time: "10:00 AM",
    date: "June 16",
    participants: [
      { id: "p6", avatarUrl: "/assets/avatars/avatar-1.png" },
      { id: "p7", avatarUrl: "/assets/avatars/avatar-2.png" },
      { id: "p8", avatarUrl: "/assets/avatars/avatar-3.png" },
      { id: "p9", avatarUrl: "/assets/avatars/avatar-4.png" },
    ],
    totalParticipants: 4,
  },
];

export default function DashboardPage(/* { searchParams } */) {
  // --- Lógica de Filtrado (Conceptual - Debería hacerse en Server Component o API) ---
  /* 
  // Extraer filtros de searchParams
  const sportFilter = searchParams?.sport;
  const levelFilter = searchParams?.level;
  const distanceFilter = searchParams?.distance;
  const availableFilter = searchParams?.available === 'true';

  // Cargar datos INICIALES ya filtrados desde el servidor/API
  // const events = await fetchFilteredEvents({ 
  //   sport: sportFilter,
  //   level: levelFilter,
  //   maxDistance: distanceFilter,
  //   availableOnly: availableFilter
  // }); 
  */

  // Mantener datos de ejemplo por ahora para visualización
  const events = sampleEvents;
  // -----------------------------------------------------------------------------------

  // --- Lógica del Cliente (useAuth, Animaciones) ---
  const { isLoading } = useAuth(); // Mantenido si es necesario en cliente
  const searchParams = useSearchParams(); // Hook para leer params
  const [showFilters, setShowFilters] = useState(false); // Estado para visibilidad

  // --- Comprobar si hay filtros activos en la URL ---
  const activeFilterParams = ["sport", "level", "distance", "available"]; // Parámetros a comprobar
  const hasActiveFilters = activeFilterParams.some(
    (param) =>
      searchParams.has(param) &&
      searchParams.get(param) !== "any" &&
      searchParams.get(param) !== ""
  );
  // -------------------------------------------------

  useEffect(() => {
    const timeline = createTimeline({
      defaults: {
        duration: 600,
      },
    });

    timeline.add(".dashboard-event-card .card", {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.98, 1],
      delay: 100,
      easing: "easeOutExpo",
    });

    return () => {
      // Limpieza comentada ya que 'remove' no se exporta directamente
      // animeRemove('.dashboard-event-card .card');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Image src="/assets/LOGO.png" alt="logo" width={400} height={400} />
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary "></div>
      </div>
    );
  }

  const handleJoin = (eventId: string) => {
    console.log(`Joining event: ${eventId}`);
  };

  const handleViewDetails = (eventId: string) => {
    console.log(`Viewing details for event: ${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Contenedor para título y botón de filtros */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Próximos Eventos</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {/* Indicador de filtros activos */}
          {hasActiveFilters && !showFilters && (
            <Badge
              variant="destructive"
              className="ml-2 !px-1.5 !py-0.5 rounded-full text-xs"
            >
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Renderizado condicional de filtros */}
      {showFilters && <EventFilters />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {" "}
        {/* Añadir margen superior si los filtros están ocultos */}
        {events.map((event) => (
          <div key={event.id} className="dashboard-event-card">
            <DetailedEventCard
              event={event}
              onJoinClick={handleJoin}
              onDetailsClick={handleViewDetails}
            />
          </div>
        ))}
        {events.length === 0 && !isLoading && (
          <p className="text-muted-foreground col-span-full text-center py-10">
            No events match the current filters.
          </p>
        )}
      </div>
    </div>
  );
}
