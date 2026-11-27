export interface PortfolioTexts {
  profilePhoto: string;
  heroBadge: string;
  heroGreeting: string;
  heroName: string;
  heroRole: string;
  heroBio: string;
  cardName: string;
  cardSub: string;
  linkedinUrl: string;
  githubUrl: string;
  emailUrl: string;
  aboutLead: string;
  aboutP1: string;
  aboutP2: string;
  hlNum1: string;
  hlLabel1: string;
  hlNum2: string;
  hlLabel2: string;
  hlNum3: string;
  hlLabel3: string;
  hlNum4: string;
  hlLabel4: string;
  factName: string;
  factRole: string;
  factSpec: string;
  factLoc: string;
  factStack: string;
  factAvail: string;
  contactLead: string;
  resumeName: string;
  resumeRole: string;
  resumeContact: string;
  resumeSummary: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Skill {
  id: string;
  category: string;
  title: string;
  icon: string;
  items: string[];
}

export interface ProjectCategory {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  url: string;
  liveUrl?: string;
  theme?: string;
  deepDive?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  badge: string;
  date: string;
  desc: string;
  tags: string[];
  img?: string;
  content?: string;
  githubSlug?: string;
  githubRaw?: string;
}

export interface SkillsMatrixItem {
  label: string;
  value: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface ResumeProject {
  id: string;
  title: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  major: string;
  year: string;
}

export interface ResumeData {
  skillsMatrix: SkillsMatrixItem[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications: string[];
  education: ResumeEducation[];
}
