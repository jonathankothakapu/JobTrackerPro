import React from 'react';
import { Application } from '../../types';

interface ConversionFunnelProps {
  applications: Application[];
}

export function ConversionFunnel({ applications }: ConversionFunnelProps) {
  const total = applications.length;
  const interviewed = applications.filter(app => app.status === 'interview').length;
  const offers = applications.filter(app => app.status === 'offer').length;

  const stages = [
    { label: 'Applications', count: total, color: 'bg-blue-500' },
    { label: 'Interviews', count: interviewed, color: 'bg-yellow-500' },
    { label: 'Offers', count: offers, color: 'bg-green-500' },
  ];

  if (total === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const percentage = total > 0 ? (stage.count / total) * 100 : 0;
        const width = Math.max(percentage, 5);
        
        return (
          <div key={stage.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{stage.label}</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                <span className="text-xs text-gray-500 ml-1">
                  ({percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
              <div
                className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-center text-white text-sm font-medium`}
                style={{ width: `${width}%` }}
              >
                {stage.count > 0 && (
                  <span className="px-2">{stage.count}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}