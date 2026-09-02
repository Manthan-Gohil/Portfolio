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
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  services: Service[];
  principles: Principle[];
  awards: Award[];
}