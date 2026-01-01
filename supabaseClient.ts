
import { createClient } from '@supabase/supabase-js';

// Función ultra-segura para obtener variables de entorno en cualquier navegador
export const getSafeEnv = (key: string): string => {
  try {
    // Intentar VITE_ primero (estándar de Vercel/Vite para cliente)
    const viteKey = `VITE_${key}`;
    
    // @ts-ignore
    const env = (import.meta as any).env || {};
    // @ts-ignore
    const proc = (typeof process !== 'undefined' ? process.env : {}) as any;

    return env[viteKey] || proc[viteKey] || env[key] || proc[key] || '';
  } catch (e) {
    return '';
  }
};

const supabaseUrl = getSafeEnv('SUPABASE_URL');
const supabaseAnonKey = getSafeEnv('SUPABASE_ANON_KEY');

// Cliente de Supabase con fallback para evitar errores de inicialización
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder') &&
    !!supabaseAnonKey &&
    supabaseAnonKey !== 'placeholder-key'
  );
};
