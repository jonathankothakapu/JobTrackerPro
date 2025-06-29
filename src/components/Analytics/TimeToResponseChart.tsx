import React from 'react';
import { Clock } from 'lucide-react';
import { Application } from '../../types';

interface TimeToResponseChartProps {
  applications: Application[];
}

export function TimeToResponseChart({ applications }: TimeToResponseChartProps) {
  const responseTimes = applications
    .filter(app => app.status !== 'applied')
    .map(app => {
      const diffTime = app.lastUpdated.getTime() - app.appliedDate.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { days, status: app.status };
    });

  if (responseTimes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>No response data available</p>
      </div>
    );
  }

  const avgResponseTime = responseTimes.reduce((sum, rt) => sum + rt.days, 0) / responseTimes.length;
  
  // Create time buckets
  const buckets = [
    { label: '1-3 days', min: 1, max: 3 },
    { label: '4-7 days', min: 4, max: 7 },
    { label: '1-2 weeks', min: 8, max: 14 },
    { label: '2-4 weeks', min: 15, max: 28 },
    { label: '1+ month', min: 29, max: Infinity },
  ];

  const bucketCounts = buckets.map(bucket => ({
    ...bucket,
    count: responseTimes.filter(rt => 
      rt.days >= bucket.min && rt.days <= bucket.max
    ).length
  }));

  const maxBucketCount = Math.max(...bucketCounts.map(b => b.count));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">Average Response Time</p>
        <p className="text-2xl font-bold text-gray-900">
          {avgResponseTime.toFixed(1)} days
        </p>
      </div>

      <div className="space-y-3">
        {bucketCounts.map((bucket, index) => {
          const percentage = maxBucketCount > 0 ? (bucket.count / maxBucketCount) * 100 : 0;
          
          return (
            <div key={bucket.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {bucket.label}
                </span>
                <span className="text-sm text-gray-500">{bucket.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(percentage, bucket.count > 0 ? 5 : 0)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}