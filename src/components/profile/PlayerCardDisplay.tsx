import React from "react";
import Image from "next/image";
import { PlayerProfileData } from "@/app/profile/page"; // Importar el tipo

interface PlayerCardDisplayProps {
  player: PlayerProfileData;
}

export function PlayerCardDisplay({ player }: PlayerCardDisplayProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl 
                   bg-card dark:bg-gradient-to-b dark:from-purple-800 dark:via-indigo-900 dark:to-purple-900 
                   border border-border dark:border-2 dark:border-purple-600/50 
                   aspect-[3/4] p-4 flex flex-col justify-between text-card-foreground"
    >
      {/* Fondo sutil interior (solo oscuro o ajustar para claro) */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent opacity-50"></div>

      {/* Contenido de la tarjeta */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Sección Superior: Rating, Posición, Bandera, Club */}
        <div className="flex justify-between items-start mb-2">
          <div className="text-center">
            {/* Ajustar color de rating para contraste */}
            <div className="text-4xl font-bold text-primary dark:text-yellow-300">
              {player.rating}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {player.position}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Image
              src={player.nationFlagUrl}
              alt={player.nationality}
              width={36}
              height={24}
              className="rounded-sm shadow-md"
            />
            {/* Logo Club Placeholder */}
            <div className="w-8 h-8 rounded-full bg-muted dark:bg-gray-700/50 border border-border dark:border-gray-600 flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground dark:text-gray-400">
                CLB
              </span>
            </div>
          </div>
        </div>

        {/* Imagen del Jugador */}
        <div className="flex-grow flex items-center justify-center my-4">
          <Image
            src={player.imageUrl}
            alt={`${player.firstName} ${player.lastName}`}
            width={200}
            height={200}
            className="max-w-full h-auto object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Sección Inferior: Nombre y Stats Básicos */}
        <div className="text-center border-t border-border dark:border-purple-600/30 pt-3">
          <div className="text-2xl font-bold uppercase tracking-wider mb-2 text-foreground">
            {player.firstName}
          </div>
          {/* Usar text-muted-foreground para consistencia */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="text-left">{player.height} cm</span>
            <span className="text-right">{player.age} años</span>
            <span className="text-left">{player.weight} kg</span>
            <span className="text-right">Pie {player.preferredFoot}</span>
            <span className="text-left col-span-2">{player.nationality}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
