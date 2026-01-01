
import { createClient } from '@supabase/supabase-js';

// Función para obtener variables de entorno con máxima compatibilidad
const getEnv = (key: string): string => {
  const env = (import.meta as any).env || {};
  const proc = (typeof process !== 'undefined' ? process.env : {}) as any;
  const win = (window as any).process?.env || {};

  return (
    proc[key] || 
    proc[`VITE_${key}`] || 
    proc[`NEXT_PUBLIC_${key}`] ||
    env[key] || 
    env[`VITE_${key}`] || 
    win[key] ||
    ''
  );
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Solo inicializamos si tenemos valores, de lo contrario usamos strings que indiquen el error
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-error.supabase.co',
  supabaseAnonKey || 'no-key-provided'
);

export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl && 
    supabaseUrl.includes('.supabase.co') && 
    !supabaseUrl.includes('placeholder-error') &&
    !!supabaseAnonKey &&
    supabaseAnonKey !== 'no-key-provided'
  );
};
