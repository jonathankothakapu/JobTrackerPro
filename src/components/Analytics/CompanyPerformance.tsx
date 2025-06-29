import React from 'react';

interface CompanyPerformanceProps {
  companies: Array<{ company: string; count: number }>;
}

export function CompanyPerformance({ companies }: CompanyPerformanceProps) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No company data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...companies.map(c => c.count));

  return (
    <div className="space-y-3">
      {companies.slice(0, 8).map((company, index) => {
        const percentage = (company.count / maxCount) * 100;
        
        return (
          <div key={company.company} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 truncate">
                {company.company}
              </span>
              <span className="text-sm text-gray-500">{company.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}