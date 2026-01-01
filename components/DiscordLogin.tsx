
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface DiscordLoginProps {
  onBack: () => void;
}

const DiscordLogin: React.FC<DiscordLoginProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const configured = isSupabaseConfigured();

  // Función para construir la URL de callback probable de Supabase
  const getCallbackUrl = () => {
    const env = (import.meta as any).env || {};
    const url = env.VITE_SUPABASE_URL || '';
    if (!url || url.includes('placeholder')) return 'https://TU_PROYECTO.supabase.co/auth/v1/callback';
    return `${url}/auth/v1/callback`;
  };

  const handleLoginAction = async () => {
    if (!configured) {
      alert("⚠️ Error: Configura primero las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: window.location.origin,
          scopes: 'identify email'
        }
      });
      
      if (error) {
        console.error("Auth error:", error);
        setShowHelp(true);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Critical Auth Error:", err);
      setShowHelp(true);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full glass-morphism p-10 rounded-none border-t-2 border-t-[#c5a059] text-center shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <div className="w-20 h-20 bg-[#5865F2] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(88,101,242,0.4)]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
          <path d="M19.27 4.57c-1.3-.6-2.7-.94-4.13-1a.06.06 0 0 0-.06.03c-.18.33-.38.74-.5 1.12-1.47-.22-2.93-.22-4.36 0-.12-.38-.32-.79-.5-1.12a.06.06 0 0 0-.06-.03c-1.44.06-2.83.4-4.14 1a.06.06 0 0 0-.03.02C2.8 8.55 2.03 12.44 2.37 16.27c0 .02.01.04.03.05a16.2 16.2 0 0 0 4.96 2.5.06.06 0 0 0 .07-.02c.39-.53.74-1.1 1.04-1.7.02-.04 0-.08-.04-.1-1.62-.61-3.21-1.39-4.71-2.31a.06.06 0 0 1-.01-.1c.31-.23.63-.48.92-.73a.06.06 0 0 1 .06-.01c3.1 1.42 6.44 1.42 9.5 0a.06.06 0 0 1 .06.01c.29.25.61.5.92.73a.06.06 0 0 1-.01.1c-1.5.92-3.09 1.7-4.71 2.31a.06.06 0 0 0-.04.1c.3.6.65 1.17 1.04 1.7.02.04.05.06.07.02a16.2 16.2 0 0 0 4.96-2.5.06.06 0 0 0 .03-.05c.4-4.33-.66-8.15-2.73-11.7a.06.06 0 0 0-.03-.02zm-10.29 9.3c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0-1.06-.74 1.92-1.7 1.92zm6.04 0c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0-1.06-.74 1.92-1.7 1.92z"/>
        </svg>
      </div>
      
      <h2 className="text-2xl font-fantasy gold-text mb-4 uppercase tracking-[0.2em]">Council Verification</h2>
      
      {showHelp ? (
        <div className="bg-amber-900/20 border border-amber-900/50 p-5 mb-8 text-left">
          <p className="text-amber-400 text-xs font-bold uppercase mb-3">🛠️ Error de Redirección OAuth2</p>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-4">
            Discord rechaza la conexión porque la URL no está autorizada. Haz esto:
          </p>
          <ol className="text-[10px] text-slate-300 space-y-3 list-decimal pl-4 font-gothic">
            <li>Ve al <strong>Discord Developer Portal</strong> -> Tu App -> OAuth2.</li>
            <li>En <strong>Redirects</strong>, añade esta URL exactamente:
              <div className="mt-2 p-2 bg-black/60 border border-amber-900/30 font-mono text-[9px] break-all select-all text-amber-200">
                {getCallbackUrl()}
              </div>
            </li>
            <li>En <strong>Supabase Dashboard</strong> -> Authentication -> URL Configuration:
              <ul className="mt-1 list-disc pl-4 text-slate-400">
                <li>Site URL: <code className="text-slate-200">{window.location.origin}</code></li>
              </ul>
            </li>
          </ol>
          <button 
            onClick={() => setShowHelp(false)}
            className="mt-6 w-full py-2 bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 text-[10px] uppercase tracking-widest font-bold transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : !configured ? (
        <div className="bg-red-900/20 border border-red-900/50 p-4 mb-8 text-left">
          <p className="text-red-400 text-xs font-bold uppercase mb-2">⚠️ Error de Configuración</p>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-4">
            Asegúrate de renombrar las variables en Vercel con el prefijo <strong>VITE_</strong>.
          </p>
          <ul className="text-[9px] text-slate-500 space-y-1 font-mono">
            <li>1. <span className="text-slate-300">VITE_SUPABASE_URL</span></li>
            <li>2. <span className="text-slate-300">VITE_SUPABASE_ANON_KEY</span></li>
            <li>3. Pulsa <strong>Redeploy</strong> en Vercel.</li>
          </ul>
        </div>
      ) : (
        <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed max-w-xs mx-auto">
          Verifica tu identidad mediante los archivos de Discord para acceder a los pergaminos de reclutamiento.
        </p>
      )}
      
      <div className="space-y-4">
        <button
          onClick={handleLoginAction}
          disabled={loading || !configured}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-30 disabled:grayscale font-gothic text-sm shadow-xl active:scale-95 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{configured ? 'Login with Discord' : 'System Locked'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-2 text-slate-600 hover:text-slate-400 transition-colors text-[10px] uppercase tracking-[0.3em] font-gothic"
        >
          Abort Authentication
        </button>
      </div>
    </div>
  );
};

export default DiscordLogin;
