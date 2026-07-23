export interface ContactProps {
  id: number;
  name: string;
  href: string;
  isEmail?: boolean;
  hidden?: boolean;
}

export interface InformationProps {
  name: string;
  role: string;
  contact: ContactProps[];
}

export interface TechnicalSkillProps {
  id: number;
  title: string;
  description: string;
  skills: string[];
}

export interface LinkProps {
  name: string;
  href: string;
}

export type ProjectCompany = '홈플러스' | '아프리카TV' | '아이포유웍스';

export interface WorkExperienceProps {
  id: number;
  name: string;
  position: string;
  image?: string;
  period: [string, string];
}

export interface ProjectProps {
  id: string;
  company: ProjectCompany;
  name: string;
  description: string;
  period: [string, string];
  stack: string[];
  links?: LinkProps[];
}

export interface ActivityProps {
  id: number;
  name: string;
  period: [string, string];
  description: string;
}

export interface DataProps {
  information: InformationProps;
  technicalSkills: TechnicalSkillProps[];
  workExperience: WorkExperienceProps[];
  project: ProjectProps[];
  activity: ActivityProps[];
}
