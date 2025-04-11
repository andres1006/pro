import * as z from "zod";

// Nombres de los atributos para validación
const statNames = [
    'pace',
    'shooting',
    'passing',
    'dribbling',
    'defending',
    'physicality',
] as const;
type StatName = typeof statNames[number];

// Esquema para las estadísticas (objeto donde cada clave es un StatName)
const statsSchema = z.object(
    statNames.reduce((acc, statName) => {
        acc[statName] = z.coerce // Usar coerce para convertir string de input a número
            .number({ invalid_type_error: "Debe ser un número" })
            .min(1, "Mínimo 1")
            .max(99, "Máximo 99");
        return acc;
    }, {} as Record<StatName, z.ZodNumber>)
);

// Esquema principal del formulario de edición
export const editProfileSchema = z.object({
    name: z.string().min(2, "Nombre demasiado corto").max(50, "Nombre demasiado largo"),
    age: z.coerce.number().int().positive("Edad debe ser positiva").min(14, "Edad mínima 14").max(99, "Edad máxima 99"),
    height: z.coerce.number().int().positive("Altura debe ser positiva").min(100, "Altura mínima 100cm").max(250, "Altura máxima 250cm"),
    weight: z.coerce.number().positive("Peso debe ser positivo").min(30, "Peso mínimo 30kg").max(200, "Peso máximo 200kg"),
    position: z.enum(["Forward", "Midfielder", "Defender", "Goalkeeper"], {
        required_error: "Selecciona una posición",
    }),
    preferredFoot: z.enum(["Right", "Left"], {
        required_error: "Selecciona un pie preferido",
    }),
    stats: statsSchema, // Incluir el esquema de estadísticas
});

// Extraer el tipo inferido del esquema
export type EditProfileFormValues = z.infer<typeof editProfileSchema>; 