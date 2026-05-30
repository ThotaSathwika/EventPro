import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Settings, 
  User, 
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { AppUser, ThemePalette } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openSettings: () => void;
  currentUser: AppUser | null;
  theme: ThemePalette;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  openSettings,
  currentUser,
  theme
}: SidebarProps) {
  
  // Conditionally show menu items based on authorized Roles
  const isAdmin = currentUser?.role === 'admin';
  
  const menuItems = [
    ...(isAdmin ? [{ id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard }] : []),
    { id: 'explore', label: 'My Events / Find', icon: Calendar },
    { id: 'create', label: 'Create Event', icon: PlusCircle },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const avatarUrl = currentUser?.profilePic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <aside className="w-[280px] bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 h-full sticky top-16 hidden md:flex select-none z-30">
      
      {/* Dynamic Profile Information Summary Block */}
      <div className="px-6 mb-6 text-left">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 ${theme.glowShadow}`}>
            <img 
              alt={currentUser?.name || "Subscriber Profile"} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              src={avatarUrl}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">
              {currentUser?.name || "Sathwika Thota"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              {currentUser?.role === 'admin' ? 'Ecosystem Admin' : 'Verified Attendee'}
            </p>
          </div>
        </div>

        {/* License Badge Tier info */}
        <div className="mt-4 bg-indigo-500/10 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-200">
            {currentUser?.role === 'admin' ? 'Executive Director' : 'Active Subscriber'}
          </span>
        </div>
      </div>

      <div className="h-px bg-white/10 mx-6 mb-4"></div>

      {/* Main Sidebar Menus dynamically highlighting with active theme colors */}
      <nav className="flex-1 px-4 space-y-1 text-left">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? `${theme.accentBg} text-white shadow-lg border border-white/15`
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {isAdmin && (
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <TrendingUp className="w-5 h-5 flex-shrink-0 text-slate-400" />
            <span>Ecosystem Reports</span>
          </button>
        )}
      </nav>

      {/* Bottom Settings Trigger */}
      <div className="px-4 mt-auto">
        <button
          onClick={openSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/45 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
        >
          <Settings className="w-5 h-5 flex-shrink-0 text-slate-500" />
          <span>Ecosystem Settings</span>
        </button>
      </div>
    </aside>
  );
}
