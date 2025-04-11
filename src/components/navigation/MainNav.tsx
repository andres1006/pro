"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Home, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
  { href: "/profile", label: "Profile", icon: User },
];

export function MainNav() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-6 py-3 bg-background border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl flex-shrink-0">
          <Image
            src="/assets/LOGO.png"
            alt="logo"
            width={80}
            height={40}
            className="h-auto"
          />
        </Link>
        <div className="hidden md:flex items-center gap-4">
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
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full cursor-pointer"
                aria-label="Opciones de usuario"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || "Usuario"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ThemeToggle />
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-red-500 hover:!text-red-600 flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant="outline" size="sm" disabled={isLoading}>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild size="sm" disabled={isLoading}>
              <Link href="/signup">Registrarse</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
