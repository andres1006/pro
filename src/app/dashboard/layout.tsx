import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TopNavbar } from "@/components/navigation/TopNavbar";
import { BottomNav } from "@/components/navigation/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">
        {/* Header fijo */}
        <TopNavbar />
        {/* Contenido principal con scroll */}
        <main className="flex-1 overflow-y-auto ">
          <div className=" py-4">{children}</div>
        </main>

        {/* Footer fijo en móvil */}
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
