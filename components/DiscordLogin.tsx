
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
        console.error("OAuth error:", err);
        alert(`Failed to connect to Discord: ${err.message || 'Check your Supabase Dashboard configuration.'}`);
        setLoading(false);
      }
    } else {
      // Si no está configurado, avisamos explícitamente antes de simular
      console.warn("Supabase keys not found. Running simulation.");
      runSimulation();
    }
  };

  const runSimulation = () => {
    setTimeout(() => {
      onLogin({
        id: "sim_" + Math.random().toString(36).substring(7),
        username: "Simulated_Hero",
        discriminator: "0000",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto w-full glass-morphism p-10 rounded-none border-t-2 border-t-[#c5a059] text-center shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <div className="w-20 h-20 bg-[#5865F2] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(88,101,242,0.4)]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
          <path d="M19.27 4.57c-1.3-.6-2.7-.94-4.13-1a.06.06 0 0 0-.06.03c-.18.33-.38.74-.5 1.12-1.47-.22-2.93-.22-4.36 0-.12-.38-.32-.79-.5-1.12a.06.06 0 0 0-.06-.03c-1.44.06-2.83.4-4.14 1a.06.06 0 0 0-.03.02C2.8 8.55 2.03 12.44 2.37 16.27c0 .02.01.04.03.05a16.2 16.2 0 0 0 4.96 2.5.06.06 0 0 0 .07-.02c.39-.53.74-1.1 1.04-1.7.02-.04 0-.08-.04-.1-1.62-.61-3.21-1.39-4.71-2.31a.06.06 0 0 1-.01-.1c.31-.23.63-.48.92-.73a.06.06 0 0 1 .06-.01c3.1 1.42 6.44 1.42 9.5 0a.06.06 0 0 1 .06.01c.29.25.61.5.92.73a.06.06 0 0 1-.01.1c-1.5.92-3.09 1.7-4.71 2.31a.06.06 0 0 0-.04.1c.3.6.65 1.17 1.04 1.7.02.04.05.06.07.02a16.2 16.2 0 0 0 4.96-2.5.06.06 0 0 0 .03-.05c.4-4.33-.66-8.15-2.73-11.7a.06.06 0 0 0-.03-.02zm-10.29 9.3c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92zm6.04 0c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92z"/>
        </svg>
      </div>
      
      <h2 className="text-2xl font-fantasy gold-text mb-4 uppercase tracking-[0.2em]">Council Verification</h2>
      
      {!isConfigured && (
        <div className="bg-red-900/20 border border-red-900/50 p-4 mb-6 text-left">
          <p className="text-[11px] text-red-200 uppercase font-bold mb-1">⚠️ Configuration Required</p>
          <p className="text-[10px] text-slate-400 font-gothic leading-tight">
            The portal is unable to find your Supabase keys. Please ensure <b>SUPABASE_URL</b> and <b>SUPABASE_ANON_KEY</b> are set in your environment variables.
          </p>
        </div>
      )}

      <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed max-w-xs mx-auto">
        {isConfigured 
          ? "Establish a secure link with the Discord Archives to verify your identity."
          : "Configuration missing. You can continue in Simulation Mode for testing purposes."}
      </p>
      
      <div className="space-y-4">
        <button
          onClick={handleLoginAction}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-50 font-gothic text-sm shadow-xl active:scale-95"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            isConfigured ? "Login with Discord" : "Enter Simulation Mode"
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
