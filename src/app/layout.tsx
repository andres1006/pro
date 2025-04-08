import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRO - Plataforma para Deportistas",
  description:
    "Plataforma para organizar partidos, formar equipos y seguir estadísticas deportivas",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/LOGO.png",
    apple: "/assets/LOGO.png",
  },
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
