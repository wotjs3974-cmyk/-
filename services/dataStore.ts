
import { PortfolioItem, PhilosophyData, ResumeData } from '../types';

const WORKS_KEY = 'portfolio_works_v4';
const PHILOSOPHY_KEY = 'portfolio_philosophy_v3';
const RESUME_KEY = 'portfolio_resume_v2';

const initialWorks: PortfolioItem[] = [
  {
    id: '001',
    projectLabel: 'PROJECT 01',
    title: 'Cyberpunk Combat Sound Redesign',
    subtitle: 'FPS Action / Combat Scenario',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://picsum.photos/seed/cyber/1200/800',
    intent: 'SOUND SHOULD NOT EXPLAIN EMOTIONS,\nIT SHOULD INDUCE CHOICES.',
    details: [
      { label: 'CONTEXT', value: 'NEO-SEOUL FPS' },
      { label: 'METHOD', value: '3-LAYER SYSTEM' },
      { label: 'RESULT', value: '+90% RECOGNITION' }
    ]
  }
];

const initialPhilosophy: PhilosophyData = {
  heroTitle: "SOUND SHOULD NOT EXPLAIN EMOTIONS,\nIT SHOULD INDUCE CHOICES.",
  heroSubtitle: "Beyond simple sound effects, my unwavering philosophy is to build a sound system that changes player behavior and completes the game mechanism.",
  principles: [
    { title: "Function First", desc: "Sound must always satisfy the function of the gameplay first. Clear delivery of information is more important than splendor." },
    { title: "Readable Sound", desc: "The current situation must be perfectly recognizable through the ears, not just the eyes. It provides auditory guidelines that reduce visual overload." },
    { title: "System Thinking", desc: "I aim for designs at the engine and system level, rather than a list of one-off sound effects. I build fluid and responsive sound environments." }
  ],
  process: [
    { title: "Context Analysis", desc: "Analysis of play situation and UX context" },
    { title: "Ref Breakdown", desc: "Deconstruction of game/movie/live references" },
    { title: "System Design", desc: "Engine/middleware design from an implementation perspective" },
    { title: "Iterative Test", desc: "Meticulous modification based on playtesting" }
  ]
};

const initialResume: ResumeData = {
  name: "SOUND DESIGNER",
  birthDate: "1997. 07. 28", // 기본값 설정
  email: "designer@example.com",
  phone: "010. 0000. 0000",
  location: "Seoul, Korea",
  address: "서울특별시 강남구 테헤란로",
  instagram: "https://instagram.com",
  moreWorksUrl: "https://notion.so",
  summary: "Focused on crafting immersive audio experiences through reactive system design and detailed sound implementation.",
  techStack: [
    { name: "Cubase / Reaper", description: "Precision sound design and layering" },
    { name: "Wwise / FMOD", description: "Real-time reactive audio system implementation" }
  ],
  experience: [
    { title: "Global AAA Project", period: "2023 - Present", description: "Redesigning core combat audio systems and optimizing bank management for multi-platform delivery." }
  ],
  education: [
    {
      school: "Art & Technology University",
      major: "Sound Design",
      status: "Graduated"
    }
  ]
};

export const getWorks = (): PortfolioItem[] => {
  const stored = localStorage.getItem(WORKS_KEY);
  if (!stored) return initialWorks;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialWorks;
  }
};

export const saveWorks = (items: PortfolioItem[]) => {
  localStorage.setItem(WORKS_KEY, JSON.stringify(items));
};

export const getPhilosophy = (): PhilosophyData => {
  const stored = localStorage.getItem(PHILOSOPHY_KEY);
  return stored ? JSON.parse(stored) : initialPhilosophy;
};

export const savePhilosophy = (data: PhilosophyData) => {
  localStorage.setItem(PHILOSOPHY_KEY, JSON.stringify(data));
};

export const getResume = (): ResumeData => {
  const stored = localStorage.getItem(RESUME_KEY);
  return stored ? JSON.parse(stored) : initialResume;
};

export const saveResume = (data: ResumeData) => {
  localStorage.setItem(RESUME_KEY, JSON.stringify(data));
};
