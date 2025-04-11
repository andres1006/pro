import React from "react";
// import Link from "next/link"; // No usado
import { PlayerProfileData } from "@/app/profile/page"; // Importar tipo
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; // Icono descarga
import { StatItemHorizontal } from "@/components/profile/StatItemHorizontal";
import { SkillBadge } from "@/components/profile/SkillBadge";
import { StarRatingDisplay } from "@/components/profile/StarRatingDisplay";
import { Separator } from "@/components/ui/separator";

interface PlayerDetailsDisplayProps {
  player: PlayerProfileData;
}

// Nombres de stats en el orden deseado
const statOrder: (keyof PlayerProfileData["stats"])[] = [
  "ritmo",
  "tiros",
  "pases",
  "regates",
  "defensa",
  "fisico",
];

export function PlayerDetailsDisplay({ player }: PlayerDetailsDisplayProps) {
  return (
    <div className="text-foreground space-y-8">
      {/* Sección Nombre y Datos Básicos */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-foreground">
              {player.firstName} {player.lastName}
            </h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
              <span>{player.height} cm</span>
              <span>{player.weight} kg</span>
              <span>{player.age} años</span>
              <span>Pie {player.preferredFoot}</span>
              <span>{player.league}</span>
            </div>
          </div>
          {/* Icono Descarga: usar text-muted-foreground y hover:text-foreground */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Sección Estadísticas */}
      <div>
        <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
          Estadísticas
        </h2>
        <div className="flex flex-wrap justify-around gap-y-4 gap-x-2">
          {statOrder.map((statKey) => (
            <StatItemHorizontal
              key={statKey}
              label={statKey}
              value={player.stats[statKey]}
            />
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Sección Habilidades */}
      <div>
        <h2 className="text-lg font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
          Habilidades
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          <div className="flex items-center space-x-3">
            {player.skills.map((skill, index) => (
              <SkillBadge key={index} iconName={skill.icon} />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Resistencia:</span>
            <StarRatingDisplay rating={player.stamina} />
          </div>
        </div>
      </div>

      {/* Botón Editar Perfil (el botón ya está en page.tsx) - Eliminar de aquí */}
      {/* 
      <div className="pt-4">
        <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-8" asChild>
          <Link href="/profile/edit">EDITAR PERFIL</Link>
        </Button>
      </div> 
      */}
    </div>
  );
}
