import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
