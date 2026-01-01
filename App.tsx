
import React, { useState, useEffect } from 'react';
import { AppView, DiscordUser, GSApplication } from './types';
import LandingPage from './components/LandingPage';
import DiscordLogin from './components/DiscordLogin';
import ApplicationForm from './components/ApplicationForm';
import SuccessPage from './components/SuccessPage';
import AdminDashboard from './components/AdminDashboard';
import { Layout } from './components/Layout';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [applications, setApplications] = useState<GSApplication[]>([]);
  const [loading, setLoading] = useState(false);

  // Gestión de sesión real de Supabase
  useEffect(() => {
    if (!supabase) return;

    const handleAuth = (session: any) => {
      if (session?.user) {
        const u = session.user;
        const metadata = u.user_metadata || {};
        
        const discordUser: DiscordUser = {
          id: u.id,
          username: metadata.custom_claims?.global_name || metadata.full_name || metadata.name || u.email?.split('@')[0] || 'Unknown User',
          discriminator: '0000',
          avatar: metadata.avatar_url || `https://ui-avatars.com/api/?name=${u.id}&background=random`
        };
        
        setUser(discordUser);
        setView('form');
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuth(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchApplications = async () => {
    if (!supabase) {
      const saved = localStorage.getItem('shaiya_apps');
      if (saved) setApplications(JSON.parse(saved));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('gs_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      
      const mappedData: GSApplication[] = (data || []).map((app: any) => ({
        id: app.id,
        userId: app.user_id,
        discordTag: app.discord_tag,
        discordAvatar: app.discord_avatar || '',
        characterName: app.character_name,
        age: app.age,
        timezone: app.timezone,
        hoursPerDay: app.hours_per_day,
        experience: app.experience,
        conflictScenario: app.conflict_scenario,
        hackerScenario: app.hacker_scenario,
        ethicsScenario: app.ethics_scenario,
        pressureScenario: app.pressure_scenario,
        // Usamos el nombre que probablemente tiene Supabase (si está truncado en la UI)
        communicationScenario: app.communication_scenario || app.communication_scen || '',
        contribution: app.contribution,
        status: app.status,
        aiScore: app.ai_score,
        aiSummary: app.ai_summary,
        submittedAt: app.submitted_at,
      }));

      setApplications(mappedData);
    } catch (err) {
      console.error("Cloud fetch error:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleLogin = (mockUser: DiscordUser) => {
    setUser(mockUser);
    setView('form');
  };

  const handleSubmitApplication = async (app: GSApplication) => {
    setLoading(true);
    
    if (supabase) {
      try {
        const { error } = await supabase.from('gs_applications').insert([{
          user_id: app.userId,
          discord_tag: app.discordTag,
          discord_avatar: app.discordAvatar,
          character_name: app.characterName,
          age: app.age,
          timezone: app.timezone,
          hours_per_day: app.hoursPerDay,
          experience: app.experience,
          conflict_scenario: app.conflictScenario,
          hacker_scenario: app.hackerScenario,
          ethics_scenario: app.ethicsScenario,
          pressure_scenario: app.pressureScenario,
          communication_scenario: app.communicationScenario,
          contribution: app.contribution,
          status: app.status,
          ai_score: app.aiScore,
          ai_summary: app.aiSummary,
          submitted_at: app.submittedAt
        }]);
        if (error) throw error;
      } catch (err) {
        console.error("Database error:", err);
        // Fallback local si la red falla
        const current = JSON.parse(localStorage.getItem('shaiya_apps') || '[]');
        localStorage.setItem('shaiya_apps', JSON.stringify([app, ...current]));
      }
    } else {
      const current = JSON.parse(localStorage.getItem('shaiya_apps') || '[]');
      localStorage.setItem('shaiya_apps', JSON.stringify([app, ...current]));
    }

    await fetchApplications();
    setLoading(false);
    setView('success');
  };

  return (
    <Layout>
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-b-2 border-[#c5a059] rounded-full animate-spin mb-6 mx-auto"></div>
            <p className="font-fantasy gold-text text-2xl tracking-[0.3em] animate-pulse">Processing Scroll...</p>
          </div>
        </div>
      )}
      {view === 'landing' && <LandingPage onStart={() => setView('login')} onAdmin={() => setView('admin')} />}
      {view === 'login' && <DiscordLogin onLogin={handleLogin} onBack={() => setView('landing')} />}
      {view === 'form' && user && <ApplicationForm user={user} onSubmit={handleSubmitApplication} onCancel={() => setView('landing')} />}
      {view === 'success' && <SuccessPage onReturn={() => setView('landing')} />}
      {view === 'admin' && <AdminDashboard applications={applications} onBack={() => setView('landing')} onRefresh={fetchApplications} />}
    </Layout>
  );
};

export default App;
