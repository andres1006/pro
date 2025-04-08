import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRO - Plataforma de Registro Online",
  description: "Una plataforma para autenticación y gestión de usuarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <main className="w-screen flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
