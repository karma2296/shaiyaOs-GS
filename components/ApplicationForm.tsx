
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
      {/* Header del Formulario */}
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
            </div>
          </div>
        </div>
        <button onClick={onCancel} className="text-slate-600 hover:text-[#c5a059] transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="p-8 space-y-12 max-h-[75vh] overflow-y-auto custom-scrollbar bg-black/40">
        
        {/* SECCIÓN 1: DATOS BÁSICOS */}
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

        {/* SECCIÓN 2: EXPERIENCIA */}
        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Service Background</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Previous Staff Experience</label>
              <textarea required name="experience" value={formData.experience} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Describe your history as staff in other Shaiya servers or MMORPGs..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Why should we choose you over others?</label>
              <textarea required name="contribution" value={formData.contribution} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Tell us about your values, ideas for events, or how you would improve Shaiya OS..." />
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: LOS TRIALS (PREGUNTAS ACTUALIZADAS) */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-[#c5a059]/30 pb-4">
            <h3 className="text-xl font-fantasy gold-text uppercase tracking-widest">Trials of Judgment</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c5a059]/50 to-transparent"></div>
          </div>
          <p className="text-[10px] font-gothic text-slate-500 uppercase tracking-widest italic mb-6">
            Read carefully each scenario. Your answers will be judged by the Oracle Sentinel for maturity and ethics.
          </p>

          <div className="space-y-10">
            {/* Trial 1 */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#c5a059] font-fantasy text-sm uppercase tracking-tighter">Trial 1: Conflict Management</span>
                <label className="text-sm font-gothic text-slate-200 leading-relaxed pl-4 border-l border-[#c5a059]/40">
                  You witness high-level players engaging in extreme toxicity and harassment in a PvP zone. How do you intervene without showing bias toward any faction?
                </label>
              </div>
              <textarea required name="conflictScenario" value={formData.conflictScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Type your response here..." />
            </div>

            {/* Trial 2 */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#c5a059] font-fantasy text-sm uppercase tracking-tighter">Trial 2: Vigilance & Anti-Cheat</span>
                <label className="text-sm font-gothic text-slate-200 leading-relaxed pl-4 border-l border-[#c5a059]/40">
                  You suspect a well-known guild leader of using automated scripts (macros/bots). What precise steps and evidence would you gather before proposing a ban to the Admin?
                </label>
              </div>
              <textarea required name="hackerScenario" value={formData.hackerScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Type your response here..." />
            </div>

            {/* Trial 3 */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#c5a059] font-fantasy text-sm uppercase tracking-tighter">Trial 3: Professional Integrity</span>
                <label className="text-sm font-gothic text-slate-200 leading-relaxed pl-4 border-l border-[#c5a059]/40">
                  You discover that another GS (Game Sage) is secretly providing items or information to their personal friends. How do you handle this discovery professionally?
                </label>
              </div>
              <textarea required name="ethicsScenario" value={formData.ethicsScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Type your response here..." />
            </div>

            {/* Trial 4 */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#c5a059] font-fantasy text-sm uppercase tracking-tighter">Trial 4: High-Pressure Priority</span>
                <label className="text-sm font-gothic text-slate-200 leading-relaxed pl-4 border-l border-[#c5a059]/40">
                  The server is under a DDoS attack, chat is flooded with support tickets, and a massive war is happening simultaneously. How do you prioritize your duties in this chaos?
                </label>
              </div>
              <textarea required name="pressureScenario" value={formData.pressureScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Type your response here..." />
            </div>

            {/* Trial 5 */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[#c5a059] font-fantasy text-sm uppercase tracking-tighter">Trial 5: Communication Crisis</span>
                <label className="text-sm font-gothic text-slate-200 leading-relaxed pl-4 border-l border-[#c5a059]/40">
                  An unexpected roll-back has caused players to lose hours of progress. The community is outraged on Discord. Describe your strategy to calm the masses and represent the Staff.
                </label>
              </div>
              <textarea required name="communicationScenario" value={formData.communicationScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Type your response here..." />
            </div>
          </div>
        </section>

        {/* Footer de Envío */}
        <div className="pt-10 border-t border-[#c5a059]/10 flex flex-col md:flex-row gap-6 items-center bg-[#0a0a0f] p-6 -mx-8 -mb-8">
          <div className="text-[9px] text-slate-600 font-gothic leading-relaxed flex-1 uppercase tracking-wider">
            Upon submission, your Discord identity ({user.username}) will be permanently linked to this record for manual review by the Shaiya OS Administration.
          </div>
          <button type="submit" disabled={loading} className="btn-shaiya w-full md:w-auto px-12 py-5 font-fantasy text-lg font-bold disabled:opacity-50 transition-all active:scale-95 shadow-[0_0_30px_rgba(197,160,89,0.2)]">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Judging...</span>
              </div>
            ) : "Seal the Scroll"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
