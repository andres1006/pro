"use client";

import React, { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react"; // Icono para limpiar

// Opciones de ejemplo (deberían venir de una fuente de datos o constantes)
const sportOptions = ["Soccer", "Basketball", "Volleyball", "Tennis"];
const levelOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const distanceOptions = [
  { value: "5", label: "< 5 km" },
  { value: "10", label: "< 10 km" },
  { value: "25", label: "< 25 km" },
  { value: "any", label: "Any Distance" },
];

export function EventFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estado local para cada filtro, inicializado desde searchParams
  const [selectedSport, setSelectedSport] = useState(
    searchParams.get("sport") || ""
  );
  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("level") || ""
  );
  const [maxDistance, setMaxDistance] = useState(
    searchParams.get("distance") || "any"
  );
  const [showAvailableOnly, setShowAvailableOnly] = useState(
    searchParams.get("available") === "true"
  );
  // Nota: El filtro de fecha se omite por simplicidad inicial, pero se añadiría aquí.

  // Función para crear y actualizar la query string
  const updateQueryParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries())); // Clonar params actuales

      // Actualizar o eliminar parámetros
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "" || value === "any") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";
      // Usar replace para no añadir al historial del navegador por cada cambio de filtro
      router.replace(`${pathname}${query}`);
    },
    [searchParams, pathname, router]
  );

  // Handlers para actualizar estado y URL al cambiar filtros
  const handleFilterChange = (
    filterName: string,
    value: string | boolean | null
  ) => {
    let processedValue: string | null;
    if (typeof value === "boolean") {
      processedValue = value ? "true" : null; // Eliminar param si es false
    } else {
      processedValue = value; // Mantener string o null/empty/any
    }

    // Actualizar estado local (ejemplo para sport, similar para otros)
    if (filterName === "sport")
      setSelectedSport(typeof value === "string" ? value : "");
    if (filterName === "level")
      setSelectedLevel(typeof value === "string" ? value : "");
    if (filterName === "distance")
      setMaxDistance(typeof value === "string" ? value : "any");
    if (filterName === "available")
      setShowAvailableOnly(typeof value === "boolean" ? value : false);

    // Actualizar URL
    updateQueryParams({ [filterName]: processedValue });
  };

  const clearFilters = useCallback(() => {
    setSelectedSport("");
    setSelectedLevel("");
    setMaxDistance("any");
    setShowAvailableOnly(false);
    router.replace(pathname); // Navegar a la URL sin parámetros
  }, [pathname, router]);

  // Determinar si hay filtros activos para mostrar el botón de limpiar
  const hasActiveFilters =
    !!selectedSport ||
    !!selectedLevel ||
    maxDistance !== "any" ||
    showAvailableOnly;

  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-lg shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        {/* Filtro Deporte */}
        <div className="space-y-1">
          <Label htmlFor="sport-filter" className="text-xs font-medium">
            Sport
          </Label>
          <Select
            value={selectedSport}
            onValueChange={(value) =>
              handleFilterChange("sport", value === "all" ? "" : value)
            }
            name="sport-filter"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {sportOptions.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro Nivel */}
        <div className="space-y-1">
          <Label htmlFor="level-filter" className="text-xs font-medium">
            Level
          </Label>
          <Select
            value={selectedLevel}
            onValueChange={(value) =>
              handleFilterChange("level", value === "all" ? "" : value)
            }
            name="level-filter"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levelOptions.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro Distancia */}
        <div className="space-y-1">
          <Label htmlFor="distance-filter" className="text-xs font-medium">
            Distance
          </Label>
          <Select
            value={maxDistance}
            onValueChange={(value) => handleFilterChange("distance", value)}
            name="distance-filter"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Distance" />
            </SelectTrigger>
            <SelectContent>
              {distanceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro Disponibilidad */}
        <div className="flex items-center space-x-2 pt-5">
          {" "}
          {/* pt-5 para alinear con botones */}
          <Checkbox
            id="availability-filter"
            checked={showAvailableOnly}
            onCheckedChange={(checked: boolean) =>
              handleFilterChange("available", checked)
            }
          />
          <Label
            htmlFor="availability-filter"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Spots Available
          </Label>
        </div>

        {/* Botón Limpiar Filtros */}
        <div className="lg:col-start-5 flex justify-end">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
