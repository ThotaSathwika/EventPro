import React, { useState, useEffect } from 'react';
import { SeedEvents, SeedUsers, SeedThemes, EventItem, EventStatus, AppUser, ThemePalette } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import CreateView from './components/CreateView';
import AdminDashboard from './components/AdminDashboard';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';

// Mobile Bottom Nav Icons
import { Home, Search, Plus, User, LayoutDashboard, Shield } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  // Load events from LocalStorage or seed defaults
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('eventpro_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved events database:", err);
      }
    }
    return SeedEvents;
  });

  // Sync to database
  useEffect(() => {
    localStorage.setItem('eventpro_db', JSON.stringify(events));
  }, [events]);

  // --- Real persistent Users list state ---
  const [users, setUsers] = useState<AppUser[]>(() => {
    const saved = localStorage.getItem('eventpro_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved users database:", err);
      }
    }
    return SeedUsers;
  });

  // Sync users list to persistent local storage
  useEffect(() => {
    localStorage.setItem('eventpro_users', JSON.stringify(users));
  }, [users]);

  // --- Real logged-in user profile state (Seeds to Indian Lady Admin by default!) ---
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('eventpro_currentUser');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse saved current user key:", err);
      }
    }
    // Return first seeded Administrator (Sathwika Thota) as pre-authenticated default for seamless reviews
    return SeedUsers[0];
  });

  // Sync session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eventpro_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eventpro_currentUser');
    }
  }, [currentUser]);

  // --- Theme Palette Choice state ---
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem('eventpro_theme') || 'indigo';
  });

  // Get active Palette configuration details
  const theme = SeedThemes.find(t => t.id === themeId) || SeedThemes[0];

  // Apply body background class and styles dynamically on render
  useEffect(() => {
    document.body.style.backgroundColor = theme.primaryBg;
  }, [theme]);

  // Handle Join & Cancel Checkins
  const registerForEvent = (id: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        const isReg = ev.userRegistered;
        // Adjust dynamic seat counts inside database catalog
        const attendeeAdjustment = isReg ? -1 : 1;
        const newAttendees = Math.max(0, Math.min(ev.currentAttendees + attendeeAdjustment, ev.maxCapacity));
        
        return {
          ...ev,
          userRegistered: !isReg,
          currentAttendees: newAttendees
        };
      }
      return ev;
    }));
  };

  // Create & Append newly planned event
  const handleAddEvent = (newEvent: Omit<EventItem, 'id' | 'currentAttendees' | 'userRegistered'>) => {
    const newId = `event-${Date.now()}`;
    const preparedItem: EventItem = {
      ...newEvent,
      id: newId,
      currentAttendees: 0,
      userRegistered: false,
    };

    setEvents(prev => [preparedItem, ...prev]);
  };

  // Update Event Status in Admin Table rows
  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return { ...ev, status };
      }
      return ev;
    }));
  };

  // Deletes an event draft permanently
  const deleteEvent = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this event draft?");
    if (confirmed) {
      setEvents(prev => prev.filter(ev => ev.id !== id));
    }
  };

  // Resets baseline data
  const triggerMockSignOut = () => {
    const reset = window.confirm("Are you sure you want to reset all customized statistics and return backend to default seed data?");
    if (reset) {
      setEvents(SeedEvents);
      setUsers(SeedUsers);
      setThemeId('indigo');
      localStorage.setItem('eventpro_theme', 'indigo');
      setCurrentUser(SeedUsers[0]);
      setCurrentTab('home');
      setCategoryFilter('All');
    }
  };

  // --- Auth Event Handlers ---
  const handleLoginSuccess = (userToLog: AppUser) => {
    setCurrentUser(userToLog);
    setCurrentTab('home');
  };

  const handleRegisterUser = (name: string, email: string, pass: string) => {
    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      password: pass,
      role: 'user', // default newly registered are Standard Attendees
      name: name.trim(),
      registrationDate: new Date().toISOString(),
      profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' // default young lady profile image
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentTab('home');
  };

  const handleResetPassword = (email: string, pass: string): boolean => {
    let found = false;
    setUsers(prev => {
      const exists = prev.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (exists) {
        found = true;
        return prev.map(u => {
          if (u.email.toLowerCase() === email.trim().toLowerCase()) {
            return { ...u, password: pass };
          }
          return u;
        });
      }
      return prev;
    });
    return found;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('home');
    setShowSettingsMenu(false);
  };

  // --- User Administration Handlers ---
  const handlePromoteUser = (userId: string, role: 'admin' | 'user') => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, role };
        // If current user promoted/demoted their active session, reload their session parameters
        if (currentUser && currentUser.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
  };

  const handleBanUser = (userId: string, isBanned: boolean) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, isBanned };
      }
      return u;
    }));
  };

  const isUserAdmin = currentUser?.role === 'admin';

  // --- Guard unauthenticated sessions and display custom signup portal ---
  if (!currentUser) {
    return (
      <div 
        className="min-h-screen text-slate-100 flex flex-col relative overflow-hidden transition-all duration-300"
        style={{ backgroundColor: theme.primaryBg }}
      >
        <div className={`absolute -top-24 -left-24 w-96 h-96 ${theme.bubbleColors[0]} rounded-full blur-[120px] opacity-25 pointer-events-none transition-all duration-700`}></div>
        <div className={`absolute -bottom-48 left-1/4 w-[600px] h-[600px] ${theme.bubbleColors[1]} rounded-full blur-[180px] opacity-15 pointer-events-none transition-all duration-700`}></div>
        
        <AuthView 
          theme={theme}
          users={users}
          onLoginSuccess={handleLoginSuccess}
          onRegisterUser={handleRegisterUser}
          onResetPassword={handleResetPassword}
        />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col relative overflow-hidden transition-all duration-300"
      style={{ backgroundColor: theme.primaryBg }}
    >
      {/* Dynamic Vantage Mesh Gradient background blur effects synchronized with selected custom theme colors */}
      <div className={`absolute -top-24 -left-24 w-96 h-96 ${theme.bubbleColors[0]} rounded-full blur-[120px] opacity-25 pointer-events-none transition-all duration-700`}></div>
      <div className={`absolute top-1/2 -right-24 w-[500px] h-[500px] ${theme.bubbleColors[1]} rounded-full blur-[150px] opacity-18 pointer-events-none transition-all duration-700`}></div>
      <div className={`absolute -bottom-48 left-1/4 w-[600px] h-[600px] ${theme.bubbleColors[2]} rounded-full blur-[180px] opacity-12 pointer-events-none transition-all duration-700`}></div>

      {/* 1. Global Responsive Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        openSettings={() => setShowSettingsMenu(true)} 
        currentUser={currentUser}
        theme={theme}
      />

      {/* 2. Main Content COORDINATES SPLITS */}
      <div className="flex flex-1 pt-16 pb-20 md:pb-0 h-full relative z-10 select-none">
        
        {/* Desktop Navigation Drawer sidebar */}
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          openSettings={() => setShowSettingsMenu(true)} 
          currentUser={currentUser}
          theme={theme}
        />

        {/* Core Canvas View Container */}
        <main className="flex-1 px-4 md:px-8 py-8 overflow-y-auto overflow-x-hidden md:ml-0 bg-transparent">
          <div className="max-w-7xl mx-auto h-full">
            {currentTab === 'home' && (
              <HomeView 
                setCurrentTab={setCurrentTab} 
                setCategoryFilter={setCategoryFilter}
                events={events}
                registerForEvent={registerForEvent}
              />
            )}

            {currentTab === 'explore' && (
              <ExploreView 
                events={events} 
                registerForEvent={registerForEvent}
                selectedCategory={categoryFilter}
                setCategoryFilter={setCategoryFilter}
              />
            )}

            {currentTab === 'create' && (
              <CreateView 
                onAddEvent={handleAddEvent}
                setCurrentTab={setCurrentTab}
              />
            )}

            {currentTab === 'dashboard' && (
              isUserAdmin ? (
                <AdminDashboard 
                  events={events}
                  setCurrentTab={setCurrentTab}
                  updateEventStatus={updateEventStatus}
                  deleteEvent={deleteEvent}
                  users={users}
                  currentUser={currentUser}
                  theme={theme}
                  onPromoteUser={handlePromoteUser}
                  onBanUser={handleBanUser}
                />
              ) : (
                <div className="py-20 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-rose-500/10 text-rose-400 border border-rose-500/15 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-rose-900/10">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Access Unauthorized</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    The requested administrator dashboard workspace is restricted strictly to authorized executive roles. Your account does not have developer/operator credentials.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('home')}
                    className={`px-5 py-2 hover:opacity-95 text-xs font-bold rounded-xl ${theme.accentBg} text-white transition-opacity`}
                  >
                    Return Home
                  </button>
                </div>
              )
            )}

            {currentTab === 'profile' && (
              <ProfileView 
                events={events}
                setCurrentTab={setCurrentTab}
                showSettingsMenu={showSettingsMenu}
                setShowSettingsMenu={setShowSettingsMenu}
                triggerMockSignOut={triggerMockSignOut}
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                onThemeChange={(newPresetId) => {
                  setThemeId(newPresetId);
                  localStorage.setItem('eventpro_theme', newPresetId);
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* 3. Mobile Navigation Bottom-Bar (Frosted Glass styled) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/5 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] flex justify-around items-center md:hidden z-40 pb-safe select-none">
        
        <button 
          onClick={() => { setCurrentTab('home'); setCategoryFilter('All'); }}
          className={`flex flex-col items-center justify-center w-12 text-[10px] font-bold transition-colors ${
            currentTab === 'home' ? theme.accentColor : 'text-slate-400/80 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button 
          onClick={() => { setCurrentTab('explore'); setCategoryFilter('All'); }}
          className={`flex flex-col items-center justify-center w-12 text-[10px] font-bold transition-colors ${
            currentTab === 'explore' ? theme.accentColor : 'text-slate-400/80 hover:text-white'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </button>

        <button 
          onClick={() => setCurrentTab('create')}
          className={`flex flex-col items-center justify-center w-12 text-[10px] font-bold transition-colors ${
            currentTab === 'create' ? theme.accentColor : 'text-slate-400/80 hover:text-white'
          }`}
        >
          <Plus className="w-5 h-5 mb-0.5" />
          <span>Create</span>
        </button>

        {isUserAdmin && (
          <button 
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center justify-center w-14 text-[10px] font-bold transition-colors ${
              currentTab === 'dashboard' ? theme.accentColor : 'text-slate-400/80 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Admin</span>
          </button>
        )}

        <button 
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center justify-center w-12 text-[10px] font-bold transition-colors ${
            currentTab === 'profile' ? theme.accentColor : 'text-slate-400/80 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>

      </nav>
    </div>
  );
}
