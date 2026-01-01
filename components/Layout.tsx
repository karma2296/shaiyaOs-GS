
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </div>
      <footer className="mt-12 text-slate-500 text-sm flex flex-col items-center gap-2">
        <p className="font-fantasy tracking-widest uppercase">Shaiya OS Staff Recruitment</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-400 transition-colors">Reglas del Servidor</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Discord Oficial</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Soporte</a>
        </div>
      </footer>
    </div>
  );
};
