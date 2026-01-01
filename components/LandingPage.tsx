
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onAdmin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onAdmin }) => {
  return (
    <div className="text-center pt-12">
      <h1 className="text-5xl md:text-8xl font-fantasy font-black mb-4 gold-text tracking-tighter">
        GS RECRUITMENT
      </h1>
      <h2 className="text-xl md:text-2xl font-gothic text-slate-400 mb-12 uppercase tracking-[0.3em]">
        Join the Staff of Shaiya OS
      </h2>
      
      <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
        We are seeking dedicated champions to maintain order across Teos. Whether you serve the Alliance of Light or the Union of Fury, your duty as a Game Sage is to guide and protect our community.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button
          onClick={onStart}
          className="btn-shaiya px-12 py-5 rounded-sm font-fantasy text-lg font-bold shadow-2xl hover:scale-105 active:scale-95"
        >
          Apply Now
        </button>
        
        <button
          onClick={onAdmin}
          className="px-8 py-5 bg-transparent border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-all font-gothic uppercase text-sm tracking-widest"
        >
          Staff Dashboard
        </button>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Player Support",
            desc: "Guide newcomers through their journey in Teos and resolve gameplay inquiries.",
            icon: "📜"
          },
          {
            title: "Event Mastery",
            desc: "Oversee epic PvP battles and world boss encounters to keep the realm alive.",
            icon: "⚔️"
          },
          {
            title: "Realm Sentinel",
            desc: "Enforce the laws of the land and protect players from malicious entities and hackers.",
            icon: "👁️"
          }
        ].map((item, i) => (
          <div key={i} className="glass-morphism p-8 rounded-none border-l-2 border-l-[#c5a059] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <span className="text-6xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-fantasy gold-text mb-3 uppercase">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-gothic">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
