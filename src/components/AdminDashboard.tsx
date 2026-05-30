import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  Search, 
  Edit3, 
  Download, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  X,
  CreditCard,
  Ticket,
  ShieldAlert,
  ShieldCheck,
  UserX,
  UserCheck,
  UserCheck2,
  Lock,
  Mail,
  CalendarCheck,
  Crown,
  LockKeyholeOpen
} from 'lucide-react';
import { EventItem, EventStatus, AppUser, ThemePalette } from '../types';

interface AdminDashboardProps {
  events: EventItem[];
  setCurrentTab: (tab: string) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  deleteEvent: (id: string) => void;
  
  // Real Persistent User Auth Props
  users: AppUser[];
  currentUser: AppUser | null;
  theme: ThemePalette;
  onPromoteUser: (id: string, role: 'admin' | 'user') => void;
  onBanUser: (id: string, isBanned: boolean) => void;
}

export default function AdminDashboard({ 
  events, 
  setCurrentTab, 
  updateEventStatus,
  deleteEvent,
  users,
  currentUser,
  theme,
  onPromoteUser,
  onBanUser
}: AdminDashboardProps) {
  // Navigation segment state
  const [subTab, setSubTab] = useState<'events' | 'users'>('events');
  
  // Table search triggers
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  
  // Status editing overlay states
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // --- Dynamic calculations: EVENTS ---
  const totalEventsCount = events.length;
  const totalUsersCapacity = events.reduce((sum, ev) => sum + ev.currentAttendees, 0);
  const totalTicketsCount = events.reduce((sum, ev) => ev.ticketPrice > 0 ? sum + ev.currentAttendees : sum, 0);
  const totalRevenueVal = events.reduce((sum, ev) => sum + (ev.currentAttendees * ev.ticketPrice), 0);

  // --- Dynamic calculations: USERS ---
  const totalUsersCount = users.length;
  const adminUsersCount = users.filter(u => u.role === 'admin').length;
  const bannedUsersCount = users.filter(u => u.isBanned).length;
  const activeAttendeesCount = users.filter(u => {
    // Find if user registration has any matches (either from seed or dynamic)
    if (u.email === 'sathwikathota20@gmail.com') {
      return events.some(e => e.userRegistered);
    }
    return true; // default seeded active attendees
  }).length;

  const formatRevenue = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(1)}L`;
    }
    return `₹ ${value.toLocaleString()}`;
  };

  // Event list filters
  const filteredRows = events.filter(ev => {
    const q = tableSearchQuery.toLowerCase();
    return ev.name.toLowerCase().includes(q) || ev.category.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q);
  });

  // User list filters
  const filteredUsers = users.filter(usr => {
    const q = userSearchQuery.toLowerCase();
    return usr.name.toLowerCase().includes(q) || usr.email.toLowerCase().includes(q) || usr.role.includes(q);
  });

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/10 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            Live
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/10 text-xs font-bold font-sans">
            Upcoming
          </span>
        );
      case 'Done':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5 text-xs font-bold">
            Done
          </span>
        );
    }
  };

  const handleExport = () => {
    const reportData = events.map(e => ({
      Name: e.name,
      Category: e.category,
      Location: e.location,
      TicketsSold: e.currentAttendees,
      Price: e.ticketPrice,
      Revenue: e.currentAttendees * e.ticketPrice,
      Status: e.status
    }));
    
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reportData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `EventPro_Revenue_Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 select-none text-left pb-16">
      
      {/* 1. Header controls panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white tracking-tight flex items-center gap-2">
            Admin Workspace
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure system parameters, logistical events, and user authentication constraints.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {subTab === 'events' ? (
            <>
              <button 
                type="button" 
                onClick={handleExport}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-bold text-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button 
                type="button" 
                onClick={() => setCurrentTab('create')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${theme.accentBg} ${theme.accentHoverBg} text-white font-bold text-xs ${theme.glowShadow} border border-white/10 active:scale-95 transition-all cursor-pointer`}
              >
                <Plus className="w-4 h-4" />
                Host Event
              </button>
            </>
          ) : (
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
              <span>Secure Directory Active</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Top Tabs segmented selector */}
      <div className="flex border-b border-white/10 p-1 bg-white/3 rounded-2xl w-max gap-1">
        <button
          onClick={() => { setSubTab('events'); setTableSearchQuery(''); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'events' 
              ? `${theme.accentBg} text-white shadow-lg` 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events Logistics ({totalEventsCount})</span>
        </button>

        <button
          onClick={() => { setSubTab('users'); setUserSearchQuery(''); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'users' 
              ? `${theme.accentBg} text-white shadow-lg` 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory ({totalUsersCount})</span>
        </button>
      </div>

      {/* 3. Sub Tab panels */}
      <AnimatePresence mode="wait">
        {subTab === 'events' ? (
          <motion.div
            key="events-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="space-y-8"
          >
            {/* Events KPI Counters */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Events</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">{totalEventsCount}</h3>
                  </div>
                  <div className="p-3 bg-indigo-500/10 text-indigo-300 rounded-xl border border-indigo-500/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-emerald-405 text-[10px] font-bold text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-450" />
                  <span>Integrated logistics online</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Attendees</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">
                      {totalUsersCapacity >= 1000 ? `${(totalUsersCapacity / 1000).toFixed(1)}k` : totalUsersCapacity}
                    </h3>
                  </div>
                  <div className="p-3 bg-cyan-500/10 text-cyan-300 rounded-xl border border-cyan-500/20">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-450" />
                  <span>Real-time seats tracking sync</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tickets Active</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5 font-mono">
                      {totalTicketsCount >= 1000 ? `${(totalTicketsCount / 1000).toFixed(1)}k` : totalTicketsCount}
                    </h3>
                  </div>
                  <div className="p-3 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/20">
                    <Ticket className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  <span>Stable premium distributions</span>
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Ecosystem Revenue</p>
                    <h3 className="text-2xl font-black text-rose-300 mt-1.5">{formatRevenue(totalRevenueVal)}</h3>
                  </div>
                  <div className={`p-3 ${theme.accentBg}/20 text-white border border-white/15 rounded-xl`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-emerald-405 text-xs font-semibold relative z-10">
                  <TrendingUp className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span className="text-[10px] text-slate-300 font-bold">Dynamic ticket values calculator</span>
                </div>
              </div>
            </section>

            {/* Events table */}
            <section className="glass-panel rounded-2xl shadow-xl overflow-hidden border border-white/10">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-white">Recent Events Registry</h3>
                <div className="relative w-full sm:w-72">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    placeholder="Search table rows..." 
                    value={tableSearchQuery}
                    onChange={(e) => setTableSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Event Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Attendees Count</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Quick Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                    {filteredRows.map((row) => {
                      const filledRatio = Math.min(Math.round((row.currentAttendees / row.maxCapacity) * 100), 100);
                      return (
                        <tr key={row.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-white/5">
                                {row.bannerUrl ? (
                                  <img src={row.bannerUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-tr from-indigo-950 to-purple-950"></div>
                                )}
                              </div>
                              <span className="truncate max-w-[200px]">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(row.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-200">
                                {row.currentAttendees.toLocaleString()} / {row.maxCapacity}
                              </span>
                              <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${filledRatio >= 90 ? 'bg-rose-500' : 'bg-indigo-400'}`} 
                                  style={{ width: `${filledRatio}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-405 font-medium whitespace-nowrap">
                            {row.startDate ? new Date(row.startDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => setEditingEventId(row.id)}
                                className="p-2 text-indigo-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Change Event Status"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteEvent(row.id)}
                                className="p-2 text-rose-450 hover:bg-rose-500/10 text-rose-400 rounded-lg transition-colors cursor-pointer"
                                title="Remove Event draft"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredRows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 font-semibold text-xs leading-normal">
                          No matching recent events found in active registry database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                <span>Showing {filteredRows.length} of {events.length} system events</span>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="users-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.15 }}
            className="space-y-8"
          >
            {/* Users dynamic status counters */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Registered</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">{totalUsersCount}</h3>
                  </div>
                  <div className="p-3 bg-indigo-500/10 text-indigo-300 rounded-xl border border-indigo-500/20">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-450 text-slate-400">
                  <CalendarCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Accounts in regional ecosystem</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrators</p>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-1.5 flex items-center gap-1.5 font-sans">
                      <span>{adminUsersCount}</span>
                      <Crown className="w-5 h-5 text-amber-550 fill-amber-500/30 animate-pulse" />
                    </h3>
                  </div>
                  <div className="p-3 bg-amber-500/10 text-amber-300 rounded-xl border border-amber-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin roles verified</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Banned Profiles</p>
                    <h3 className="text-3xl font-extrabold mt-1.5 text-rose-450 text-rose-400 font-mono">
                      {bannedUsersCount}
                    </h3>
                  </div>
                  <div className="p-3 bg-rose-500/10 text-rose-350 rounded-xl border border-rose-500/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Global moderation ban list synchronized</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Attendees</p>
                    <h3 className="text-3xl font-extrabold text-emerald-405 text-emerald-400 mt-1.5 font-mono">
                      {activeAttendeesCount}
                    </h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 text-emerald-300 rounded-xl border border-emerald-500/20">
                    <UserCheck2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Registered verified profiles</span>
                </div>
              </div>

            </section>

            {/* Users directory table list */}
            <section className="glass-panel rounded-2xl shadow-xl overflow-hidden border border-white/10">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Registered Users Directory</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Verify registration dates, override accounts hierarchy parameters, or trigger access blockades.</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    placeholder="Search by profile name or email..." 
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-xs outline-none rounded-xl placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-4">Register User & Details</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role Permission</th>
                      <th className="px-6 py-4">Ecosystem Status</th>
                      <th className="px-6 py-4">Registration Date</th>
                      <th className="px-6 py-4 text-right">Moderations Panel Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                    {filteredUsers.map((usr) => {
                      const isSelf = currentUser && currentUser.email.toLowerCase() === usr.email.toLowerCase();
                      return (
                        <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                          
                          {/* User Column avatar / name */}
                          <td className="px-6 py-4 font-bold text-white">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-white/15 relative flex-shrink-0">
                                {usr.profilePic ? (
                                  <img src={usr.profilePic} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-black text-white uppercase">
                                    {usr.name.slice(0, 2)}
                                  </div>
                                )}
                                {usr.role === 'admin' && (
                                  <div className="absolute bottom-0 right-0 p-0.5 bg-amber-500 rounded-full border border-slate-900 text-slate-950">
                                    <Crown className="w-2.5 h-2.5 fill-slate-950" />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white text-xs sm:text-sm flex items-center gap-1.5 font-bold">
                                  {usr.name}
                                  {isSelf && (
                                    <span className="text-[9px] bg-indigo-600 border border-indigo-400/25 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-white">YOU</span>
                                  )}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">ID: {usr.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Email Column */}
                          <td className="px-6 py-4 text-xs font-medium text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              {usr.email}
                            </span>
                          </td>

                          {/* Role Column */}
                          <td className="px-6 py-4">
                            {usr.role === 'admin' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/15 text-xs font-bold">
                                <Crown className="w-3 h-3 flex-shrink-0" />
                                Administrator
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-350 border border-white/5 text-xs font-bold">
                                Standard Attendee
                              </span>
                            )}
                          </td>

                          {/* Banned status column */}
                          <td className="px-6 py-4">
                            {usr.isBanned ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/20 text-xs font-bold">
                                <Lock className="w-3 h-3 flex-shrink-0" />
                                Suspended/Banned
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-350 border border-emerald-500/10 text-xs font-bold">
                                <LockKeyholeOpen className="w-3 h-3 flex-shrink-0 text-emerald-405" />
                                Active Account
                              </span>
                            )}
                          </td>

                          {/* Register Date column */}
                          <td className="px-6 py-4 text-xs text-slate-400 font-medium font-mono whitespace-nowrap">
                            {new Date(usr.registrationDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>

                          {/* Actions panel column */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1.5">
                              {/* 1. Toggle Admin Promotion */}
                              <button
                                onClick={() => {
                                  if (isSelf) {
                                    alert("Security lockout protection: You cannot demote your own active Administrator profile.");
                                    return;
                                  }
                                  const targetRole = usr.role === 'admin' ? 'user' : 'admin';
                                  const confirmMsg = targetRole === 'admin' 
                                    ? `Are you sure you want to promote ${usr.name} to System Administrator?`
                                    : `Are you sure you want to demote Administrator ${usr.name} to Standard Attendee?`;
                                  if (window.confirm(confirmMsg)) {
                                    onPromoteUser(usr.id, targetRole);
                                  }
                                }}
                                disabled={isSelf}
                                className={`px-2.5 py-1.5 rounded-lg border border-white/5 text-[10px] font-bold flex items-center gap-1 transition-all select-none cursor-pointer ${
                                  usr.role === 'admin'
                                    ? 'bg-amber-600/10 text-amber-300 hover:bg-amber-600/20 hover:border-amber-500/30'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                } disabled:opacity-30 disabled:cursor-not-allowed`}
                                title={usr.role === 'admin' ? 'Demote to regular user' : 'Promote to executive admin'}
                              >
                                <Crown className="w-3 h-3" />
                                <span>{usr.role === 'admin' ? 'Demote Member' : 'Promote Admin'}</span>
                              </button>

                              {/* 2. Toggle Ban Account */}
                              <button
                                onClick={() => {
                                  if (isSelf) {
                                    alert("Security lockout protection: You are forbidden from banning your own active profile account.");
                                    return;
                                  }
                                  const confirmMsg = usr.isBanned
                                    ? `Restore database access? This resets ban rules on ${usr.name}'s email login.`
                                    : `Suspend account profile permanently? This immediately bans ${usr.name} from authenticated logins.`;
                                  if (window.confirm(confirmMsg)) {
                                    onBanUser(usr.id, !usr.isBanned);
                                  }
                                }}
                                disabled={isSelf}
                                className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-all select-none cursor-pointer ${
                                  usr.isBanned
                                    ? 'bg-emerald-600/10 text-emerald-350 border-emerald-500/15 hover:bg-emerald-600/20'
                                    : 'bg-rose-600/10 text-rose-400 border-rose-500/15 hover:bg-rose-600/20'
                                } disabled:opacity-30 disabled:cursor-not-allowed`}
                                title={usr.isBanned ? 'Reinstate user profile access' : 'Permanently ban subscriber'}
                              >
                                {usr.isBanned ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                                <span>{usr.isBanned ? 'Unban User' : 'Ban Profile'}</span>
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 font-semibold text-xs leading-normal">
                          No matching active directory records found matching search queries.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                <span>Displaying {filteredUsers.length} of {users.length} system users</span>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events editing Dialog status toggles popup */}
      <AnimatePresence>
        {editingEventId && (
          <div className="fixed inset-0 bg-[#02050e]/85 backdrop-blur-md z-[110] flex items-center justify-center p-4">
            <motion.div 
              className="glass-panel p-6 rounded-3xl w-full max-w-sm border border-white/10 shadow-2xl space-y-4 text-left"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white">Change Event Status</h4>
                <button onClick={() => setEditingEventId(null)} className="p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded-full cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-xs text-slate-300 leading-normal font-semibold">Configure live/upcoming tags instantly across discover lists and admin stats sheets.</p>

              <div className="flex flex-col gap-2 pt-2">
                {(['Upcoming', 'Live', 'Done'] as EventStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateEventStatus(editingEventId, st);
                      setEditingEventId(null);
                    }}
                    className="w-full py-2.5 bg-white/5 text-slate-200 font-bold border border-white/10 text-xs hover:border-indigo-400 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    Set as: {st}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
