import React from 'react';
import { motion } from 'motion/react';
import { 
  PlusCircle, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Briefcase,
  Heart,
  Cake,
  Lightbulb,
  Music,
  ArrowRight
} from 'lucide-react';
import { SeedCategories, CategoryItem, EventItem } from '../types';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  setCategoryFilter: (category: string) => void;
  events: EventItem[];
  registerForEvent: (id: string) => void;
}

export default function HomeView({ 
  setCurrentTab, 
  setCategoryFilter, 
  events,
  registerForEvent 
}: HomeViewProps) {

  // Fetch icons dynamically Surrounding Lucide Icon Lookup Map
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'Cake': return <Cake className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategoryFilter(categoryName);
    setCurrentTab('explore');
  };

  // Find trending items
  const techXEvent = events.find(e => e.name.toLowerCase().includes('synergy')) || events[0];
  const aiEvent = events.find(e => e.name.toLowerCase().includes('ai')) || events[1];
  const rooftopEvent = events.find(e => e.name.toLowerCase().includes('rooftop')) || events[5];
  const designEvent = events.find(e => e.name.toLowerCase().includes('sprint')) || events[6];

  // Category horizontal scroll controls
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollSide = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Immersive Glassmorphism Hero Banner */}
      <motion.section 
        className="relative w-full rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(10,25,47,0.08)] h-[400px] md:h-[500px]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          alt="Event Planning Hero background illustration" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqHsLfDqWaK4mKN6Hhxazl-qIeen-Ob8litGKFe3yLzjD6jDqFoWKdAfrnadCJlmRbmor65We7EXAhaQlt9FpaqDaf998ei5nUyJPFuXxNN-rRigmoyX516veI9vunYtZsNhhy04kaAORtLFZi_IjLvyXHvyUYYZ2Yj8Pf0qfP0vO5EWGZRep9kY3xWuwzFu2Erl2U6Ur0gjhqyUQJghLcUC18IseCmOvmTfxhYeEHZEU6WuIyFj-lqQlNXriAfYRvB2uDG4HHLN4K"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/60 to-transparent flex items-center">
          <div className="px-8 md:px-16 max-w-2xl text-left select-none">
            <motion.h1 
              className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Plan Your Perfect Event
            </motion.h1>
            <motion.p 
              className="text-gray-200 text-sm sm:text-base md:text-lg mb-8 max-w-lg leading-relaxed font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              From corporate galas to intimate workshops, manage every single detail with EventPro's professional logistics suite.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <button 
                onClick={() => setCurrentTab('create')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_4px_16px_rgba(99,102,241,0.30)] active:scale-95 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Create Event
              </button>
              <button 
                onClick={() => handleCategoryClick('All')}
                className="glass-panel text-white hover:bg-white/15 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all border border-white/20 active:scale-95"
              >
                Browse Categories
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Categories slider area */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Explore Categories
            </h2>
            <p className="text-sm text-slate-400">
              Discover specialized tools for every type of gathering.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollSide('left')}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all shadow-sm"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollSide('right')}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all shadow-sm"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories sliding cards */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide pb-2"
        >
          {SeedCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group glass-card p-6 rounded-2xl hover:border-indigo-500/50 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] cursor-pointer select-none transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-3xl transform translate-x-3 -translate-y-3 transition-transform group-hover:scale-120 group-hover:bg-white/10"></div>
              
              <div className={`w-12 h-12 rounded-xl ${cat.colorClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {getCategoryIcon(cat.iconName)}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {cat.name}
              </h3>
              <p className="text-sm text-slate-300 leading-normal">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento-grid Featured Section */}
      <section className="space-y-6 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Top Trending Events
          </h2>
          <p className="text-sm text-slate-400">
            Highly-coveted conferences and festivals with active registrations.
          </p>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          
          {/* MAJOR FEATURED LEFT CARD */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-md group cursor-pointer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => handleCategoryClick(techXEvent.category)}
          >
            {techXEvent.bannerUrl ? (
              <img 
                alt="Highlight Featured Banner" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src={techXEvent.bannerUrl}
              />
            ) : (
              <div className="absolute inset-0 bg-blue-900"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-3 bg-red-600/90 text-white rounded-full px-3 py-1 w-max">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest uppercase">Live Now</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2 leading-tight">
                {techXEvent.name}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {techXEvent.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  {techXEvent.currentAttendees >= 1000 
                    ? `${(techXEvent.currentAttendees / 1000).toFixed(1)}k Attending` 
                    : `${techXEvent.currentAttendees} Attending`}
                </span>
              </div>
            </div>
          </motion.div>

          {/* SECONDARY ROW SPAN CARD 1 right upper */}
          <motion.div 
            className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-md h-48 md:h-auto group cursor-pointer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={() => handleCategoryClick(aiEvent.category)}
          >
            {aiEvent.bannerUrl ? (
              <img 
                alt="AI summit banner" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src={aiEvent.bannerUrl}
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-800"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent md:bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                {aiEvent.name}
              </h3>
              <p className="text-gray-200 text-xs font-medium">
                Virtual & London • Oct 12-14
              </p>
            </div>
          </motion.div>

          {/* COMPACT CARD 2 bottom middle */}
          <motion.div 
            className="md:col-span-1 relative rounded-3xl overflow-hidden shadow-md h-48 md:h-auto group cursor-pointer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onClick={() => handleCategoryClick(rooftopEvent.category)}
          >
            {rooftopEvent.bannerUrl ? (
              <img 
                alt="Rooftop party icon" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src={rooftopEvent.bannerUrl}
              />
            ) : (
              <div className="absolute inset-0 bg-indigo-900"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <h4 className="text-white text-sm font-bold tracking-tight mb-1">
                {rooftopEvent.name}
              </h4>
              <span className="text-[10px] text-gray-200 bg-white/20 px-2 py-0.5 rounded-full w-max backdrop-blur-sm">
                Rooftop Meet
              </span>
            </div>
          </motion.div>

          {/* COMPACT CARD 3 bottom right */}
          <motion.div 
            className="md:col-span-1 relative rounded-3xl overflow-hidden shadow-md h-48 md:h-auto group cursor-pointer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={() => handleCategoryClick(designEvent.category)}
          >
            {designEvent.bannerUrl ? (
              <img 
                alt="Design Sprint illustration" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src={designEvent.bannerUrl}
              />
            ) : (
              <div className="absolute inset-0 bg-teal-900"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <h4 className="text-white text-sm font-bold tracking-tight mb-1">
                {designEvent.name}
              </h4>
              <span className="text-[10px] text-gray-200 bg-white/20 px-2 py-0.5 rounded-full w-max backdrop-blur-sm">
                Masterclass
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Pro Tip Call to action banner */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(99,102,241,0.25)] border border-white/5">
        <div className="max-w-xl text-left select-none">
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            🚀 Want to list your own event?
          </h3>
          <p className="text-sm text-indigo-100/90">
            Publish on our event feed immediately! Add customizable capacities, ticketing controls, and secure email receipts automatically.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('create')}
          className="bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md whitespace-nowrap"
        >
          Get Started
          <ArrowRight className="w-4 h-4 text-indigo-600" />
        </button>
      </section>
    </div>
  );
}
