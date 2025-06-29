export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary?: string;
  status: ApplicationStatus;
  appliedDate: Date;
  lastUpdated: Date;
  jobUrl?: string;
  description?: string;
  notes?: string;
  contacts?: Contact[];
  interviews?: Interview[];
  documents?: Document[];
  priority: Priority;
}

export type ApplicationStatus = 
  | 'applied' 
  | 'interview' 
  | 'offer' 
  | 'rejected' 
  | 'withdrawn';

export type Priority = 'low' | 'medium' | 'high';

export interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
  notes?: string;
}

export interface Interview {
  id: string;
  type: string;
  date: Date;
  duration?: number;
  interviewer?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'portfolio' | 'other';
  url?: string;
  uploadDate: Date;
}

export interface Analytics {
  totalApplications: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  averageResponseTime: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsByMonth: Array<{ month: string; count: number }>;
  topCompanies: Array<{ company: string; count: number }>;
}