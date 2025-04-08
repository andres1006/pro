# PRO - Plataforma para Deportistas

PRO es una plataforma web para deportistas amateur/semi-profesionales que simula la experiencia profesional con perfiles, estadísticas, equipos, retos y comunidad.

## Características Principales

- **Perfiles de Usuarios:** Crea tu perfil deportivo con estadísticas y posiciones
- **Equipos:** Crea o únete a equipos con otros jugadores
- **Retos:** Programa partidos amistosos contra otros equipos
- **Estadísticas:** Lleva un registro de tu rendimiento deportivo
- **Recintos Deportivos:** Encuentra lugares para jugar en tu ciudad

## Tecnologías

- **Frontend:** Next.js 15 (App Router), React 19
- **Autenticación:** NextAuth.js
- **Base de Datos:** Supabase
- **Estilos:** Tailwind CSS
- **Componentes:** shadcn/ui

## Empezando

### Requisitos Previos

- Node.js 18+
- npm o pnpm
- Una cuenta en Supabase

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/pro.git
   cd pro
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia el archivo de variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

4. Completa las variables de entorno en `.env.local` con tus credenciales de Supabase y NextAuth.

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
/src
├── app/                # Directorio principal del App Router
│   ├── (auth)/         # Rutas de autenticación
│   ├── (app)/          # Rutas principales de la aplicación
│   └── api/            # API Routes
├── components/         # Componentes React
├── lib/                # Utilidades y configuraciones
└── types/              # Tipos de TypeScript
```

## Contribuir

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y commits
4. Envía un pull request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
