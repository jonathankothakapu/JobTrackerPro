import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { Application } from '../../types';
import { StatusBadge } from '../Applications/StatusBadge';
import { useSettings } from '../../hooks/useSettings';

interface RecentApplicationsProps {
  applications: Application[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  const { settings, formatCurrency, formatDate } = useSettings();

  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No applications yet. Start by adding your first application!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{app.jobTitle}</h4>
              <p className="text-sm text-gray-600">{app.company}</p>
            </div>
            <StatusBadge status={app.status} />
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{app.location}</span>
            </div>
            {app.salary && settings.showSalaryInList && (
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{formatCurrency(app.salary)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(app.appliedDate)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}