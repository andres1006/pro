"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";
export function TopNavbar() {
  const { data: session } = useSession();

  return (
    <header className="flex h-14 shrink-0 items-center backdrop-blur  bg-gradient-to-br from-purple-900/10 via-cyan-900/20 to-cyan-900/50">
      <div className="w-full flex items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link href="/dashboard" className="flex items-center space-x-2 ">
          <Image src="/assets/LOGO.png" alt="Logo" width={60} height={60} />
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-cyan-400">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-cyan-400">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full text-cyan-400"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Mi Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api/auth/signout">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
