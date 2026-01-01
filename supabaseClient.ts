
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  const env = (import.meta as any).env || {};
  const proc = (typeof process !== 'undefined' ? process.env : {}) as any;
  
  // En Vercel/Vite, las variables de cliente DEBEN empezar por VITE_
  return (
    env[`VITE_${key}`] || 
    proc[`VITE_${key}`] ||
    env[key] || 
    proc[key] ||
    ''
  );
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
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
