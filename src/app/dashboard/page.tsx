"use client";

import { useAuth } from "@/hooks/useAuth";
import { QuickActions } from "@/components/dashboard/QuickActions";
import {
  DetailedEventCard,
  DetailedEventData,
} from "@/components/DetailedEventCard";
import { FeedCard } from "@/components/feed/FeedCard";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createTimeline } from "animejs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import Image from "next/image";

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
      { id: "p1", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p2", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p3", avatarUrl: "/assets/avatar-1.jpg" },
    ],
    totalParticipants: 8,
  },
  {
    id: "2",
    imageUrl: "/assets/soccer-player-kicking-ball-playing-football.jpg",
    title: "Intramural Game",
    status: "UPCOMING",
    level: "BEGINNER",
    sport: "Soccer",
    primaryLocation: "Cancha Sintetica El Prado",
    secondaryLocation: "Main Field, 1 km",
    time: "2:30 PM",
    date: "June 15",
    participants: [
      { id: "p4", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p5", avatarUrl: "/assets/avatar-1.jpg" },
    ],
    totalParticipants: 5,
  },
  {
    id: "3",
    imageUrl: "/assets/male-soccer-player-with-ball-grass-field.jpg",
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
      { id: "p6", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p7", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p8", avatarUrl: "/assets/avatar-1.jpg" },
      { id: "p9", avatarUrl: "/assets/avatar-1.jpg" },
    ],
    totalParticipants: 4,
  },
];

// Datos de ejemplo para el feed
const samplePosts = [
  {
    id: "1",
    author: {
      name: "Henry Gutiérrez",
      image: "/assets/avatar-1.jpg",
      username: "henrygutierrez",
    },
    content:
      "¡Gran entrenamiento hoy con el equipo! 💪⚽️ Preparándonos para el torneo del próximo mes.",
    images: [
      "/assets/soccer-player-kicking-ball-playing-football.jpg",
      "/assets/male-soccer-player-with-ball-grass-field.jpg",
      "/assets/sportsman-sitting-grass-holding-football-dusk.jpg",
    ],
    timestamp: "2h",
    likes: 24,
    comments: 5,
    location: "Manizales",
  },
  {
    id: "2",
    author: {
      name: "Camila Agudelo",
      image: "/assets/avatar-1.jpg",
      username: "camilaagudelo",
    },
    content: "Victoria en el partido de hoy! 🏆 Gracias a todos por el apoyo.",
    images: ["/assets/img-5.jpg"],
    timestamp: "4h",
    likes: 45,
    comments: 12,
  },
];

export default function DashboardPage() {
  const { isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Comprobar si hay filtros activos
  const activeFilterParams = ["sport", "level", "distance", "available"];
  const hasActiveFilters = activeFilterParams.some(
    (param) =>
      searchParams.has(param) &&
      searchParams.get(param) !== "any" &&
      searchParams.get(param) !== ""
  );

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

  const handleJoin = (eventId: string) => {
    console.log(`Joining event: ${eventId}`);
  };

  const handleViewDetails = (eventId: string) => {
    console.log(`Viewing details for event: ${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Image src="/assets/LOGO.png" alt="logo" width={300} height={300} />
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* QuickActions Component */}
      <QuickActions />

      {/* Feed Section */}
      <div className="space-y-4 px-4">
        {/* Filters Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Feed Deportivo</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {hasActiveFilters && !showFilters && (
              <Badge
                variant="destructive"
                className="ml-2 !rounded-full !px-1.5 !py-0.5 text-xs"
              >
                !
              </Badge>
            )}
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {samplePosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Events Feed */}
      <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleEvents.map((event) => (
          <DetailedEventCard
            key={event.id}
            event={event}
            onJoinClick={handleJoin}
            onDetailsClick={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
