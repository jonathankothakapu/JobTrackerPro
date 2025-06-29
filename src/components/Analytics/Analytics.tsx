import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Building,
  Clock,
  Target,
  Award,
  Download,
  Filter,
  FileText,
  Phone
} from 'lucide-react';
import { Application } from '../../types';
import { useAnalytics } from '../../hooks/useAnalytics';
import { StatsCard } from '../Dashboard/StatsCard';
import { StatusChart } from '../Dashboard/StatusChart';
import { ApplicationTrendChart } from './ApplicationTrendChart';
import { SalaryAnalysisChart } from './SalaryAnalysisChart';
import { CompanyPerformance } from './CompanyPerformance';
import { ConversionFunnel } from './ConversionFunnel';
import { TimeToResponseChart } from './TimeToResponseChart';

interface AnalyticsProps {
  applications: Application[];
}

export function Analytics({ applications }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m' | '1y'>('90d');
  const analytics = useAnalytics(applications);

  const filteredApplications = React.useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case '30d':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return applications.filter(app => app.appliedDate >= cutoffDate);
  }, [applications, timeRange]);

  const exportReport = () => {
    const textContent = [
      'Job Title|Company|Location|Status|Applied Date|Salary|Priority|Notes',
      ...applications.map(app => [
        app.jobTitle,
        app.company,
        app.location,
        app.status,
        app.appliedDate.toLocaleDateString(),
        app.salary || '',
        app.priority,
        app.notes || ''
      ].join('|'))
    ].join('\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into your job search performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Applications"
          value={analytics.totalApplications}
          icon={FileText}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Response Rate"
          value={`${analytics.responseRate.toFixed(1)}%`}
          icon={Phone}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Interview Rate"
          value={`${analytics.interviewRate.toFixed(1)}%`}
          icon={Calendar}
          color="yellow"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Offer Rate"
          value={`${analytics.offerRate.toFixed(1)}%`}
          icon={Award}
          color="purple"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Active Applications"
          value={analytics.applicationsByStatus.applied + analytics.applicationsByStatus.interview}
          icon={Target}
          color="blue"
          trend={{ value: 7, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
          <StatusChart data={analytics.applicationsByStatus} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Trends</h3>
          <ApplicationTrendChart data={analytics.applicationsByMonth} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
          <ConversionFunnel applications={filteredApplications} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Performance</h3>
          <CompanyPerformance companies={analytics.topCompanies} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Analysis</h3>
          <SalaryAnalysisChart applications={filteredApplications} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Analysis</h3>
          <TimeToResponseChart applications={filteredApplications} />
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Avg. Response Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {analytics.averageResponseTime.toFixed(0)} days
          </p>
          <p className="text-sm text-gray-600">
            Time from application to first response
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Building className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Companies Applied</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {new Set(applications.map(app => app.company)).size}
          </p>
          <p className="text-sm text-gray-600">
            Unique companies in your pipeline
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Avg. Salary Range</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            $125K
          </p>
          <p className="text-sm text-gray-600">
            Average of posted salary ranges
          </p>
        </div>
      </div>
    </div>
  );
}