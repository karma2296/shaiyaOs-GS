
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured, getSafeEnv } from '../supabaseClient';

interface DiscordLoginProps {
  onBack: () => void;
}

const DiscordLogin: React.FC<DiscordLoginProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const configured = isSupabaseConfigured();

  const getCallbackUrl = () => {
    const url = getSafeEnv('SUPABASE_URL');
    if (!url || url.includes('placeholder')) return 'https://TU-PROYECTO.supabase.co/auth/v1/callback';
    return `${url}/auth/v1/callback`;
  };

  const handleLoginAction = async () => {
    if (!configured) {
      setShowHelp(true);
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
      
      if (error) throw error;
    } catch (err: any) {
      console.error("Auth error:", err);
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
          <p className="text-amber-400 text-xs font-bold uppercase mb-3">🛠️ Error detectado</p>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-4">
            Parece que falta configuración. Revisa esto:
          </p>
          <ol className="text-[10px] text-slate-300 space-y-3 list-decimal pl-4 font-gothic">
            <li><strong>Vercel:</strong> Renombra variables a <code className="text-amber-200">VITE_SUPABASE_URL</code> y haz Redeploy.</li>
            <li><strong>Discord Dev:</strong> Añade este Redirect URI:
              <div className="mt-2 p-2 bg-black/60 border border-amber-900/30 font-mono text-[9px] break-all select-all text-amber-200">
                {getCallbackUrl()}
              </div>
            </li>
          </ol>
          <button onClick={() => setShowHelp(false)} className="mt-6 w-full py-2 bg-amber-900/40 text-amber-100 text-[10px] uppercase font-bold">Entendido</button>
        </div>
      ) : (
        <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed max-w-xs mx-auto">
          Inicia sesión con Discord para que tu identidad quede vinculada oficialmente a tu solicitud de Game Sage.
        </p>
      )}
      
      <div className="space-y-4">
        <button
          onClick={handleLoginAction}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-30 font-gothic text-sm shadow-xl"
        >
          {loading ? "Connecting..." : "Login with Discord"}
        </button>
        <button onClick={onBack} className="w-full py-2 text-slate-600 hover:text-slate-400 text-[10px] uppercase tracking-[0.3em]">Cancelar</button>
      </div>
    </div>
  );
};

export default DiscordLogin;
