
import { createClient } from '@supabase/supabase-js';

// Helper to get environment variables across different environments
const getEnv = (key: string): string => {
  // Check browser process.env (Vite/CRA style)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  // Check window.process (some sandboxes)
  const windowProcess = (window as any).process;
  if (windowProcess && windowProcess.env && windowProcess.env[key]) {
    return windowProcess.env[key];
  }
  // Check import.meta.env (Vite native)
  const importMeta = (import.meta as any);
  if (importMeta && importMeta.env && importMeta.env[`VITE_${key}`]) {
    return importMeta.env[`VITE_${key}`];
  }
  
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// If keys are missing, we use placeholder strings to avoid immediate initialization crashes,
// but we'll check validity using isSupabaseConfigured() before making calls.
export const supabase = createClient(
  supabaseUrl || 'https://missing-url.supabase.co', 
  supabaseAnonKey || 'missing-key'
);

export const isSupabaseConfigured = () => {
  return !!supabaseUrl && 
         supabaseUrl.startsWith('https://') && 
         !!supabaseAnonKey && 
         supabaseAnonKey !== 'missing-key';
};
