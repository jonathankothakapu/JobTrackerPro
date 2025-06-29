import React from 'react';
import { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig = {
  'low': { label: 'Low', className: 'bg-gray-100 text-gray-800' },
  'medium': { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
  'high': { label: 'High', className: 'bg-red-100 text-red-800' },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}