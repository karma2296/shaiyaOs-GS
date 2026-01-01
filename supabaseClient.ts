
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  // Intenta obtener de process.env (Node/Vite/Webpack)
  if (typeof process !== 'undefined' && process.env && (process.env as any)[key]) {
    return (process.env as any)[key];
  }
  // Intenta obtener de import.meta.env (Vite moderno)
  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[key]) return metaEnv[key];
  } catch (e) {}
  
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Inicializamos el cliente. Si faltan las llaves, será null.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => {
  return !!supabase;
};
