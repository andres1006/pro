import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider"; // Asumiendo que tienes Slider de shadcn

// Usar genéricos para mayor flexibilidad y tipado
interface AttributeEditorProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>; // Usar Path para nombres de campo seguros
  label: string;
  useSlider?: boolean;
}

export function AttributeEditor<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  useSlider = true,
}: AttributeEditorProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Extraer el valor numérico del campo (puede ser string inicialmente)
        const numericValue =
          typeof field.value === "number"
            ? field.value
            : parseFloat(field.value || "0");
        const sliderValue = isNaN(numericValue) ? 0 : numericValue;

        return (
          <FormItem>
            <div className="flex items-center justify-between mb-1">
              <FormLabel className="text-sm capitalize">{label}</FormLabel>
              <span className="text-sm font-semibold text-right w-10">
                {sliderValue}
              </span>
            </div>
            <FormControl>
              {useSlider ? (
                <Slider
                  min={1}
                  max={99}
                  step={1}
                  value={[sliderValue]} // Slider espera un array
                  onValueChange={(value: number[]) => field.onChange(value[0])} // Tomar el primer valor del array
                  className="cursor-pointer"
                  aria-label={label}
                />
              ) : (
                <Input
                  type="number"
                  min="1"
                  max="99"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value, 10) || 0)
                  } // Asegurar que se guarda como número
                  className="text-right"
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
