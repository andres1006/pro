"use client";

import React from "react";
// Importar nuevos componentes (se crearán a continuación)
import { PlayerCardDisplay } from "@/components/profile/PlayerCardDisplay";
import { PlayerDetailsDisplay } from "@/components/profile/PlayerDetailsDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --- Mock Data (Basado en Declan Rice Card) ---
type StatName = "ritmo" | "tiros" | "pases" | "regates" | "defensa" | "fisico";

export interface PlayerProfileData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  rating: number;
  position: string;
  nationFlagUrl: string;
  clubLogoUrl: string; // Puede ser un placeholder
  height: number;
  weight: number;
  age: number;
  preferredFoot: "Derecho" | "Izquierdo";
  nationality: string;
  league: string;
  stats: Record<StatName, number>;
  skills: {
    icon: string; // Placeholder para nombre de icono o URL
    name?: string;
  }[];
  stamina: number; // Rating de resistencia (1-5)
}

const playerData: PlayerProfileData = {
  firstName: "DECLAN",
  lastName: "RICE",
  imageUrl: "/assets/declan_rice_placeholder.png", // Placeholder image
  rating: 103, // OVR de la imagen
  position: "MCD",
  nationFlagUrl: "/assets/flags/england.png", // Placeholder path
  clubLogoUrl: "/assets/clubs/arsenal.png", // Placeholder path
  height: 185,
  weight: 80,
  age: 26,
  preferredFoot: "Derecho",
  nationality: "Inglaterra",
  league: "Premier League",
  stats: {
    ritmo: 98,
    tiros: 83,
    pases: 95,
    regates: 102,
    defensa: 107,
    fisico: 104,
  },
  skills: [
    { icon: "running" }, // Placeholder icon names
    { icon: "shield" },
    { icon: "zap" },
    { icon: "star" },
  ],
  stamina: 4, // 4 estrellas de resistencia
};
// -----------------

export default function ProfilePage() {
  // Nota: Se eliminaron las animaciones anime.js anteriores.
  // Se pueden reintroducir más tarde si se desea.

  return (
    // Fondo gradiente general y layout principal
    <div className="min-h-screen dark:bg-gradient-to-br dark:from-teal-900 dark:via-gray-900 dark:to-purple-950 dark:text-white p-4 md:p-8">
      {/* Contenedor principal para alinear elementos */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Columna Izquierda: Tarjeta del Jugador */}
        <div className="w-full md:w-1/3 lg:w-[300px] flex-shrink-0">
          <PlayerCardDisplay player={playerData} />
        </div>

        {/* Columna Derecha: Detalles */}
        <div className="flex-grow">
          <PlayerDetailsDisplay player={playerData} />
        </div>

        {/* Botón Editar Perfil */}
        <div className="pt-4 fixed bottom-0 left-0 right-0 p-4">
          <Button
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold text-lg px-8"
            asChild
          >
            <Link href="/profile/edit">EDITAR PERFIL</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
