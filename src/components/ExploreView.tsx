import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  ArrowRight,
  Info,
  CheckCircle,
  Calendar,
  X,
  Mail,
  Phone,
  DollarSign
} from 'lucide-react';
import { EventItem, EventStatus } from '../types';

interface ExploreViewProps {
  events: EventItem[];
  registerForEvent: (id: string) => void;
  selectedCategory: string;
  setCategoryFilter: (category: string) => void;
}

export default function ExploreView({ 
  events, 
  registerForEvent,
  selectedCategory,
  setCategoryFilter
}: ExploreViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Live' | 'Upcoming'>('All');
  
  // Selected Event to show details in popup modal
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Filter logic combining both filters
  const filteredEvents = events.filter(ev => {
    // Search match
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      ev.name.toLowerCase().includes(query) || 
      ev.location.toLowerCase().includes(query) || 
      ev.category.toLowerCase().includes(query);

    // Category match
    const matchesCategory = 
      selectedCategory === 'All' || 
      ev.category.toLowerCase() === selectedCategory.toLowerCase();

    // Status match
    const matchesStatus = 
      statusFilter === 'All' || 
      ev.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadgeStyles = (status: string, soldOut: boolean) => {
    if (soldOut) return 'bg-orange-50 text-orange-600 border border-orange-100';
    if (status === 'Live') return 'bg-red-50 text-red-600 border border-red-100';
    return 'bg-blue-50 text-blue-600 border border-blue-100';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white tracking-tight">
          Discover Events
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Explore happening conferences, workshops, and music festivals globally.
        </p>
      </div>

      {/* Main Filter Toolbar */}
      <section className="glass-panel rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Status buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => { setStatusFilter('All'); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                statusFilter === 'All'
                  ? 'bg-indigo-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.25)] scale-102 border border-indigo-400/20'
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => { setStatusFilter('Live'); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                statusFilter === 'Live'
                  ? 'bg-red-500 text-white shadow-[0_4px_14px_rgba(239,68,68,0.25)] scale-102 border border-red-400/10'
                  : 'bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/5'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-current ${statusFilter !== 'Live' ? 'animate-pulse' : ''}`}></span>
              Live Now
            </button>
            <button
              onClick={() => { setStatusFilter('Upcoming'); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                statusFilter === 'Upcoming'
                  ? 'bg-cyan-500 text-white shadow-[0_4px_14px_rgba(6,182,212,0.25)] scale-102 border border-cyan-400/15'
                  : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/5'
              }`}
            >
              Upcoming
            </button>
          </div>

          {/* Search bar widget */}
          <div className="relative flex-1 max-w-md w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name, location or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category filters indicator */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-400">
          <span>Active filter:</span>
          {['All', 'Corporate', 'Wedding', 'Birthday', 'Conferences', 'Workshops', 'Concerts'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Event Cards */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((ev) => {
            const isSoldOut = ev.currentAttendees >= ev.maxCapacity;
            const fullPct = Math.round((ev.currentAttendees / ev.maxCapacity) * 100);

            return (
              <motion.article 
                key={ev.id}
                layout
                className="glass-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:border-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Cover Image portion */}
                <div className="md:w-2/5 relative h-48 md:h-auto min-h-[160px] bg-slate-900 border-r border-white/5 flex-shrink-0 overflow-hidden">
                  {ev.bannerUrl ? (
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                      alt={ev.name}
                      src={ev.bannerUrl}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-950 flex items-center justify-center text-white/40 text-xs font-semibold">No Banner</div>
                  )}

                  {/* Top-aligned context badge */}
                  <div className="absolute top-4 left-4 drop-shadow-md">
                    {ev.status === 'Live' ? (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        LIVE
                      </span>
                    ) : (
                      <span className="bg-cyan-500 text-white text-[10px] font-bold px-3.5 py-1 rounded-full">
                        {ev.startDate ? new Date(ev.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' }).toUpperCase() : 'UPCOMING'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Event core info */}
                <div className="p-6 md:w-3/5 flex flex-col justify-between text-left relative z-10 bg-transparent">
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">
                      {ev.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                      {ev.name}
                    </h3>
                    <div className="flex items-center text-slate-300 gap-1 text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{ev.location}</span>
                    </div>

                    {/* Progress seats bar */}
                    <div className="py-2">
                      <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                        <span className="text-slate-400">
                          Capacity: {ev.currentAttendees.toLocaleString()} / {ev.maxCapacity.toLocaleString()} seats
                        </span>
                        <span className={`font-bold ${isSoldOut ? 'text-rose-450' : 'text-indigo-300'}`}>
                          {isSoldOut ? '100% Sold Out' : `${fullPct}% Full`}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            isSoldOut ? 'bg-rose-500' : fullPct >= 90 ? 'bg-amber-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.min(fullPct, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Click Actions */}
                  <div className="flex gap-3 mt-4 pt-2">
                    <button 
                      onClick={() => setSelectedEvent(ev)}
                      className="flex-1 px-4 py-2 text-white border border-white/10 hover:bg-white/5 rounded-xl font-bold text-xs transition-colors active:scale-95"
                    >
                      Details
                    </button>
                    
                    <button 
                      onClick={() => registerForEvent(ev.id)}
                      disabled={ev.status === 'Done'}
                      className={`flex-1 px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 ${
                        ev.status === 'Done'
                          ? 'bg-white/5 text-slate-450 cursor-not-allowed select-none border border-white/5'
                          : ev.userRegistered
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : isSoldOut
                          ? 'bg-amber-600 text-white hover:bg-amber-500'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {ev.status === 'Done'
                        ? 'Event Done'
                        : ev.userRegistered
                        ? '✓ Registered'
                        : isSoldOut
                        ? 'Join Waitlist'
                        : 'Register Now'}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}

          {filteredEvents.length === 0 && (
            <motion.div 
              className="col-span-full py-16 text-center select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-bold">No events matched your exact filter parameters.</p>
              <p className="text-gray-400 text-xs mt-1">Try resetting the search field or switching search category filter tabs.</p>
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter('All'); setStatusFilter('All'); }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Detailed View Modal Dialog overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            className="fixed inset-0 bg-[#02050e]/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-panel rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Cover Banner */}
              <div className="h-44 bg-slate-900 relative flex-shrink-0">
                {selectedEvent.bannerUrl ? (
                  <img 
                    src={selectedEvent.bannerUrl} 
                    alt="Detail Cover" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-purple-950 flex items-center justify-center text-white/30 text-xs">No Cover Banner</div>
                )}
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-white/10 text-white rounded-full transition-colors active:scale-90"
                  aria-label="Close detail modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {selectedEvent.category}
                  </span>
                </div>
              </div>

              {/* Scrollable details contents */}
              <div className="p-6 overflow-y-auto space-y-6 text-left flex-1 bg-transparent">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedEvent.name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {selectedEvent.venue ? `${selectedEvent.venue}, ` : ''}{selectedEvent.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Date & Time</span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedEvent.startDate ? new Date(selectedEvent.startDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Flexible'}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Ticket Price</span>
                    <span className="text-xs font-extrabold text-indigo-400">
                      {selectedEvent.ticketPrice === 0 ? 'Free Entry' : `₹ ${selectedEvent.ticketPrice.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    About this Event
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                    {selectedEvent.description || 'No description listed by the organizer.'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Organizer Contacts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2 font-medium">
                      <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <a href={`mailto:${selectedEvent.contactEmail}`} className="hover:underline truncate">{selectedEvent.contactEmail || 'organizer@eventpro.com'}</a>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <a href={`tel:${selectedEvent.phoneNumber}`} className="hover:underline">{selectedEvent.phoneNumber || '+91 91111 22222'}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action and Register footer */}
              <div className="p-6 border-t border-white/10 bg-[#0d152a] flex items-center justify-between gap-4 flex-shrink-0">
                <div className="text-left font-semibold">
                  <p className="text-[10px] text-slate-400 uppercase mb-0.5">Capacity Seat Count</p>
                  <p className="text-xs font-bold text-white">
                    {selectedEvent.currentAttendees} / {selectedEvent.maxCapacity} seats filled
                  </p>
                </div>
                <button 
                  onClick={() => {
                    registerForEvent(selectedEvent.id);
                    // refresh local reference since events list inside App changed
                    const updated = events.find(e => e.id === selectedEvent.id);
                    if (updated) setSelectedEvent({ ...updated, userRegistered: !selectedEvent.userRegistered });
                  }}
                  disabled={selectedEvent.status === 'Done'}
                  className={`px-6 py-3 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap ${
                    selectedEvent.status === 'Done'
                      ? 'bg-white/5 text-slate-450 cursor-not-allowed select-none'
                      : selectedEvent.userRegistered
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.25)] border border-indigo-400/20'
                  }`}
                >
                  {selectedEvent.status === 'Done'
                    ? 'Completed'
                    : selectedEvent.userRegistered
                    ? '✓ Registered'
                    : 'Register & Join'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
