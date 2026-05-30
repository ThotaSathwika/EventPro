import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  UserCheck, 
  Bell, 
  ChevronRight, 
  CheckSquare, 
  History, 
  LogOut, 
  X, 
  ShieldCheck, 
  Zap,
  Info,
  Sliders,
  Palette,
  Sparkles,
  Shield
} from 'lucide-react';
import { EventItem, AppUser, ThemePalette, SeedThemes } from '../types';

interface ProfileViewProps {
  events: EventItem[];
  setCurrentTab: (tab: string) => void;
  showSettingsMenu: boolean;
  setShowSettingsMenu: (open: boolean) => void;
  triggerMockSignOut: () => void;
  
  // Real Persistent User Auth Props
  currentUser: AppUser | null;
  onLogout: () => void;
  theme: ThemePalette;
  onThemeChange: (themeId: string) => void;
}

export default function ProfileView({ 
  events, 
  setCurrentTab,
  showSettingsMenu,
  setShowSettingsMenu,
  triggerMockSignOut,
  currentUser,
  onLogout,
  theme,
  onThemeChange
}: ProfileViewProps) {
  
  // Dynamically calculate counters based of real global event state mutations:
  const registeredEvents = events.filter(e => e.userRegistered);
  const totalRegisteredCount = registeredEvents.length;

  const upcomingRegistered = registeredEvents.filter(e => e.status !== 'Done');
  const totalUpcomingCount = upcomingRegistered.length;

  const completedRegistered = registeredEvents.filter(e => e.status === 'Done');
  const totalCompletedCount = completedRegistered.length;

  // Use the young lady avatar or premium fallback icon
  const avatarUrl = currentUser?.profilePic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className="space-y-8 select-none text-left pb-16">
      
      {/* 1. Dynamic Welcome Message Area */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-panel rounded-3xl border border-white/10 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 ${theme.bubbleColors[0]} opacity-10 rounded-full blur-2xl pointer-events-none`}></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-md ${theme.glowShadow}`}>
            <img 
              alt={currentUser?.name || "Subscriber Profile"} 
              className="w-full h-full object-cover"
              src={avatarUrl}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-headline-lg-mobile text-white tracking-tight flex items-center gap-1.5">
              <span>Hello, {currentUser?.name || "Indian Lady"}</span>
            </h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
              {currentUser?.role === 'admin' ? (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Ecosystem Director & Administrator
                </span>
              ) : (
                <span className="text-indigo-400 font-bold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Ecosystem Verified Attendee
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/15 rounded-xl cursor-pointer active:scale-95 transition-all self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Secure Sign Out</span>
        </button>
      </section>

      {/* 2. Theme Customizer widget */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className={`w-5 h-5 ${theme.accentColor}`} />
          <h3 className="text-lg font-bold text-white">Visual Customizer & Theme Presets</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {SeedThemes.map((pal) => {
            const isActive = pal.id === theme.id;
            return (
              <button
                key={pal.id}
                onClick={() => onThemeChange(pal.id)}
                className={`p-4 rounded-2xl text-left transition-all relative border overflow-hidden cursor-pointer flex flex-col justify-between h-28 ${
                  isActive 
                    ? `bg-white/10 ${pal.glowShadow} border-white/25 scale-[1.02]` 
                    : 'bg-white/4 border-white/5 hover:bg-white/7'
                }`}
              >
                {/* Bubble color previews in mini circles */}
                <div className="flex gap-1 absolute top-3 right-3">
                  <div className={`w-2 h-2 rounded-full ${pal.bubbleColors[0]}`} />
                  <div className={`w-2 h-2 rounded-full ${pal.bubbleColors[1]}`} />
                </div>

                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-mono text-[9px] font-bold" style={{ backgroundColor: pal.primaryBg }}>
                  Aa
                </span>

                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    {pal.name}
                    {isActive && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 absolute bottom-3 right-3" />}
                  </p>
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${pal.accentColor}`}>
                    {pal.id === 'indigo' ? 'Slate Teal Ambient' : `${pal.id} fusion`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Bento Stats panel */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* TOTAL REGISTERED CHIP CARD */}
        <div className="sm:col-span-3 glass-card p-5 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registered upcoming & past events</p>
            <p className={`text-3xl font-black mt-1 ${theme.accentColor}`}>{totalRegisteredCount}</p>
          </div>
          <div className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300`}>
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* UPCOMING STATS CHIP CARD */}
        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-300 mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Schedules</p>
          <p className="text-2xl font-extrabold text-white mt-1">{totalUpcomingCount}</p>
        </div>

        {/* COMPLETED STATS CHIP CARD */}
        <div className="glass-card p-5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-300 mb-3">
            <CheckSquare className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done Attendance</p>
          <p className="text-2xl font-extrabold text-white mt-1">{totalCompletedCount}</p>
        </div>

        {/* PRO ACCOUNT CTA CHIP CARD */}
        <div className="bg-indigo-650/10 border border-white/10 text-white p-5 rounded-2xl flex items-center justify-between backdrop-blur-md">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Account License</p>
            <p className="text-base font-extrabold text-white">Event Director</p>
            <span className="inline-block text-[9px] bg-indigo-600 px-2 py-0.5 rounded-full font-bold">PREMIUM ACTIVE</span>
          </div>
          <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
        </div>

      </section>

      {/* 4. Upcoming events list registered tracker */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Registered Upcoming Schedules</h3>
          <button 
            type="button" 
            onClick={() => setCurrentTab('explore')}
            className={`text-xs font-bold ${theme.accentColor} hover:underline cursor-pointer`}
          >
            Find more Events
          </button>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {upcomingRegistered.map((evItem) => (
              <div 
                key={evItem.id} 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex gap-3.5 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 border border-white/5">
                    {evItem.bannerUrl ? (
                      <img src={evItem.bannerUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-indigo-950 to-purple-950"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{evItem.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                      {evItem.location} • {evItem.startDate ? new Date(evItem.startDate).toLocaleString([], { dateStyle: 'medium' }) : 'Flexible schedule'}
                    </p>
                  </div>
                </div>
                
                <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/10 rounded-full text-xs font-bold w-max self-start sm:self-auto">
                  Confirmed
                </span>
              </div>
            ))}

            {upcomingRegistered.length === 0 && (
              <div className="p-8 text-center bg-white/5 text-slate-400 font-semibold text-xs leading-normal">
                <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                No upcoming registered events found. Use the Explore section to join.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. History completed list events */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          Attendance History
        </h3>

        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5 select-none">
            {completedRegistered.map((evHistory) => (
              <div 
                key={evHistory.id} 
                className="p-4 flex items-center justify-between opacity-85 hover:opacity-100 transition-opacity bg-white/5 hover:bg-white/10"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{evHistory.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Completed • {evHistory.startDate ? new Date(evHistory.startDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : 'Sep 2023'}
                    </p>
                  </div>
                </div>

                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            ))}

            {completedRegistered.length === 0 && (
              <div className="p-8 text-center bg-white/5 text-slate-400 font-semibold text-xs leading-normal">
                No past finalized attending history recorded.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Settings overlay sliding side-drawer */}
      <AnimatePresence>
        {showSettingsMenu && (
          <div 
            onClick={() => setShowSettingsMenu(false)}
            className="fixed inset-0 bg-[#02050e]/85 backdrop-blur-md z-[110] flex items-end md:items-center justify-center p-0 md:p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[85vh] md:max-h-none overflow-y-auto border border-white/10"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-2 md:hidden"></div>
              
              <div className="flex items-center gap-4 py-2 border-b border-white/10 pb-4">
                <div className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-md ${theme.glowShadow}`}>
                  <img 
                    alt={currentUser?.name || "Subscriber Profile"} 
                    className="w-full h-full object-cover"
                    src={avatarUrl}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-white">{currentUser?.name || "Attendee"}</h4>
                  <p className={`text-xs ${theme.accentColor} font-bold`}>
                    {currentUser?.role === 'admin' ? 'Ecosystem Admin Account' : 'Standard verified account'}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pick Profile Vibe Palette</p>
                <div className="flex flex-wrap gap-2">
                  {SeedThemes.map((presets) => (
                    <button
                      key={presets.id}
                      onClick={() => onThemeChange(presets.id)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                        presets.id === theme.id 
                          ? `${presets.accentBg} text-white border-transparent` 
                          : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${presets.bubbleColors[0]}`} />
                      <span>{presets.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <nav className="space-y-1">
                <button 
                  onClick={() => { setShowSettingsMenu(false); setCurrentTab('explore'); }}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all font-semibold text-xs sm:text-sm text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>My Registered Events</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button 
                  onClick={() => alert("Notification settings synchronized successfully.")}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all font-semibold text-xs sm:text-sm text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-slate-400" />
                    <span>Communication notifications</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </nav>

              <div className="h-px bg-white/10 my-2"></div>

              <button 
                onClick={() => {
                  setShowSettingsMenu(false);
                  triggerMockSignOut();
                }}
                className="w-full flex items-center gap-3 p-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl font-bold text-xs"
              >
                <Sliders className="w-4 h-4" />
                <span>Reset Application Seed Data</span>
              </button>

              <button 
                type="button" 
                onClick={() => setShowSettingsMenu(false)}
                className={`w-full py-3.5 ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs rounded-xl cursor-pointer`}
              >
                Dismiss settings
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
