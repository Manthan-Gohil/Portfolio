export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  domain: string;
  availability: string;
  portrait: string;
  heroChips: string[];
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
}

export interface Project {
  id: string;
  name: string;
  title: string[];
  featured: boolean;
  tags: string[];
  year: string;
  client: string;
  role: string;
  services: string;
  imgs: string[];
  intro: string;
  challenge: string;
  approach: string;
  architecture?: string[];
  features?: { title: string; desc: string }[];
  stats: [string, string][];
  github?: string;
  live?: string;
}

export interface Service {
  name: string;
  count: string;
  desc: string;
  chips: string[];
}

export interface Principle {
  name: string;
  count: string;
  desc: string;
  chips: string[];
}

export interface Award {
  name: string;
  detail: string;
  badge?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tech: string[];
  image?: string;
  stats?: string;
}

export interface Hackathon {
  title: string;
  rank: string;
  event: string;
  date: string;
  project: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  highlight?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  services: Service[];
  principles: Principle[];
  awards: Award[];
  experiences: Experience[];
  hackathons: Hackathon[];
  skills: SkillCategory[];
}