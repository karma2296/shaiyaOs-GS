
import React from 'react';

interface SuccessPageProps {
  onReturn: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onReturn }) => {
  return (
    <div className="text-center glass-morphism p-16 rounded-none border border-[#c5a059]/30">
      <div className="w-20 h-20 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#c5a059]">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="m9 11 3 3L22 4"/>
        </svg>
      </div>
      
      <h2 className="text-4xl font-fantasy gold-text mb-6 uppercase tracking-tighter">Application Sealed</h2>
      <p className="text-slate-500 max-w-lg mx-auto mb-12 leading-relaxed font-gothic">
        Your plea to join the Staff of Shaiya OS has been recorded. The Realm Administrators and our AI Sentinel will now evaluate your worth. Watch your Discord messages closely.
      </p>
      
      <button
        onClick={onReturn}
        className="btn-shaiya px-12 py-4 font-fantasy text-sm font-bold tracking-widest"
      >
        Return to Gateway
      </button>
    </div>
  );
};

export default SuccessPage;
