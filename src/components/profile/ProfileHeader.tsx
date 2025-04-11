"use client";

// import Link from 'next/link'; // No necesario
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Usar para el botón de retroceso

interface ProfileHeaderProps {
  title: string;
  backHref?: string; // Opcional: si queremos ir a una ruta específica
}

export function ProfileHeader({ title, backHref }: ProfileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back(); // Navegación simple hacia atrás
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3  ml-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        aria-label="Volver"
      >
        <ArrowLeft className="h-5 w-5" /> <span>{title}</span>
      </Button>
      {/*   <h1 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1> */}
      {/* Placeholder div to balance the flex layout */}
      <div className="w-10"></div>
    </header>
  );
}
