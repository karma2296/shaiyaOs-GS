
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
      discordTag: `${user.username}#${user.discriminator}`,
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
            <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-none border border-[#c5a059] shadow-lg" />
            <div className="absolute -bottom-1 -right-1 bg-[#c5a059] w-4 h-4 border border-black"></div>
          </div>
          <div>
            <h2 className="text-2xl font-fantasy font-bold gold-text tracking-wide uppercase">GS Application Form</h2>
            <p className="text-slate-500 font-gothic text-sm">{user.username}#{user.discriminator}</p>
          </div>
        </div>
        <button onClick={onCancel} className="text-slate-600 hover:text-[#c5a059] transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="p-8 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar bg-black/40">
        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Hero Identification</h3>
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
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Tale of Service</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">Previous Staff Experience (List servers and ranks held)</label>
              <textarea required name="experience" value={formData.experience} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Describe your history in the staff ranks..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-gothic uppercase tracking-tighter text-slate-400">What unique values can you contribute to Shaiya OS?</label>
              <textarea required name="contribution" value={formData.contribution} onChange={handleChange} rows={3}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Skills, events, or community ideas..." />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-fantasy gold-text border-b border-[#c5a059]/10 pb-2 uppercase tracking-widest">Trials of Judgment</h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 1: You are in a PvP zone and two players from opposing factions begin to escalate insults in the General Chat. How do you intervene?
              </label>
              <textarea required name="conflictScenario" value={formData.conflictScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Outline your disciplinary steps..." />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 2: You suspect a player is using prohibited software (Speedhack) to reach Boss spawns. What evidence would you gather before reporting?
              </label>
              <textarea required name="hackerScenario" value={formData.hackerScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Describe your investigative methodology..." />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 3 (Staff Integrity): You witness a fellow staff member granting unfair advantages or rare items to their personal friends. What is your course of action?
              </label>
              <textarea required name="ethicsScenario" value={formData.ethicsScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="How would you handle internal misconduct?" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 4 (Task Prioritization): You are flooded with support whispers while simultaneously trying to record a potential hacker in a busy dungeon. How do you prioritize your duties?
              </label>
              <textarea required name="pressureScenario" value={formData.pressureScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="Describe your workflow under high pressure..." />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-gothic text-slate-300 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-4 py-1">
                Trial 5 (Crisis Management): A critical server-wide lag spike causes players to lose items or experience. The community is outraged in chat. How do you communicate with them while waiting for developer instructions?
              </label>
              <textarea required name="communicationScenario" value={formData.communicationScenario} onChange={handleChange} rows={4}
                className="w-full bg-black/60 border border-slate-800 focus:border-[#c5a059] px-4 py-3 text-slate-200 outline-none transition-all resize-none font-gothic"
                placeholder="What is your strategy for community appeasement?" />
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-[#c5a059]/10 flex flex-col md:flex-row gap-6 items-center">
          <div className="text-[10px] text-slate-600 font-gothic leading-relaxed flex-1 uppercase tracking-wider">
            BY SUBMITTING, YOU ACKNOWLEDGE THAT ALL INFORMATION IS ACCURATE. YOUR RESPONSES WILL BE REVIEWED BY THE REALM ADMINISTRATORS AND CROSS-REFERENCED BY AN AI ANALYTICS ENGINE.
          </div>
          <button type="submit" disabled={loading} className="btn-shaiya w-full md:w-auto px-12 py-5 font-fantasy text-lg font-bold disabled:opacity-50">
            {loading ? "Invoking AI Oracle..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
