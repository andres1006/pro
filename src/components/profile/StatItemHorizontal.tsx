import React from "react";

interface StatItemHorizontalProps {
  label: string;
  value: number;
}

// Simplificar o ajustar la lógica de color si es necesario para el modo claro
const getStatColorClasses = (value: number): string => {
  if (value >= 100) return "text-cyan-500 dark:text-cyan-400";
  if (value >= 90) return "text-green-600 dark:text-green-400";
  if (value >= 80) return "text-yellow-600 dark:text-yellow-400";
  if (value >= 70) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-500";
};

export function StatItemHorizontal({ label, value }: StatItemHorizontalProps) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <span
        className={`text-3xl md:text-4xl font-bold mb-0.5 ${getStatColorClasses(
          value
        )}`}
      >
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
