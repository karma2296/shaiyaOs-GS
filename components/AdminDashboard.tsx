
import React, { useState } from 'react';
import { GSApplication } from '../types';

interface AdminDashboardProps {
  applications: GSApplication[];
  onBack: () => void;
  onRefresh: () => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applications, onBack, onRefresh }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedApp, setSelectedApp] = useState<GSApplication | null>(null);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Cipher Key.');
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto w-full glass-morphism p-10 rounded-none border-t-2 border-t-red-900/50">
        <h2 className="text-2xl font-fantasy gold-text mb-2 uppercase text-center">Staff Archives Access</h2>
        <p className="text-slate-600 text-xs text-center mb-8 font-gothic uppercase tracking-[0.2em]">Restricted to Council Members</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Administrator Cipher</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-slate-800 focus:border-red-900/50 px-4 py-3 text-slate-200 outline-none transition-all font-mono"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-[10px] font-gothic text-center uppercase">{error}</p>}
          <button type="submit" className="w-full py-4 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-100 font-fantasy tracking-widest uppercase transition-all">
            Unlock Vault
          </button>
          <button type="button" onClick={onBack} className="w-full text-slate-600 text-[10px] uppercase font-gothic tracking-widest hover:text-slate-400">
            Abort Mission
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c5a059]/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-emerald-500 rounded-full pulse-gold"></div>
          <div>
            <h2 className="text-4xl font-fantasy gold-text tracking-tighter uppercase">Admin Codex</h2>
            <p className="text-slate-600 font-gothic text-xs uppercase tracking-[0.3em]">Live Cloud Feed Active</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className={`px-6 py-2 border border-[#c5a059]/30 text-[#c5a059] font-gothic text-xs uppercase tracking-widest hover:bg-[#c5a059]/10 transition-all ${refreshing ? 'opacity-50' : ''}`}
          >
            {refreshing ? 'Syncing...' : 'Sync Archives'}
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 border border-slate-800 text-slate-500 font-gothic text-xs uppercase tracking-widest hover:text-white transition-all"
          >
            Exit Archives
          </button>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="glass-morphism p-24 text-center rounded-none border-dashed border-[#c5a059]/20">
          <div className="mb-6 opacity-20">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1" className="mx-auto">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <p className="text-slate-600 font-gothic italic uppercase tracking-widest">No candidates found in the cloud archives.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Scroll List */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] font-gothic font-bold uppercase tracking-[0.4em] text-slate-500 mb-6">Recent Petitions</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {applications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`w-full text-left p-4 rounded-none border transition-all relative overflow-hidden group flex items-center gap-4 ${
                    selectedApp?.id === app.id 
                      ? 'bg-[#101018] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.1)]' 
                      : 'bg-black/40 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img src={app.discordAvatar} alt="" className="w-12 h-12 object-cover border border-[#c5a059]/30" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-fantasy text-base truncate ${selectedApp?.id === app.id ? 'gold-text' : 'text-slate-300'}`}>
                        {app.characterName}
                      </span>
                      <span className="text-[8px] font-bold text-[#c5a059]">{app.aiScore}%</span>
                    </div>
                    <div className="text-[9px] text-slate-600 font-gothic uppercase tracking-widest truncate">{app.discordTag}</div>
                  </div>
                  {selectedApp?.id === app.id && <div className="absolute top-0 right-0 w-1 h-full bg-[#c5a059]"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Details Scroll */}
          <div className="lg:col-span-8">
            {selectedApp ? (
              <div className="glass-morphism p-10 rounded-none border-[#c5a059]/30 space-y-10 animate-in slide-in-from-right-4 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-[#c5a059]/10 pb-8">
                  <div className="flex items-center gap-6">
                    <img src={selectedApp.discordAvatar} alt="" className="w-24 h-24 object-cover border-2 border-[#c5a059]" />
                    <div>
                      <h3 className="text-3xl font-fantasy gold-text uppercase tracking-tight">{selectedApp.characterName}</h3>
                      <p className="text-slate-500 font-gothic text-sm tracking-widest">Discord: {selectedApp.discordTag}</p>
                      <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest">Submitted: {new Date(selectedApp.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-center px-6 py-4 border border-[#c5a059]/30 bg-[#c5a059]/5">
                    <div className="text-[10px] text-[#c5a059] uppercase font-gothic tracking-widest mb-1">AI Oracle Score</div>
                    <div className="font-fantasy text-4xl gold-text">{selectedApp.aiScore}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1 bg-white/5 p-4 border border-white/10">
                    <div className="text-[9px] text-slate-500 uppercase font-gothic tracking-widest">Age</div>
                    <div className="text-slate-200 font-gothic text-lg">{selectedApp.age} years</div>
                  </div>
                  <div className="space-y-1 bg-white/5 p-4 border border-white/10">
                    <div className="text-[9px] text-slate-500 uppercase font-gothic tracking-widest">Timezone</div>
                    <div className="text-slate-200 font-gothic text-lg">{selectedApp.timezone}</div>
                  </div>
                  <div className="space-y-1 bg-white/5 p-4 border border-white/10">
                    <div className="text-[9px] text-slate-500 uppercase font-gothic tracking-widest">Availability</div>
                    <div className="text-slate-200 font-gothic text-lg">{selectedApp.hoursPerDay}</div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-[#c5a059]/5 border border-[#c5a059]/20 p-8 relative">
                     <div className="absolute -top-3 left-4 bg-[#050507] px-3 py-1 border border-[#c5a059]/30 text-[9px] font-fantasy gold-text uppercase">AI Logic Assessment</div>
                    <p className="text-slate-300 text-sm italic leading-relaxed font-gothic">
                      "{selectedApp.aiSummary}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <h4 className="text-xs font-fantasy gold-text uppercase border-l-2 border-[#c5a059] pl-3">Previous Experience</h4>
                      <p className="text-slate-400 text-sm font-gothic leading-relaxed whitespace-pre-wrap">{selectedApp.experience}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-fantasy gold-text uppercase border-l-2 border-[#c5a059] pl-3">Staff Contribution</h4>
                      <p className="text-slate-400 text-sm font-gothic leading-relaxed whitespace-pre-wrap">{selectedApp.contribution}</p>
                    </div>
                  </div>

                  <div className="space-y-8 bg-black/60 p-8 border border-slate-800">
                    <h4 className="text-xs font-fantasy gold-text uppercase text-center mb-8 tracking-[0.4em] opacity-50 underline underline-offset-8">Trials Record</h4>
                    
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Trial 1: Chat Escalation</h4>
                      <p className="text-slate-300 text-sm font-gothic italic bg-black/40 p-5 border-l border-[#c5a059]/30 leading-relaxed">"{selectedApp.conflictScenario}"</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Trial 2: Anti-Cheat Inquiry</h4>
                      <p className="text-slate-300 text-sm font-gothic italic bg-black/40 p-5 border-l border-[#c5a059]/30 leading-relaxed">"{selectedApp.hackerScenario}"</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Trial 3: Professional Ethics</h4>
                      <p className="text-slate-300 text-sm font-gothic italic bg-black/40 p-5 border-l border-[#c5a059]/30 leading-relaxed">"{selectedApp.ethicsScenario}"</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Trial 4: Stress Response</h4>
                      <p className="text-slate-300 text-sm font-gothic italic bg-black/40 p-5 border-l border-[#c5a059]/30 leading-relaxed">"{selectedApp.pressureScenario}"</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest">Trial 5: Crisis Comms</h4>
                      <p className="text-slate-300 text-sm font-gothic italic bg-black/40 p-5 border-l border-[#c5a059]/30 leading-relaxed">"{selectedApp.communicationScenario}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-10 sticky bottom-0 bg-black/80 backdrop-blur-md py-6 border-t border-[#c5a059]/20">
                  <button className="flex-1 py-4 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 font-fantasy uppercase tracking-widest transition-all">
                    Approve Candidate
                  </button>
                  <button className="flex-1 py-4 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 text-red-400 font-fantasy uppercase tracking-widest transition-all">
                    Reject Petition
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center glass-morphism p-20 text-center border-slate-800">
                <div className="mb-6 opacity-20">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1" className="mx-auto">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <p className="text-slate-600 font-gothic uppercase text-xs tracking-widest">Select a scroll to examine the applicant's record.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
