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
import { User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";

export function MainNav() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl">
          <Image src="/assets/LOGO.png" alt="logo" width={100} height={100} />
        </Link>
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
                <Avatar>
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
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 flex items-center gap-2"
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
