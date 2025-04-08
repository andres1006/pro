import { createClient } from '@supabase/supabase-js';

// Valores por defecto para debugging - REEMPLAZAR con tus valores reales en .env.local
const FALLBACK_URL = 'https://placeholder-url.supabase.co';
const FALLBACK_KEY = 'placeholder-anon-key';

// Diagnosticar problemas con las variables de entorno
const envDiagnostics = () => {
    if (typeof window !== 'undefined') {
        // Estamos en el navegador
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


        return { url, key };
    }

    return {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    };
};

// Obtener las variables de entorno o usar fallbacks
const getSupabaseCredentials = () => {
    const { url, key } = envDiagnostics();

    // Si no están disponibles, usar valores de fallback (sólo para desarrollo)
    return {
        url: url || FALLBACK_URL,
        key: key || FALLBACK_KEY
    };
};

// Crear y exportar una instancia del cliente de Supabase
const { url, key } = getSupabaseCredentials();
export const supabaseClient = createClient(url, key);

// Función para verificar la conexión con Supabase
export async function testSupabaseConnection() {
    try {
        const start = Date.now();

        const { error } = await supabaseClient.from('users').select('count', { count: 'exact', head: true });

        const elapsed = Date.now() - start;

        if (error) {
            console.error("Error en prueba de conexión:", error);
            return {
                success: false,
                message: `Error: ${error.message}`,
                elapsed
            };
        }

        return {
            success: true,
            message: `Conexión exitosa a ${url} (${elapsed}ms)`,
            elapsed
        };
    } catch (e) {
        console.error("Error al probar conexión:", e);
        return {
            success: false,
            message: e instanceof Error ? e.message : "Error desconocido",
            elapsed: 0
        };
    }
} 