import React from "react";
import { cn } from "@/lib/utils";

interface StatItemProps {
  label: string;
  value: number;
}

const getStatColor = (value: number): string => {
  if (value >= 85) return "text-green-400"; // Verde para alto
  if (value >= 70) return "text-yellow-400"; // Amarillo para medio
  if (value >= 50) return "text-orange-400"; // Naranja para bajo
  return "text-red-500"; // Rojo para muy bajo
};

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className={cn("text-2xl font-bold mb-1", getStatColor(value))}>
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider text-gray-400">
        {label}
      </span>
    </div>
  );
}
