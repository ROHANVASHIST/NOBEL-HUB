// =============================================
// NobelHub – Global TypeScript Types
// =============================================

export type Category =
  | 'Physics'
  | 'Chemistry'
  | 'Medicine'
  | 'Literature'
  | 'Peace'
  | 'Economic Sciences';

export interface Laureate {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthYear: number;
  birthPlace: string;
  nationality: string;
  photo: string;
  category: Category;
  year: number;
  motivation: string;
  biography: string;
  institution: string;
  lectureCount: number;
  paperCount: number;
  isAlive: boolean;
  externalUrl?: string;
}

export interface Lecture {
  id: string;
  title: string;
  speaker: string;
  speakerId: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string; // e.g. "48:22"
  category: Category;
  year: number;
  views: number;
  description: string;
  tags: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  laureateId: string;
  abstract: string;
  category: Category;
  year: number;
  citations: number;
  doi: string;
  journal: string;
  tags: string[];
  externalUrl?: string;
}

export interface AnalyticsStat {
  label: string;
  value: number | string;
  change?: string; // e.g. "+12%"
  positive?: boolean;
}

export interface CategoryDistribution {
  category: Category;
  count: number;
  percentage: number;
}

export interface YearlyTrend {
  year: number;
  prizes: number;
  female: number;
}

export interface SearchResult {
  type: 'laureate' | 'lecture' | 'paper';
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  year: number;
  thumbnail?: string;
}

export interface NavLink {
  label: string;
  path: string;
  icon?: string;
}
