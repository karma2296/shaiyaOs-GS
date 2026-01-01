
import { createClient } from '@supabase/supabase-js';

// Acceso directo a process.env para máxima fiabilidad en este entorno
const supabaseUrl = (process.env as any).SUPABASE_URL || '';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || '';

// Inicializamos el cliente.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => {
  // Verificación robusta de presencia de llaves
  return typeof supabaseUrl === 'string' && supabaseUrl.length > 10 && 
         typeof supabaseAnonKey === 'string' && supabaseAnonKey.length > 10;
};
