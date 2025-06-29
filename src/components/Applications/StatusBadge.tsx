import React from 'react';
import { ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig = {
  'applied': { label: 'Applied', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  'interview': { label: 'Interview', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  'offer': { label: 'Offer', className: 'bg-green-100 text-green-800 border-green-200' },
  'rejected': { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200' },
  'withdrawn': { label: 'Withdrawn', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { 
    label: status, 
    className: 'bg-gray-200 text-gray-800 border-gray-300' 
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}