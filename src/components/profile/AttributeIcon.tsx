import React from "react";
import { Award, Dribbble, Target, ShieldQuestion, Star } from "lucide-react"; // Iconos de ejemplo

interface AttributeIconProps {
  type:
    | "skill"
    | "weakFoot"
    | "rating"
    | "other"
    | "shooting"
    | "dribble"
    | "passing"; // Tipos de ejemplo
  label?: string; // Texto opcional (ej: "2-1 V")
}

const icons = {
  skill: Award,
  weakFoot: Star,
  rating: Target,
  dribble: Dribbble, // Ejemplo específico
  shooting: Target, // Ejemplo específico
  passing: ShieldQuestion, // Placeholder
  other: ShieldQuestion, // Placeholder
};

export function AttributeIcon({ type, label }: AttributeIconProps) {
  // Ajusta el tipo si es necesario para mapear a iconos específicos si los defines arriba
  const IconComponent = icons[type] || icons.other;

  return (
    <div className="flex flex-col items-center text-center text-gray-400">
      <IconComponent className="h-6 w-6 mb-1" />
      {label && (
        <span className="text-xs uppercase tracking-wider">{label}</span>
      )}
    </div>
  );
}
