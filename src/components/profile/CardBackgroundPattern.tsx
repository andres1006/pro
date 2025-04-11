import React from "react";

export function CardBackgroundPattern() {
  return (
    <div
      className="absolute inset-0 z-1 overflow-hidden rounded-lg"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-250/5 via-purple-300/15 to-cyan-400/25 opacity-80 dark:from-indigo-950 dark:via-gray-900 dark:to-cyan-900" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.01),rgba(255,255,255,0.01)_1px,transparent_1px,transparent_15px)] opacity-50" />
    </div>
  );
}
