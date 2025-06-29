import { useState, useEffect } from 'react';
import { Application, ApplicationStatus, Priority } from '../types';

const STORAGE_KEY = 'jobtracker-applications';

// Sample data for demonstration
const sampleApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    status: 'interview',
    appliedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-20'),
    jobUrl: 'https://example.com/job/1',
    description: 'Looking for an experienced frontend developer...',
    notes: 'Great company culture, remote-friendly',
    priority: 'high',
    contacts: [],
    interviews: [],
    documents: []
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    status: 'interview',
    appliedDate: new Date('2024-01-18'),
    lastUpdated: new Date('2024-01-22'),
    priority: 'medium',
    contacts: [],
    interviews: [],
    documents: []
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    company: 'InnovateLabs',
    location: 'New York, NY',
    salary: '$110,000 - $140,000',
    status: 'applied',
    appliedDate: new Date('2024-01-20'),
    lastUpdated: new Date('2024-01-20'),
    priority: 'medium',
    contacts: [],
    interviews: [],
    documents: []
  },
  {
    id: '4',
    jobTitle: 'Software Engineer',
    company: 'BigTech Inc',
    location: 'Seattle, WA',
    salary: '$140,000 - $180,000',
    status: 'offer',
    appliedDate: new Date('2024-01-10'),
    lastUpdated: new Date('2024-01-25'),
    priority: 'high',
    contacts: [],
    interviews: [],
    documents: []
  },
  {
    id: '5',
    jobTitle: 'Frontend Developer',
    company: 'DesignStudio',
    location: 'Los Angeles, CA',
    status: 'rejected',
    appliedDate: new Date('2024-01-12'),
    lastUpdated: new Date('2024-01-19'),
    priority: 'low',
    contacts: [],
    interviews: [],
    documents: []
  }
];

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      const applicationsWithDates = parsed.map((app: any) => ({
        ...app,
        appliedDate: new Date(app.appliedDate),
        lastUpdated: new Date(app.lastUpdated),
        interviews: app.interviews?.map((interview: any) => ({
          ...interview,
          date: new Date(interview.date)
        })) || [],
        documents: app.documents?.map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate)
        })) || []
      }));
      setApplications(applicationsWithDates);
    } else {
      // Initialize with sample data
      setApplications(sampleApplications);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleApplications));
    }
    setLoading(false);
  }, []);

  const saveApplications = (newApplications: Application[]) => {
    setApplications(newApplications);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newApplications));
  };

  const addApplication = (application: Omit<Application, 'id' | 'appliedDate' | 'lastUpdated'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      appliedDate: new Date(),
      lastUpdated: new Date(),
      contacts: [],
      interviews: [],
      documents: []
    };
    const updated = [...applications, newApplication];
    saveApplications(updated);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    const updated = applications.map(app => 
      app.id === id 
        ? { ...app, ...updates, lastUpdated: new Date() }
        : app
    );
    saveApplications(updated);
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    saveApplications(updated);
  };

  const updateStatus = (id: string, status: ApplicationStatus) => {
    updateApplication(id, { status });
  };

  return {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    updateStatus
  };
}