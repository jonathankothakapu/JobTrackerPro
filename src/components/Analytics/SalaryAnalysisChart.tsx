import React from 'react';
import { DollarSign } from 'lucide-react';
import { Application } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface SalaryAnalysisChartProps {
  applications: Application[];
}

export function SalaryAnalysisChart({ applications }: SalaryAnalysisChartProps) {
  const { formatCurrency, getCurrencySymbol } = useSettings();
  
  const salaryRanges = applications
    .filter(app => app.salary)
    .map(app => {
      const salary = app.salary!;
      // Extract numbers from salary strings like "$120,000 - $150,000" or "₹120,000 - ₹150,000"
      const numbers = salary.match(/\d{1,3}(?:,\d{3})*/g);
      if (numbers && numbers.length >= 2) {
        const min = parseInt(numbers[0].replace(/,/g, ''));
        const max = parseInt(numbers[1].replace(/,/g, ''));
        return { min, max, avg: (min + max) / 2 };
      }
      return null;
    })
    .filter(Boolean) as Array<{ min: number; max: number; avg: number }>;

  if (salaryRanges.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>No salary data available</p>
      </div>
    );
  }

  const avgSalary = salaryRanges.reduce((sum, range) => sum + range.avg, 0) / salaryRanges.length;
  const minSalary = Math.min(...salaryRanges.map(r => r.min));
  const maxSalary = Math.max(...salaryRanges.map(r => r.max));

  // Create salary buckets based on currency
  const symbol = getCurrencySymbol();
  const buckets = [
    { label: `${symbol}50K-${symbol}75K`, min: 50000, max: 75000 },
    { label: `${symbol}75K-${symbol}100K`, min: 75000, max: 100000 },
    { label: `${symbol}100K-${symbol}125K`, min: 100000, max: 125000 },
    { label: `${symbol}125K-${symbol}150K`, min: 125000, max: 150000 },
    { label: `${symbol}150K+`, min: 150000, max: Infinity },
  ];

  const bucketCounts = buckets.map(bucket => ({
    ...bucket,
    count: salaryRanges.filter(range => 
      range.avg >= bucket.min && range.avg < bucket.max
    ).length
  }));

  const maxBucketCount = Math.max(...bucketCounts.map(b => b.count));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Average</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(Math.round(avgSalary))}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Minimum</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(minSalary)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Maximum</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(maxSalary)}
          </p>
        </div>
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
                  className="h-2 bg-purple-500 rounded-full transition-all duration-300"
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