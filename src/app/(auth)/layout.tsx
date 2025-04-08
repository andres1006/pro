export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 via-violet-500 to-cyan-400">
      {/* agregar muchas lineas delagdas blancas */}

      <div className="relative w-full max-w-md mx-4 z-10">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          {children}
        </div>

        <p className="text-xs text-center mt-4 text-white/80">
          PRO - Plataforma de Registro Online
        </p>
      </div>
    </div>
  );
}
