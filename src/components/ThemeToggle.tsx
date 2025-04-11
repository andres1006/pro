"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <DropdownMenuLabel>Tema</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => setTheme("light")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Sun className="h-4 w-4" />
        <span>Claro</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("dark")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Moon className="h-4 w-4" />
        <span>Oscuro</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("system")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Monitor className="h-4 w-4" />
        <span>Sistema</span>
      </DropdownMenuItem>
    </>
  );
}
