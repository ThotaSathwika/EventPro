export type EventStatus = 'Live' | 'Upcoming' | 'Done';

export interface EventItem {
  id: string;
  name: string;
  category: string;
  location: string;
  venue?: string;
  description: string;
  startDate: string;
  endDate?: string;
  maxCapacity: number;
  currentAttendees: number;
  ticketPrice: number;
  contactEmail: string;
  phoneNumber: string;
  bannerUrl: string;
  status: EventStatus;
  userRegistered: boolean;
  userWaitlisted?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  colorClass: string;
  borderColorClass: string;
}

export const SeedCategories: CategoryItem[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'AGMs, Product Launches, and Team Building summits.',
    iconName: 'Briefcase',
    colorClass: 'bg-blue-600/10 text-blue-600',
    borderColorClass: 'hover:border-blue-600',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Elegant ceremonies and unforgettable receptions.',
    iconName: 'Heart',
    colorClass: 'bg-[#00D1C1]/10 text-[#00D1C1]',
    borderColorClass: 'hover:border-[#00D1C1]',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    description: 'From themed parties to milestone celebrations.',
    iconName: 'Cake',
    colorClass: 'bg-[#FF4D4D]/10 text-[#FF4D4D]',
    borderColorClass: 'hover:border-[#FF4D4D]',
  },
  {
    id: 'conferences',
    name: 'Conferences',
    description: 'Large scale knowledge sharing and networking events.',
    iconName: 'Users',
    colorClass: 'bg-indigo-600/10 text-indigo-600',
    borderColorClass: 'hover:border-indigo-600',
  },
  {
    id: 'workshops',
    name: 'Workshops',
    description: 'Skill-focused training sessions and masterclasses.',
    iconName: 'Lightbulb',
    colorClass: 'bg-zinc-600/10 text-zinc-900',
    borderColorClass: 'hover:border-zinc-800',
  },
  {
    id: 'concerts',
    name: 'Concerts',
    description: 'Live music, festivals, and stage performances.',
    iconName: 'Music',
    colorClass: 'bg-amber-600/10 text-amber-600',
    borderColorClass: 'hover:border-amber-600',
  },
];

export const SeedEvents: EventItem[] = [
  {
    id: 'event-1',
    name: 'TechX Synergy 2024',
    category: 'Conferences',
    location: 'New York, NY',
    venue: 'Barclays Center',
    description: 'A high-energy electronic music and technology fusion festival with a massive crowd, laser lights in electric blue and vibrant magenta. The main stage is futuristic with glowing geometric patterns.',
    startDate: '2024-10-12T18:00',
    endDate: '2024-10-14T23:00',
    maxCapacity: 15000,
    currentAttendees: 12400,
    ticketPrice: 1499,
    contactEmail: 'synergy@techx.org',
    phoneNumber: '+1 212 555 0199',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPFROB0-kE3YI_3gGOHOWs64wl8w5txuuReA2cVwMqaKNjUo5nUbG_SKMif6_PLYci7I6QqH1JDMyRop49xs7ZcHNPwP27v10NpueRw97QVy9KmyKBaVSY7rG7AIPE2Q_LPJX43VjJe73FTzVuGSBWC1Bzz6jVxj7Lk77NXnNUNbpw5UumTxl3ckUz5xRaHcyrJgobjs2IRegh4pzxYsPbxPlduDDZ45LzSDZ2F4fiOx1-gPPopTE4XFoLMeRDy_bcHzsxXM2bPVF2',
    status: 'Live',
    userRegistered: true,
  },
  {
    id: 'event-2',
    name: 'Global AI Summit',
    category: 'Conferences',
    location: 'Virtual & London',
    venue: 'ExCeL London & Online',
    description: 'A clean, minimalist corporate auditorium filled with professional attendees listening to top speakers. The lighting is soft and corporate-high, highlighting the crisp white architecture and the speaker\'s podium.',
    startDate: '2024-10-12T09:00',
    endDate: '2024-10-14T18:00',
    maxCapacity: 5000,
    currentAttendees: 4200,
    ticketPrice: 2999,
    contactEmail: 'summit@global.ai',
    phoneNumber: '+44 20 7946 0958',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkf1MKKgYnsJZjkV-CS7qSRjnCEV_RBS_YDeNSarqrVCc68PHQiaSHlxbYmsZBsl2LxbUnlqRPwoxcQV2RRkOCNfZaABVA4L1_DdA_dZatOobt3myID0hgCOzYtWTRNHq-zNTg3P8yO63lG2OxGNGp8aO6EEaRrpsi95Ms-3oqQ08mDEPHAwFZRPeKVsw_bQpsZdy31JOaoQcB8EqwLFfbnPIwSb95wVAZ264p2UpWVi93bt-jKX_Y6fmxs5oJR15nHeA1I0gHQcCd',
    status: 'Upcoming',
    userRegistered: false,
  },
  {
    id: 'event-3',
    name: 'Global Tech Summit 2024',
    category: 'Conferences',
    location: 'San Francisco, CA',
    venue: 'Moscone Center',
    description: 'A high-energy tech conference hall with a large digital screen displaying vibrant abstract patterns. The room is filled with professional attendees illuminated by cool blue and teal stage lighting.',
    startDate: '2024-10-24T09:00',
    endDate: '2024-10-26T17:00',
    maxCapacity: 1000,
    currentAttendees: 840,
    ticketPrice: 999,
    contactEmail: 'contact@techsummit.io',
    phoneNumber: '+1 415 555 2671',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBStjBu8mV1MRycIxTXX5FYx5hSYNPPrWxifbcOf2gNsnLfzQMpof52-38po649VrBIV2o3Uzbv0FOqI9bb1jXhw5Uj3K5c-uIaFrQgAOAhhlzANeugKg8NTua06_kacMYNSarmnmZfSmIaq2LGt7YFKYqV0n6dvTIdvzZoRpRFDJ5m7c1L55Q20SYAOSwJdqC0icnE78IlOgabWlogvTMzAe2MVIlCul-JIGAtNUjEbd8DxQKsMVp5_W_lIzk2SE0xLo0VqCYJra-t',
    status: 'Live',
    userRegistered: true,
  },
  {
    id: 'event-4',
    name: 'Summer Beats Festival',
    category: 'Concerts',
    location: 'Austin, TX',
    venue: 'Zilker Park Outdoor Stage',
    description: 'A festive outdoor night concert with a crowd of people silhouetted against a bright stage with glowing lights and warm yellow tones. The mood is celebratory, joyful, and energetic.',
    startDate: '2024-06-15T16:00',
    endDate: '2024-06-15T23:30',
    maxCapacity: 12000,
    currentAttendees: 4500,
    ticketPrice: 499,
    contactEmail: 'tickets@summerbeats.com',
    phoneNumber: '+1 512 555 4280',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcWnOFiF3EZikPCqOQgeHLEHpLKfsxRvijTGnYZ8NxjsE2KSI9XvLFBSXGU261gh7wiyJTKznv_Ga3HpmYrecEAIgHUtEwA7nR5AzgfwxnkvUmO-ZRiLInYZQ5TmA4rNZLT9yErWK43S8nA32xi3_s_w0UjJdENtwBgbwaWump571AUY1293Kk_niN6pgr6xMS_E6nr1DYurm5HvhYwkKsGESgCWmbt-90xl3c22SpyAiZH0IeujjuGKrDFdBEnCyYVWX3T4LLHqAk',
    status: 'Upcoming',
    userRegistered: false,
  },
  {
    id: 'event-5',
    name: 'Exec Leadership Forum',
    category: 'Corporate',
    location: 'New York, NY',
    venue: 'The Plaza Hotel Ballroom',
    description: 'A professional corporate executive forum and gala dinner set in a grand ballroom with tall ceilings and elegant architectural details. Bathed in warm and inviting ambient lighting.',
    startDate: '2024-07-02T18:00',
    endDate: '2024-07-02T22:00',
    maxCapacity: 200,
    currentAttendees: 198,
    ticketPrice: 4999,
    contactEmail: 'exec@leadershipforum.com',
    phoneNumber: '+1 212 555 0110',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEX5pwiblAHluBr_jLHMpR7oehpSs08qiHxSI41SnndMdmYsn7sBh0ckGf1qqxg_yfVJmDxfHPHViF1TZaL42IN8iEl3mYJNItZGK_nxz0KvN3O-SNSoP5G0G-2hfjUi_8RNXnOB-2-x5mjVVXrc-BZsW4ceOHnH-iTI4KUchamowFAcu_K7q8wK24To-AtTTZb_3_yD8KLFVgTzQstNcwuYwlAugT2F78ap7SU-RUBjF9NJDHev9PIV5eK8BAGwux9Y7gqnAX-oE2',
    status: 'Upcoming',
    userRegistered: false,
  },
  {
    id: 'event-6',
    name: 'Rooftop Networking',
    category: 'Corporate',
    location: 'Los Angeles, CA',
    venue: 'The Sky Loft Garden',
    description: 'An intimate rooftop garden party during sunset, with warm golden light illuminating premium guests having drinks. String lights are draped across the beautiful setting.',
    startDate: '2024-08-12T17:30',
    endDate: '2024-08-12T21:00',
    maxCapacity: 150,
    currentAttendees: 95,
    ticketPrice: 99,
    contactEmail: 'skyloft@networking.com',
    phoneNumber: '+1 310 555 9012',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg43k4l65Xfy3C9pPevnjRqxtwUm3Ks4d84H8g0SSZTR36YaDjri24pSB_cKPjYonWYUs1gquO4OB9luREuw6IZvcNdu6QoRHt1F8P4iFP2P9v97_pZAPfdHunaSmAg0pVnDnmHqGtQRpK_p67PzCzn4bMplK5R2GUV8lue4o2Ftu7CV_bGp0QOvKM3iPgkLlkX9RkRVFv6womuF5t8c7wcCqclvobvGUNBkeo4RW4Up4K4FvMMRyLqHu4zQhnvMPPpu1T-hWSWDIl',
    status: 'Upcoming',
    userRegistered: false,
  },
  {
    id: 'event-7',
    name: 'Design Sprint Masterclass',
    category: 'Workshops',
    location: 'Chicago, IL',
    venue: 'Co-Create Hub Studio-A',
    description: 'A high-tech workshop setting with participants collaborating around a large touchscreen table. The room is modern, bright, and optimized for teamwork and rapid prototyping.',
    startDate: '2024-09-05T09:00',
    endDate: '2024-09-05T17:00',
    maxCapacity: 30,
    currentAttendees: 22,
    ticketPrice: 450,
    contactEmail: 'education@sprintmaster.io',
    phoneNumber: '+1 312 555 7890',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdz52JWm-wQSACXRDk_-O-pmZslyRAxcMNOym7KbOaxHohdach5n5gXLBL0XwI7WIkIzIJMFQSUQbgAJKWfJvJ-Hyf7-1u5lrZa0yhSvgeFHyXTRtGNM8j4WOKPf_f-1N7uQNrTwKuRjIq7qDnuK1UvyCMswPfd41kZgcvhw42_QHoHgveb0b49xFXwiHrixQ1A9Q6xMeyvgpuV0K3qZSA_SyeP09FVDbtCTJFQ4dC03pUy3DNpgG7rVT3WRYoXsobiEpu_KDbIfO0',
    status: 'Upcoming',
    userRegistered: false,
  },
  {
    id: 'event-8',
    name: 'Design Ops 2.0',
    category: 'Workshops',
    location: 'Virtual Workshop',
    venue: 'Zoom & Miro Interactive Canvas',
    description: 'A remote deep-dive session focused on optimizing product and UI design pipelines across globally distributed engineering and design organizations.',
    startDate: '2024-11-02T10:00',
    endDate: '2024-11-02T14:00',
    maxCapacity: 200,
    currentAttendees: 45,
    ticketPrice: 199,
    contactEmail: 'ops-summit@designops.co',
    phoneNumber: '+1 800 555 0101',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvmi3yHZbmyxwd4tm-T7nU_FJrp177a4gGhVjgusaVsiKM9pPw3Ssw-HRn75szfbs3h7dZ_hMLCC_rrNz3t6GGEjgfb41ld6hVGfcbub3NVUXY5njib0-gFcosJOKBkbQXK9NcvQmwEPHIicx8dNmk7qpF0gezi-5l7bJHXJRlqaaR-4jj_-ZoWscrO-tHhZCo_GyLfDS-gWmNukdF46InA6Yl_49ptBLk8auxVpWoqs3jlFpyJLXp8MttJ-Mxt27VaqU7xq1ZiAQc',
    status: 'Upcoming',
    userRegistered: true,
  },
  {
    id: 'event-9',
    name: 'Crypto Roundtable',
    category: 'Workshops',
    location: 'London Hub',
    venue: 'Level 39 Canary Wharf',
    description: 'An executive roundtable and expert panel debate surrounding layer-1 networks, digital finance standards, and multi-asset compliance.',
    startDate: '2024-10-30T15:00',
    endDate: '2024-10-30T18:00',
    maxCapacity: 1500,
    currentAttendees: 1200,
    ticketPrice: 250,
    contactEmail: 'london@cryptoroundtable.com',
    phoneNumber: '+44 20 7946 0002',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDziwoL8PpKhgMynCb4R3KIi6hNTt6E6dmv-iq_6OK3yrMCEeRjT9Dfu1fv3XVjST34aRmOmj3wYDMALK8RHhC8i0CGOJf_9W4UXmWK84SM_T1x3kTceF9tqM1QEzLbyjn-YqjA5Ueg6CbnI3dPjq5h8ji0A1Az2XCEgqNV9tl7-YTiHndKrFTmtWPxFGk7d826JXa7BfHr59TGNYND1Qd8KM4ov6HI8_fzJCCT8gJRoOlNtzIhWuwAxQQ8P2e8-BWcCq9AUGws1Bjj',
    status: 'Live',
    userRegistered: true,
  },
  {
    id: 'event-10',
    name: 'Marketing Expo 2023',
    category: 'Corporate',
    location: 'Chicago, IL',
    venue: 'McCormick Place Convention',
    description: 'Our annual world expo tracing future channels, AI copywriters, automation funnels, and tracking metrics for professional marketers.',
    startDate: '2023-09-15T09:00',
    endDate: '2023-09-15T17:00',
    maxCapacity: 500,
    currentAttendees: 500,
    ticketPrice: 299,
    contactEmail: 'expo@mktgchannel.org',
    phoneNumber: '+1 312 555 4567',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1uCsI06V8z2U_xe8GUhV1RZTdDePavsYq0M2vBltoThfFmSEBIyTIGLtIE2EBbzi-QYDQXk_dnE-ep2JF2NIbxZGw8PPb2ZLAtUYYajMoiLrnI99Mr2V7hNrEP5bM4v2YAZaxNX6fFmXYrH4w1iNJe1Tf4vykl7q21PKkr0-d7PdYkIEfisRdpg11VOr902v4QQeBtz-EJfqtTKCurkiJhGRUaoADxriPlPJhfmOwSjBJNlKpbdEPGDaKAIjXQLEkjt_NWaTWeedf',
    status: 'Done',
    userRegistered: true,
  },
  {
    id: 'event-11',
    name: 'WebDev Meetup',
    category: 'Workshops',
    location: 'Online',
    venue: 'Google Meet Livestream',
    description: 'An informal and collaborative technical workshop surrounding modern frontend workflows, state containers, and micro-applications.',
    startDate: '2023-08-28T19:00',
    endDate: '2023-08-28T21:00',
    maxCapacity: 500,
    currentAttendees: 340,
    ticketPrice: 0,
    contactEmail: 'support@webdevmeetup.net',
    phoneNumber: '+1 800 555 0928',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvmi3yHZbmyxwd4tm-T7nU_FJrp177a4gGhVjgusaVsiKM9pPw3Ssw-HRn75szfbs3h7dZ_hMLCC_rrNz3t6GGEjgfb41ld6hVGfcbub3NVUXY5njib0-gFcosJOKBkbQXK9NcvQmwEPHIicx8dNmk7qpF0gezi-5l7bJHXJRlqaaR-4jj_-ZoWscrO-tHhZCo_GyLfDS-gWmNukdF46InA6Yl_49ptBLk8auxVpWoqs3jlFpyJLXp8MttJ-Mxt27VaqU7xq1ZiAQc',
    status: 'Done',
    userRegistered: true,
  },
  {
    id: 'event-12',
    name: 'Annual Awards 2023',
    category: 'Corporate',
    location: 'Houston, TX',
    venue: 'George R. Brown Convention Center',
    description: 'The elegant annual corporate prize-giving ceremony honoring our leading teams, industry champions, and outstanding projects.',
    startDate: '2023-09-30T19:00',
    endDate: '2023-09-30T23:00',
    maxCapacity: 850,
    currentAttendees: 850,
    ticketPrice: 1200,
    contactEmail: 'awards@corporateworld.com',
    phoneNumber: '+1 713 555 0200',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoDmwUamhGY2wgRQLR7iIyu7VSGwat2ygHsGSinfmcn--_Elpvj0wnARPe1gIYKpQzi0FMt61PW944bTvj7Ajn8rYAPLFcSnFuhMvW4h4LPAaJZPmM8XAOYJ2te3ZwHSIcGQFNfLZObohLbXgdFwzUoHWceb2JMBiERmHyoqRlaHnH1-FtIrGw1-aauNSUZ1U6jWeyIOoAY8jqQwelpWDrEM6GEyb1ZbxxbGV_9QVhttAhgcb1FYOQ7f8soD7-KPrV6ps6umWI1jzG',
    status: 'Done',
    userRegistered: false,
  }
];

export interface AppUser {
  id: string;
  email: string;
  password?: string; // Standardized local auth storing (simulated hash)
  role: 'admin' | 'user';
  name: string;
  isBanned?: boolean;
  registrationDate: string;
  profilePic?: string;
}

export interface ThemePalette {
  id: string;
  name: string;
  primaryBg: string; // hex color code
  bgGradient: string; // from gradient color representation
  accentColor: string; // text color class (e.g. text-indigo-400)
  accentBg: string; // button background class (e.g. bg-indigo-600)
  accentHoverBg: string; // button hover class (e.g. hover:bg-indigo-500)
  glowShadow: string; // shadow class for active premium highlights
  bubbleColors: string[]; // background overlay mesh bubble colors
}

export const SeedThemes: ThemePalette[] = [
  {
    id: 'indigo',
    name: 'Indigo Velvet',
    primaryBg: '#060b19',
    bgGradient: 'from-indigo-600',
    accentColor: 'text-indigo-400',
    accentBg: 'bg-indigo-600',
    accentHoverBg: 'hover:bg-indigo-400',
    glowShadow: 'shadow-[0_4px_14px_rgba(99,102,241,0.25)]',
    bubbleColors: ['bg-indigo-600', 'bg-purple-600', 'bg-blue-500']
  },
  {
    id: 'emerald',
    name: 'Emerald Aurora',
    primaryBg: '#010c0a',
    bgGradient: 'from-emerald-600',
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-600',
    accentHoverBg: 'hover:bg-emerald-500',
    glowShadow: 'shadow-[0_4px_14px_rgba(16,185,129,0.25)]',
    bubbleColors: ['bg-emerald-600', 'bg-teal-600', 'bg-cyan-500']
  },
  {
    id: 'rose',
    name: 'Crimson Fusion',
    primaryBg: '#0f0208',
    bgGradient: 'from-rose-600',
    accentColor: 'text-rose-400',
    accentBg: 'bg-rose-600',
    accentHoverBg: 'hover:bg-rose-500',
    glowShadow: 'shadow-[0_4px_14px_rgba(244,63,94,0.25)]',
    bubbleColors: ['bg-rose-600', 'bg-pink-600', 'bg-purple-500']
  },
  {
    id: 'amber',
    name: 'Amber Horizon',
    primaryBg: '#0b0502',
    bgGradient: 'from-amber-600',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-600',
    accentHoverBg: 'hover:bg-amber-500',
    glowShadow: 'shadow-[0_4px_14px_rgba(245,158,11,0.25)]',
    bubbleColors: ['bg-amber-600', 'bg-orange-600', 'bg-red-500']
  },
  {
    id: 'obsidian',
    name: 'Obsidian Cyber',
    primaryBg: '#07080a',
    bgGradient: 'from-zinc-600',
    accentColor: 'text-slate-300',
    accentBg: 'bg-zinc-700',
    accentHoverBg: 'hover:bg-zinc-600',
    glowShadow: 'shadow-[0_4px_14px_rgba(148,163,184,0.15)]',
    bubbleColors: ['bg-zinc-800', 'bg-slate-800', 'bg-zinc-700']
  }
];

export const SeedUsers: AppUser[] = [
  {
    id: 'user-1',
    email: 'sathwikathota20@gmail.com',
    role: 'admin',
    name: 'Sathwika Thota',
    registrationDate: '2025-01-15T10:30',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-2',
    email: 'guest@eventpro.io',
    role: 'user',
    name: 'Guest Attendee',
    registrationDate: '2025-02-18T14:22',
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-3',
    email: 'clara.wood@gmail.com',
    role: 'user',
    name: 'Clara Wood',
    registrationDate: '2025-03-01T11:05',
    profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-4',
    email: 'admin@eventpro.io',
    role: 'admin',
    name: 'System Root Admin',
    registrationDate: '2024-11-20T09:00',
    profilePic: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-5',
    email: 'banned_user@eventpro.io',
    role: 'user',
    name: 'Banned Poster',
    registrationDate: '2025-03-24T18:00',
    isBanned: true,
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

