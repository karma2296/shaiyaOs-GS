
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

  const fetchApplications = async () => {
    if (!isSupabaseConfigured() || !supabase) {
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
        characterName: app.character_name,
        age: app.age,
        timezone: app.timezone,
        hoursPerDay: app.hours_per_day,
        experience: app.experience,
        conflictScenario: app.conflict_scenario,
        hackerScenario: app.hacker_scenario,
        ethicsScenario: app.ethics_scenario,
        pressureScenario: app.pressure_scenario,
        communicationScenario: app.communication_scenario,
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
    
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('gs_applications').insert([{
          user_id: app.userId,
          discord_tag: app.discordTag,
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
      }
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
            <p className="font-fantasy gold-text text-2xl tracking-[0.3em] animate-pulse">Consulting the AI Oracle...</p>
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
