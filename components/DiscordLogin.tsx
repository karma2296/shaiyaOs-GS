
import React, { useState } from 'react';
import { DiscordUser } from '../types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface DiscordLoginProps {
  onLogin: (user: DiscordUser) => void;
  onBack: () => void;
}

const DiscordLogin: React.FC<DiscordLoginProps> = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const isConfigured = isSupabaseConfigured();

  const handleLoginAction = async () => {
    setLoading(true);
    
    if (isConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          // Asegura que Discord regrese a la raíz de tu sitio
          redirectTo: window.location.origin
        }
      });

      if (error) {
        console.error("OAuth error:", error);
        alert("Discord connection failed. Entering simulation mode.");
        runSimulation();
      }
      // Si funciona, el navegador se redirigirá fuera de aquí
    } else {
      runSimulation();
    }
  };

  const runSimulation = () => {
    setTimeout(() => {
      onLogin({
        id: Math.random().toString(36).substring(7),
        username: "Champion_" + Math.random().toString(36).substring(2, 6),
        discriminator: Math.floor(1000 + Math.random() * 9000).toString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto w-full glass-morphism p-10 rounded-none border-t-2 border-t-[#c5a059] text-center shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <div className="w-20 h-20 bg-[#5865F2] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(88,101,242,0.4)] animate-pulse">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
          <path d="M19.27 4.57c-1.3-.6-2.7-.94-4.13-1a.06.06 0 0 0-.06.03c-.18.33-.38.74-.5 1.12-1.47-.22-2.93-.22-4.36 0-.12-.38-.32-.79-.5-1.12a.06.06 0 0 0-.06-.03c-1.44.06-2.83.4-4.14 1a.06.06 0 0 0-.03.02C2.8 8.55 2.03 12.44 2.37 16.27c0 .02.01.04.03.05a16.2 16.2 0 0 0 4.96 2.5.06.06 0 0 0 .07-.02c.39-.53.74-1.1 1.04-1.7.02-.04 0-.08-.04-.1-1.62-.61-3.21-1.39-4.71-2.31a.06.06 0 0 1-.01-.1c.31-.23.63-.48.92-.73a.06.06 0 0 1 .06-.01c3.1 1.42 6.44 1.42 9.5 0a.06.06 0 0 1 .06.01c.29.25.61.5.92.73a.06.06 0 0 1-.01.1c-1.5.92-3.09 1.7-4.71 2.31a.06.06 0 0 0-.04.1c.3.6.65 1.17 1.04 1.7.02.04.05.06.07.02a16.2 16.2 0 0 0 4.96-2.5.06.06 0 0 0 .03-.05c.4-4.33-.66-8.15-2.73-11.7a.06.06 0 0 0-.03-.02zm-10.29 9.3c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92zm6.04 0c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92z"/>
        </svg>
      </div>
      
      <h2 className="text-2xl font-fantasy gold-text mb-4 uppercase tracking-[0.2em]">Council Verification</h2>
      
      {!isConfigured && (
        <div className="bg-amber-900/20 border border-amber-900/50 p-3 mb-6 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-[10px] text-amber-200 uppercase font-gothic tracking-widest text-left">
            Environment keys missing. Running in <b>SIMULATION MODE</b>.
          </p>
        </div>
      )}

      <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed max-w-xs mx-auto">
        {isConfigured 
          ? "Establish a secure link with the Discord Archives to prove your identity."
          : "Configuration incomplete. A simulated identity will be assigned for testing."}
      </p>
      
      <div className="space-y-4">
        <button
          onClick={handleLoginAction}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-50 font-gothic text-sm shadow-xl active:scale-95"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            isConfigured ? "Connect with Discord" : "Start Simulation"
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
