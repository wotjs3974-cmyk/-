
export interface PortfolioDetail {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  intent: string; // Core highlight
  details: PortfolioDetail[]; // Dynamic details
  ctaButtonName?: string;
  ctaLink?: string;
}

export interface PhilosophyData {
  heroTitle: string;
  heroSubtitle: string;
  principles: {
    title: string;
    desc: string;
  }[];
  process: {
    title: string;
    desc: string;
  }[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  youtube: string;
  soundcloud: string;
  summary: string;
  techStack: {
    name: string;
    description: string;
  }[];
  experience: {
    title: string;
    period: string;
    description: string;
  }[];
  education: {
    school: string;
    major: string;
    status: string;
  }[];
}
