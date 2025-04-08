import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MainNav } from "@/components/navigation/MainNav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <MainNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </ProtectedRoute>
  );
}
