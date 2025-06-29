import React from 'react';

interface ApplicationTrendChartProps {
  data: Array<{ month: string; count: number }>;
}

export function ApplicationTrendChart({ data }: ApplicationTrendChartProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2 h-48">
        {data.map((item, index) => {
          const height = (item.count / maxCount) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-40">
                <div
                  className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600 min-h-[4px]"
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${item.month}: ${item.count} applications`}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 text-center">
                {item.month}
              </div>
              <div className="text-xs font-medium text-gray-900">
                {item.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}