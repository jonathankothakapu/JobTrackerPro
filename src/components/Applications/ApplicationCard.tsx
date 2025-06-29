import React from 'react';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Application } from '../../types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { useSettings } from '../../hooks/useSettings';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Application['status']) => void;
}

const statusColors = {
  'applied': 'border-l-blue-500 bg-blue-50',
  'interview': 'border-l-yellow-500 bg-yellow-50',
  'offer': 'border-l-green-500 bg-green-50',
  'rejected': 'border-l-red-500 bg-red-50',
  'withdrawn': 'border-l-gray-500 bg-gray-50',
};

export function ApplicationCard({ 
  application, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: ApplicationCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const { settings, formatCurrency, formatDate } = useSettings();

  const cardClassName = settings.compactView 
    ? "bg-white rounded-lg border-l-4 border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
    : "bg-white rounded-xl border-l-4 border border-gray-200 p-6 hover:shadow-lg transition-all duration-200";

  return (
    <div className={`${cardClassName} ${statusColors[application.status]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-semibold text-gray-900 mb-1 ${settings.compactView ? 'text-base' : 'text-lg'}`}>
                {application.jobTitle}
              </h3>
              <p className="text-gray-600 font-medium">{application.company}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => {
                      onEdit(application);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(application.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 text-red-600 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{application.location}</span>
        </div>
        {application.salary && settings.showSalaryInList && (
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{formatCurrency(application.salary)}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Applied {formatDate(application.appliedDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StatusBadge status={application.status} />
          <PriorityBadge priority={application.priority} />
        </div>
        
        {application.jobUrl && (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">View Job</span>
          </a>
        )}
      </div>

      {application.notes && !settings.compactView && (
        <div className="mt-4 p-3 bg-white bg-opacity-70 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">{application.notes}</p>
        </div>
      )}
    </div>
  );
}