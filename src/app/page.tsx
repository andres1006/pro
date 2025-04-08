import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          PRO
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          La plataforma para deportistas donde podrás organizar partidos,
          encontrar equipos y monitorear tu progreso.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button size="lg" className="px-8">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="px-8">
              Registrarse
            </Button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Qué ofrece PRO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Organiza Partidos</h3>
              <p className="text-gray-600">
                Crea desafíos, invita equipos y organiza encuentros deportivos
                fácilmente.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Forma Equipos</h3>
              <p className="text-gray-600">
                Crea tu equipo o únete a otros existentes. Coordina con tus
                compañeros.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">
                Seguimiento Estadístico
              </h3>
              <p className="text-gray-600">
                Lleva un control de tus partidos, victorias, derrotas y
                rendimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} PRO - Plataforma para Deportistas
          </p>
        </div>
      </footer>
    </div>
  );
}
