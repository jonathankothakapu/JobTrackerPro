import React from 'react';
import { Calendar, Clock, User, Edit, Trash2, Star } from 'lucide-react';
import { Interview, Application } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface InterviewCardProps {
  interview: Interview & { application: Application };
  onEdit: () => void;
  onDelete: () => void;
}

export function InterviewCard({ interview, onEdit, onDelete }: InterviewCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const { formatDate, formatTime } = useSettings();
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {interview.type}
          </h4>
          <p className="text-xs text-gray-600 truncate">
            {interview.application.jobTitle} at {interview.application.company}
          </p>
        </div>
        
        <div className="relative ml-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(interview.date)}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatTime(interview.date)}</span>
          {interview.duration && (
            <span className="ml-1">({interview.duration}min)</span>
          )}
        </div>
        {interview.interviewer && (
          <div className="flex items-center text-xs text-gray-500">
            <User className="w-3 h-3 mr-1" />
            <span className="truncate">{interview.interviewer}</span>
          </div>
        )}
      </div>

      {interview.rating > 0 && (
        <div className="flex items-center space-x-1 mb-2">
          {renderStars(interview.rating)}
        </div>
      )}

      {interview.notes && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {interview.notes}
        </p>
      )}
    </div>
  );
}