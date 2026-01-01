
import React, { useState } from 'react';
import { DiscordUser, GSApplication } from '../types';
import { analyzeApplication } from '../geminiService';

interface ApplicationFormProps {
  user: DiscordUser;
  onSubmit: (app: GSApplication) => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ user, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    characterName: '',
    age: 18,
    timezone: '',
    hoursPerDay: '',
    experience: '',
    conflictScenario: '',
    hackerScenario: '',
    ethicsScenario: '',
    pressureScenario: '',
    communicationScenario: '',
    contribution: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const analysis = await analyzeApplication(formData);

    const newApp: GSApplication = {
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      discordTag: user.username,
      discordAvatar: user.avatar,
      ...formData,
      status: 'pending',
      aiScore: analysis.score,
      aiSummary: analysis.summary,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(newApp);
    setLoading(false);
  };

  return (
    <div className="glass-morphism rounded-none border-2 border-[#c5a059]/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]">
      <div className="bg-[#101018] p-8 border-b border-[#c5a059]/20 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-none border border-[#c5a059] shadow-lg object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 border border-black rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
          </div>
          <div>
            <h2 className="text-2xl font-fantasy font-bold gold-text tracking-wide uppercase">GS Official Scroll</h2>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-gothic text-[10px] uppercase tracking-widest border border-emerald-500/30 px-2 py-0.5 bg-emerald-500/5">Verified Identity:</span>
              <p className="text-slate-200 font-gothic text-xs font-bold">{user.username}</p>
              <span className="text-slate-600 text-[9px] font-mono opacity-50">ID: {user.id.substring(0, 8)}...</span>
            </div>
          </div>
        </div>
        <button onClick={onCancel} className="text-slate-600 hover:text-[#c5a059] transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="p-8 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-black/40">
        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Character Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">In-Game Name (Main IGN)</label>
              <input required name="characterName" value={formData.characterName} onChange={handleChange}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all font-gothic"
                placeholder="Ex: TeosGuardian" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Age</label>
              <input required type="number" name="age" min="13" max="99" value={formData.age} onChange={handleChange}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all font-gothic" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Timezone (GMT/UTC)</label>
              <input required name="timezone" value={formData.timezone} onChange={handleChange}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all font-gothic"
                placeholder="Ex: GMT-4 (EST)" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Daily Availability (Hours)</label>
              <input required name="hoursPerDay" value={formData.hoursPerDay} onChange={handleChange}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all font-gothic"
                placeholder="Ex: 4 to 6 hours daily" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Service Background</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Previous Staff Experience</label>
              <textarea required name="experience" value={formData.experience} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="List servers and ranks held previously..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Unique Values for Shaiya OS</label>
              <textarea required name="contribution" value={formData.contribution} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Skills, events, or community ideas you bring..." />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Trials of Judgment</h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 1: Conflict resolution in PvP zones.
              </label>
              <textarea required name="conflictScenario" value={formData.conflictScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="How do you handle toxicity in chat?" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 2: Anti-Cheat methodology.
              </label>
              <textarea required name="hackerScenario" value={formData.hackerScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="What evidence do you gather before a ban?" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 3: Staff Ethics.
              </label>
              <textarea required name="ethicsScenario" value={formData.ethicsScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Misconduct by a fellow staff member?" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 4: Prioritization under stress.
              </label>
              <textarea required name="pressureScenario" value={formData.pressureScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Flood of support vs game moderation?" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 5: Community Crisis.
              </label>
              <textarea required name="communicationScenario" value={formData.communicationScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Managing outrage after server technical issues?" />
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-[#c5a059]/10 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-[10px] text-slate-600 font-gothic leading-relaxed flex-1 uppercase tracking-wider">
            AL ENVIAR ESTA SOLICITUD, TU IDENTIDAD DE DISCORD ({user.username}) QUEDARÁ VINCULADA PERMANENTEMENTE A ESTE EXPEDIENTE PARA REVISIÓN DEL STAFF.
          </div>
          <button type="submit" disabled={loading} className="btn-shaiya w-full md:w-auto px-12 py-5 font-fantasy text-lg font-bold disabled:opacity-50">
            {loading ? "Validating with AI Sentinel..." : "Submit Official Scroll"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
