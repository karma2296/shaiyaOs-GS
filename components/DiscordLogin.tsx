
import React, { useState } from 'react';
import { DiscordUser } from '../types';

interface DiscordLoginProps {
  onLogin: (user: DiscordUser) => void;
  onBack: () => void;
}

const DiscordLogin: React.FC<DiscordLoginProps> = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSimulatedLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: Math.random().toString(36).substring(7),
        username: "Champion_" + Math.random().toString(36).substring(2, 6),
        discriminator: Math.floor(1000 + Math.random() * 9000).toString(),
        avatar: `https://picsum.photos/seed/${Math.random()}/200`
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto w-full glass-morphism p-10 rounded-none border-t-2 border-t-[#c5a059] text-center">
      <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M19.27 4.57c-1.3-.6-2.7-.94-4.13-1a.06.06 0 0 0-.06.03c-.18.33-.38.74-.5 1.12-1.47-.22-2.93-.22-4.36 0-.12-.38-.32-.79-.5-1.12a.06.06 0 0 0-.06-.03c-1.44.06-2.83.4-4.14 1a.06.06 0 0 0-.03.02C2.8 8.55 2.03 12.44 2.37 16.27c0 .02.01.04.03.05a16.2 16.2 0 0 0 4.96 2.5.06.06 0 0 0 .07-.02c.39-.53.74-1.1 1.04-1.7.02-.04 0-.08-.04-.1-1.62-.61-3.21-1.39-4.71-2.31a.06.06 0 0 1-.01-.1c.31-.23.63-.48.92-.73a.06.06 0 0 1 .06-.01c3.1 1.42 6.44 1.42 9.5 0a.06.06 0 0 1 .06.01c.29.25.61.5.92.73a.06.06 0 0 1-.01.1c-1.5.92-3.09 1.7-4.71 2.31a.06.06 0 0 0-.04.1c.3.6.65 1.17 1.04 1.7.02.04.05.06.07.02a16.2 16.2 0 0 0 4.96-2.5.06.06 0 0 0 .03-.05c.4-4.33-.66-8.15-2.73-11.7a.06.06 0 0 0-.03-.02zm-10.29 9.3c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92zm6.04 0c-.93 0-1.7-.86-1.7-1.92 0-1.06.75-1.92 1.7-1.92.96 0 1.72.86 1.7 1.92 0 1.06-.74 1.92-1.7 1.92z"/>
        </svg>
      </div>
      
      <h2 className="text-2xl font-fantasy gold-text mb-4 uppercase tracking-widest">Identify Yourself</h2>
      <p className="text-slate-500 mb-10 font-gothic text-sm leading-relaxed">To prevent forged applications and ensure realm security, please authenticate with Discord.</p>
      
      <div className="space-y-4">
        <button
          onClick={handleSimulatedLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-sm transition-all disabled:opacity-50 font-gothic text-sm"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Login with Discord"
          )}
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-2 text-slate-600 hover:text-slate-400 transition-colors text-xs uppercase tracking-[0.2em] font-gothic"
        >
          Return to Portal
        </button>
      </div>
    </div>
  );
};

export default DiscordLogin;
