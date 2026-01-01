
import { createClient } from '@supabase/supabase-js';

// Intentamos obtener las variables de múltiples formas según el entorno
const getEnv = (key: string) => {
  return (process.env as any)[key] || '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Solo inicializamos si tenemos los datos, de lo contrario devolvemos null
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => {
  return !!supabase;
};
