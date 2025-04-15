import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, PlusCircle, CalendarDays, User } from "lucide-react";

const navigationItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Inicio",
  },
  {
    href: "/create",
    icon: PlusCircle,
    label: "Crear",
  },
  {
    href: "/dashboard/events",
    icon: CalendarDays,
    label: "Eventos",
  },
  {
    href: "/profile",
    icon: User,
    label: "Perfil",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 backdrop-blur md:hidden bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-cyan-900/50">
      <div className="container h-full">
        <div className="grid h-full grid-cols-5">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
