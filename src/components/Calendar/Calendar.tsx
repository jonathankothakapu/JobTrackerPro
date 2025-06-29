import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  User,
  Video,
  Phone,
  Building
} from 'lucide-react';
import { Application, Interview } from '../../types';
import { InterviewForm } from './InterviewForm';
import { InterviewCard } from './InterviewCard';

interface CalendarProps {
  applications: Application[];
  onUpdateApplication: (id: string, updates: Partial<Application>) => void;
}

export function Calendar({ applications, onUpdateApplication }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Get all interviews from applications
  const allInterviews = applications.flatMap(app => 
    (app.interviews || []).map(interview => ({
      ...interview,
      application: app
    }))
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getInterviewsForDate = (date: Date) => {
    return allInterviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return (
        interviewDate.getDate() === date.getDate() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleAddInterview = (application?: Application) => {
    setSelectedApplication(application || null);
    setEditingInterview(null);
    setShowInterviewForm(true);
  };

  const handleEditInterview = (interview: Interview & { application: Application }) => {
    setSelectedApplication(interview.application);
    setEditingInterview(interview);
    setShowInterviewForm(true);
  };

  const handleSaveInterview = (interviewData: Omit<Interview, 'id'>) => {
    if (!selectedApplication) return;

    const newInterview: Interview = {
      ...interviewData,
      id: editingInterview?.id || Date.now().toString(),
    };

    const updatedInterviews = editingInterview
      ? (selectedApplication.interviews || []).map(interview =>
          interview.id === editingInterview.id ? newInterview : interview
        )
      : [...(selectedApplication.interviews || []), newInterview];

    onUpdateApplication(selectedApplication.id, {
      interviews: updatedInterviews
    });

    setShowInterviewForm(false);
    setSelectedApplication(null);
    setEditingInterview(null);
  };

  const handleDeleteInterview = (interviewId: string, applicationId: string) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    const updatedInterviews = (application.interviews || []).filter(
      interview => interview.id !== interviewId
    );

    onUpdateApplication(applicationId, {
      interviews: updatedInterviews
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const upcomingInterviews = allInterviews
    .filter(interview => new Date(interview.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Calendar</h2>
          <p className="text-gray-600">Schedule and track your interviews</p>
        </div>
        
        <button
          onClick={() => handleAddInterview()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-24" />;
              }
              
              const interviews = getInterviewsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`p-2 h-24 border border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                    isToday ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {interviews.slice(0, 2).map((interview, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleEditInterview(interview)}
                        className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200 transition-colors duration-200 truncate"
                      >
                        {interview.type}
                      </div>
                    ))}
                    {interviews.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{interviews.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Interviews Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
            
            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No upcoming interviews</p>
                <button
                  onClick={() => handleAddInterview()}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Schedule one now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    onEdit={() => handleEditInterview(interview)}
                    onDelete={() => handleDeleteInterview(interview.id, interview.application.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Interviews</span>
                <span className="font-semibold text-gray-900">
                  {allInterviews.filter(interview => {
                    const date = new Date(interview.date);
                    return date.getMonth() === currentDate.getMonth() &&
                           date.getFullYear() === currentDate.getFullYear();
                  }).length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Upcoming</span>
                <span className="font-semibold text-gray-900">
                  {upcomingInterviews.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Companies</span>
                <span className="font-semibold text-gray-900">
                  {new Set(allInterviews.map(interview => interview.application.company)).size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showInterviewForm && (
        <InterviewForm
          interview={editingInterview}
          applications={applications}
          selectedApplication={selectedApplication}
          onSave={handleSaveInterview}
          onCancel={() => {
            setShowInterviewForm(false);
            setSelectedApplication(null);
            setEditingInterview(null);
          }}
        />
      )}
    </div>
  );
}