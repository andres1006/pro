import React from "react";
import { ShieldCheck, Footprints, Zap, Star } from "lucide-react";

interface SkillBadgeProps {
  iconName: string; // Placeholder para identificar el icono
}

// Usar un tipo adecuado para componentes React
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  running: Footprints,
  shield: ShieldCheck,
  zap: Zap,
  star: Star,
  default: ShieldCheck, // Icono por defecto
};

export function SkillBadge({ iconName }: SkillBadgeProps) {
  const IconComponent = iconMap[iconName.toLowerCase()] || iconMap.default;

  return (
    <div className="bg-primary/10 dark:bg-purple-900/50 border border-primary/20 dark:border-purple-700/60 rounded-full p-2 w-10 h-10 flex items-center justify-center">
      <IconComponent className="h-5 w-5 text-primary dark:text-purple-300" />
    </div>
  );
}
