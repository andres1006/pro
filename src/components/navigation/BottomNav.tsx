"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home }, // Feed principal
  { href: "/dashboard/events", label: "Events", icon: CalendarDays }, // Nueva ruta de eventos
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    // Barra fija inferior, solo visible en pantallas pequeñas (hasta md)
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-2 shadow-t-lg md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard" && pathname === "/dashboard") ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors duration-200 w-16 h-16",
                isActive
                  ? "text-primary" // Color activo
                  : "text-muted-foreground hover:text-foreground" // Color inactivo
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
