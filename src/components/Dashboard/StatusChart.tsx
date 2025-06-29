import React from 'react';
import { ApplicationStatus } from '../../types';

interface StatusChartProps {
  data: Record<ApplicationStatus, number>;
}

const statusConfig = {
  'applied': { label: 'Applied', color: 'bg-blue-500' },
  'interview': { label: 'Interview', color: 'bg-yellow-500' },
  'offer': { label: 'Offer', color: 'bg-green-500' },
  'rejected': { label: 'Rejected', color: 'bg-red-500' },
  'withdrawn': { label: 'Withdrawn', color: 'bg-gray-500' },
};

export function StatusChart({ data }: StatusChartProps) {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([status, count]) => {
        const config = statusConfig[status as ApplicationStatus];
        const percentage = total > 0 ? (count / total) * 100 : 0;
        
        return (
          <div key={status} className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{config.label}</span>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${config.color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}