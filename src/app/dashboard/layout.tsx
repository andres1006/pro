import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MainNav } from "@/components/navigation/MainNav";
import { BottomNav } from "@/components/navigation/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
