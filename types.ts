
export interface PortfolioDetail {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  projectLabel?: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  intent: string;
  details: PortfolioDetail[];
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
  birthDate?: string; // 추가된 생년월일 필드
  email: string;
  phone: string;
  location: string;
  address: string;
  instagram: string;
  moreWorksUrl: string;
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
