import { Button } from "@/components/ui/button";
import { PlusCircle, Trophy } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

export function QuickActions() {
  // Datos de ejemplo para el carrusel
  const upcomingEvents = [
    {
      id: 1,
      title: "Partido de Fútbol",
      time: "Hoy, 18:00",
      type: "match",
    },
    {
      id: 2,
      title: "Entrenamiento",
      time: "Mañana, 10:00",
      type: "training",
    },
    {
      id: 3,
      title: "Torneo Local",
      time: "Sábado, 15:00",
      type: "tournament",
    },
  ];

  return (
    <div className="space-y-4 py-4">
      {/* Sección de Acciones Rápidas */}
      <div className="flex gap-4 px-4">
        <Button className="flex-1 gap-2 bg-cyan-400 text-cyan-50 hover:bg-cyan-500/20">
          <PlusCircle className="h-4 w-4" />
          Crear Reto
        </Button>
        <Button
          variant="secondary"
          className="flex-1 gap-2 bg-cyan-400 text-cyan-50 hover:bg-cyan-500/20"
        >
          <Trophy className="h-4 w-4" />
          Registrar Resultado
        </Button>
      </div>

      {/* Carrusel Horizontal de Eventos Próximos */}
      <div className="relative">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex w-max space-x-4 p-4">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="w-[250px] shrink-0 bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-cyan-900/50"
              >
                <CardContent className="flex flex-col gap-2 p-4">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
