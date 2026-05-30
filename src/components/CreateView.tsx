import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Calendar, 
  Mail, 
  Phone, 
  CloudUpload, 
  Rocket, 
  Lightbulb, 
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  X
} from 'lucide-react';
import { EventItem } from '../types';

interface CreateViewProps {
  onAddEvent: (event: Omit<EventItem, 'id' | 'currentAttendees' | 'userRegistered'>) => void;
  setCurrentTab: (tab: string) => void;
}

export default function CreateView({ onAddEvent, setCurrentTab }: CreateViewProps) {
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Conferences');
  const [location, setLocation] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('500');
  const [ticketPrice, setTicketPrice] = useState('999');
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerPreset, setBannerPreset] = useState('tech');

  // Interactive validation error tracker
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Stock banner preset choices
  const presets = {
    tech: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBStjBu8mV1MRycIxTXX5FYx5hSYNPPrWxifbcOf2gNsnLfzQMpof52-38po649VrBIV2o3Uzbv0FOqI9bb1jXhw5Uj3K5c-uIaFrQgAOAhhlzANeugKg8NTua06_kacMYNSarmnmZfSmIaq2LGt7YFKYqV0n6dvTIdvzZoRpRFDJ5m7c1L55Q20SYAOSwJdqC0icnE78IlOgabWlogvTMzAe2MVIlCul-JIGAtNUjEbd8DxQKsMVp5_W_lIzk2SE0xLo0VqCYJra-t',
    festival: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcWnOFiF3EZikPCqOQgeHLEHpLKfsxRvijTGnYZ8NxjsE2KSI9XvLFBSXGU261gh7wiyJTKznv_Ga3HpmYrecEAIgHUtEwA7nR5AzgfwxnkvUmO-ZRiLInYZQ5TmA4rNZLT9yErWK43S8nA32xi3_s_w0UjJdENtwBgbwaWump571AUY1293Kk_niN6pgr6xMS_E6nr1DYurm5HvhYwkKsGESgCWmbt-90xl3c22SpyAiZH0IeujjuGKrDFdBEnCyYVWX3T4LLHqAk',
    gala: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEX5pwiblAHluBr_jLHMpR7oehpSs08qiHxSI41SnndMdmYsn7sBh0ckGf1qqxg_yfVJmDxfHPHViF1TZaL42IN8iEl3mYJNItZGK_nxz0KvN3O-SNSoP5G0G-2hfjUi_8RNXnOB-2-x5mjVVXrc-BZsW4ceOHnH-iTI4KUchamowFAcu_K7q8wK24To-AtTTZb_3_yD8KLFVgTzQstNcwuYwlAugT2F78ap7SU-RUBjF9NJDHev9PIV5eK8BAGwux9Y7gqnAX-oE2',
    corporate: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqHsLfDqWaK4mKN6Hhxazl-qIeen-Ob8litGKFe3yLzjD6jDqFoWKdAfrnadCJlmRbmor65We7EXAhaQlt9FpaqDaf998ei5nUyJPFuXxNN-rRigmoyX516veI9vunYtZsNhhy04kaAORtLFZi_IjLvyXHvyUYYZ2Yj8Pf0qfP0vO5EWGZRep9kY3xWuwzFu2Erl2U6Ur0gjhqyUQJghLcUC18IseCmOvmTfxhYeEHZEU6WuIyFj-lqQlNXriAfYRvB2uDG4HHLN4K',
  };

  const handlePresetSelect = (presetKey: string) => {
    setBannerPreset(presetKey);
    setBannerUrl(presets[presetKey as keyof typeof presets]);
  };

  const formValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);

    if (!name.trim()) {
      setErrorStatus("Please enter an event name.");
      return;
    }
    if (!location.trim()) {
      setErrorStatus("Location / City is required.");
      return;
    }
    if (!startDate) {
      setErrorStatus("Please select a starting Date & Time.");
      return;
    }
    if (isNaN(Number(maxCapacity)) || Number(maxCapacity) <= 0) {
      setErrorStatus("Max Capacity must be a number greater than 0.");
      return;
    }

    // Prepare complete payload
    const resolvedBanner = bannerUrl || presets[bannerPreset as keyof typeof presets];

    onAddEvent({
      name,
      category,
      location,
      venue,
      description: description || `This is a premium ${category.toLowerCase()} event hosted in ${location}.`,
      startDate,
      endDate: endDate || undefined,
      maxCapacity: Number(maxCapacity),
      ticketPrice: isNaN(Number(ticketPrice)) ? 0 : Number(ticketPrice),
      contactEmail: contactEmail || 'info@eventpro.com',
      phoneNumber: phoneNumber || '+91 99999 88888',
      bannerUrl: resolvedBanner,
      status: 'Upcoming'
    });

    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setCurrentTab('explore');
  };

  return (
    <div className="space-y-8 select-none text-left pb-16 relative">
      
      {/* Header and instruction block */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white tracking-tight">
          Create New Event
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Fill in the details below to set up your upcoming event experience and publish it instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM MODULE SECTION */}
        <div className="lg:col-span-8">
          <form onSubmit={formValidateAndSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            
            {/* 1. Basic Info Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                <Info className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold font-headline-sm text-white">
                  Basic Information
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Event Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Global Tech Summit 2024"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Event Type / Group</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none cursor-pointer"
                    >
                      <option className="bg-slate-950 text-white">Conferences</option>
                      <option className="bg-slate-950 text-white">Workshops</option>
                      <option className="bg-slate-950 text-white">Concerts</option>
                      <option className="bg-slate-950 text-white">Corporate</option>
                      <option className="bg-slate-950 text-white">Wedding</option>
                      <option className="bg-slate-950 text-white">Birthday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location (City)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Mumbai, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Venue Address</label>
                  <input 
                    type="text" 
                    placeholder="Complete street address, building or zoom links"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    placeholder="Describe what makes this event special to attendees..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none resize-none placeholder:text-slate-500"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 2. Schedule & Capacity Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold font-headline-sm text-white">
                  Schedule & Capacity
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Start Date & Time</label>
                  <input 
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">End Date & Time</label>
                  <input 
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Max Attendance Capacity</label>
                  <input 
                    type="number"
                    placeholder="e.g., 500"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ticket Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xs font-bold">₹</span>
                    <input 
                      type="number"
                      placeholder="e.g., 999"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Contact Details */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                <Mail className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold font-headline-sm text-white">
                  Organizer Contacts
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-450"><Mail className="w-4 h-4" /></span>
                    <input 
                      type="email"
                      placeholder="e.g., organizer@event.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-450"><Phone className="w-4 h-4" /></span>
                    <input 
                      type="tel"
                      placeholder="e.g., +91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-white/10 focus:border-indigo-400 bg-white/5 text-white transition-all text-sm outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Validation errors warning displays */}
            {errorStatus && (
              <div className="p-4 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-xl text-xs font-semibold">
                ⚠️ {errorStatus}
              </div>
            )}

            {/* Submit handle triggers hidden for standard forms, processed on sidebar buttons but also available via direct submit */}
            <button type="submit" className="hidden" id="event-form-submit-trigger" />
          </form>
        </div>

        {/* SIDEBAR UPLOADS & BANNER MANAGER */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Banner selection block */}
          <section className="glass-panel rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Event Banner Image
            </h3>
            
            {/* Action drag and drop indicator */}
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center bg-white/5 hover:border-indigo-500 hover:bg-white/10 transition-all cursor-pointer select-none">
              <CloudUpload className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Drag to drop / Select Banner</p>
              <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 10MB (16:9 recommended)</p>

              <button 
                type="button" 
                onClick={() => {
                  const url = prompt("Please enter any custom image URL (or select presets below):");
                  if (url) setBannerUrl(url);
                }} 
                className="mt-4 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-indigo-400 text-white text-xs font-bold rounded-lg transition-all"
              >
                Insert Custom URL
              </button>
            </div>

            {/* Beautiful Presets trigger selector list */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Choose Beautiful Preset</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(presets).map((key) => {
                  const active = bannerPreset === key && !bannerUrl;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handlePresetSelect(key)}
                      className={`text-xs p-2 py-2.5 rounded-lg font-bold border transition-all text-center uppercase tracking-wider ${
                        active
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                          : 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {key} Theme
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placeholder Live Preview */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Preview Placeholder</span>
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative border border-white/10">
                <img 
                  referrerPolicy="no-referrer"
                  src={bannerUrl || presets[bannerPreset as keyof typeof presets]} 
                  alt="Preset Banner selected preview" 
                  className="w-full h-full object-cover transition-transform" 
                />
              </div>
            </div>
          </section>

          {/* QUICK SUBMIT BAR CARD */}
          <section className="glass-panel rounded-2xl p-6 shadow-md border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-headline-sm">
              Quick Actions
            </h3>
            <p className="text-xs font-semibold text-slate-450 leading-relaxed">
              Review your schedules and capacities before publishing. Events go live immediately after creation to the discovery registry feed.
            </p>

            <div className="space-y-2 pt-2.5">
              <button
                type="button"
                onClick={() => {
                  const btn = document.getElementById('event-form-submit-trigger');
                  if (btn) btn.click();
                }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-[0_4px_16px_rgba(99,102,241,0.25)] border border-indigo-400/20 flex items-center justify-center gap-2 active:scale-95 transition-all outline-none cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                Create Event Now
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('home')}
                className="w-full py-3 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-white/10 font-bold text-xs rounded-xl transition-all active:scale-95 outline-none cursor-pointer"
              >
                Cancel Draft
              </button>
            </div>
          </section>

          {/* Design Pro tip info block */}
          <section className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-2xl p-5 flex gap-3 text-left">
            <Lightbulb className="w-5 h-5 flex-shrink-0 text-indigo-400" />
            <div>
              <p className="text-xs font-bold mb-0.5">Event Pro Tip</p>
              <p className="text-[11px] text-slate-300 leading-normal font-semibold">
                Adding an extensive description, schedule timestamps, and a solid 16:9 high-quality banner increases ticket page checkouts by up to 40%.
              </p>
            </div>
          </section>

        </div>

      </div>

      {/* Success Modal Dialogue */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            className="fixed inset-0 bg-[#02050e]/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-panel border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Event Created Successfully!</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-semibold">
                Your event **"{name}"** has been added to our live platform catalog and list registry.
              </p>
              
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.25)] border border-indigo-400/20 active:scale-95 transition-all text-center cursor-pointer"
              >
                Go to Explore Feed
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
