
import React, { useState } from 'react';
import { DiscordUser } from '../types';
import { supabase } from '../supabaseClient';

interface DiscordLoginProps {
  onLogin: (user: DiscordUser) => void;
  onBack: () => void;
}

const DiscordLogin: React.FC<DiscordLoginProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleLoginAction = async () => {
    if (!supabase) {
      alert("System Configuration Error: Supabase keys not detected in environment.");
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
      console.error("Discord Auth Error:", err);
      alert(`Error de conexión: ${err.message}`);
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
      
      <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed max-w-xs mx-auto">
        Conecta tu cuenta de Discord para verificar tu identidad ante el consejo de Shaiya OS.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={handleLoginAction}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-50 font-gothic text-sm shadow-xl active:scale-95 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Connect with Discord</span>
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
          Return to Gates
        </button>
      </div>
    </div>
  );
};

export default DiscordLogin;
