import React from 'react';
import { Ticket, Bell, Shield } from 'lucide-react';
import { AppUser, ThemePalette } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openSettings: () => void;
  currentUser: AppUser | null;
  theme: ThemePalette;
}

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  openSettings,
  currentUser,
  theme
}: HeaderProps) {
  
  const isAdmin = currentUser?.role === 'admin';
  const avatarUrl = currentUser?.profilePic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-4 md:px-8">
      
      {/* Brand Logo - Clicking re-routes to Home */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
        onClick={() => setCurrentTab('home')}
      >
        <div className={`w-9 h-9 rounded-xl ${theme.accentBg} ${theme.glowShadow} flex items-center justify-center text-white border border-white/10`}>
          <Ticket className="w-4.5 h-4.5" />
        </div>
        <span className="text-lg font-black tracking-tight text-white uppercase font-sans">
          Event<span className={theme.accentColor}>Pro</span>
        </span>
      </div>

      {/* Desktop Main Navigation Links with Role Permissions */}
      <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setCurrentTab('home')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-white bg-white/10 border border-white/10'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentTab('explore')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'explore'
              ? 'text-white bg-white/10 border border-white/10'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setCurrentTab('create')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            currentTab === 'create'
              ? 'text-white bg-white/10 border border-white/10'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          Create Event
        </button>
        
        {isAdmin && (
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              currentTab === 'dashboard'
                ? 'text-white bg-white/10 border border-white/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Dashboard
          </button>
        )}
      </nav>

      {/* Header Utilities */}
      <div className="flex items-center gap-3">
        {/* Dynamic Theme CTA */}
        <button 
          onClick={() => setCurrentTab('create')}
          className={`hidden sm:inline-flex ${theme.accentBg} ${theme.accentHoverBg} text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-all cursor-pointer border border-white/10`}
        >
          Host Event
        </button>

        {/* Notifications Icon with dynamic highlight badge */}
        <button aria-label="Notifications" className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-slate-900 animate-pulse"></span>
        </button>

        {/* Dynamic Profile Thumbnail Picker with Young Lady avatar */}
        <div 
          onClick={openSettings}
          className={`w-10 h-10 rounded-full overflow-hidden border-2 border-white/15 hover:border-white/30 transition-all cursor-pointer select-none active:scale-95 flex-shrink-0 ${theme.glowShadow}`}
          title={`View settings for ${currentUser?.name || "Subscriber"}`}
        >
          <img 
            alt="User profile avatar icon" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
}
