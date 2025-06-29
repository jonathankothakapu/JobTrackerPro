import { useMemo } from 'react';
import { Application, Analytics, ApplicationStatus } from '../types';

export function useAnalytics(applications: Application[]): Analytics {
  return useMemo(() => {
    const total = applications.length;
    
    if (total === 0) {
      return {
        totalApplications: 0,
        responseRate: 0,
        interviewRate: 0,
        offerRate: 0,
        averageResponseTime: 0,
        applicationsByStatus: {
          'applied': 0,
          'interview': 0,
          'offer': 0,
          'rejected': 0,
          'withdrawn': 0
        },
        applicationsByMonth: [],
        topCompanies: []
      };
    }

    // Calculate rates
    const responded = applications.filter(app => 
      ['interview', 'offer'].includes(app.status)
    ).length;
    
    const interviewed = applications.filter(app => 
      ['interview', 'offer'].includes(app.status)
    ).length;
    
    const offers = applications.filter(app => app.status === 'offer').length;

    // Applications by status
    const applicationsByStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<ApplicationStatus, number>);

    // Fill in missing statuses with 0
    const allStatuses: ApplicationStatus[] = [
      'applied', 'interview', 'offer', 'rejected', 'withdrawn'
    ];
    allStatuses.forEach(status => {
      if (!(status in applicationsByStatus)) {
        applicationsByStatus[status] = 0;
      }
    });

    // Applications by month
    const monthCounts = applications.reduce((acc, app) => {
      const month = app.appliedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const applicationsByMonth = Object.entries(monthCounts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Top companies
    const companyCounts = applications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCompanies = Object.entries(companyCounts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Average response time (simplified calculation)
    const responseTimes = applications
      .filter(app => app.status !== 'applied')
      .map(app => {
        const diffTime = app.lastUpdated.getTime() - app.appliedDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
      });
    
    const averageResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;

    return {
      totalApplications: total,
      responseRate: (responded / total) * 100,
      interviewRate: (interviewed / total) * 100,
      offerRate: (offers / total) * 100,
      averageResponseTime,
      applicationsByStatus,
      applicationsByMonth,
      topCompanies
    };
  }, [applications]);
}