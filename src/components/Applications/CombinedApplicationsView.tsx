import React from 'react';
import { ApplicationList } from './ApplicationList';
import { Application, ApplicationStatus } from '../../types';

interface CombinedApplicationsViewProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export function CombinedApplicationsView({ 
  applications, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: CombinedApplicationsViewProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Applications</h2>
        <p className="text-gray-600">Manage and track all your job applications</p>
      </div>

      {/* Applications List */}
      <ApplicationList
        applications={applications}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}