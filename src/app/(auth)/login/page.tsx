import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Iniciar Sesión | PRO",
  description: "Inicia sesión en tu cuenta de PRO",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  // Comprobar si el usuario ya está autenticado
  const session = await getServerSession(authOptions);
  if (session) {
    // Si ya está autenticado, redirigir al dashboard o a la URL de callback
    redirect(searchParams.callbackUrl || "/dashboard");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <LoginForm />
    </div>
  );
}
