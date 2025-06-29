import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { CombinedApplicationsView } from './components/Applications/CombinedApplicationsView';
import { ApplicationForm } from './components/Applications/ApplicationForm';
import { Analytics } from './components/Analytics/Analytics';
import { Calendar } from './components/Calendar/Calendar';
import { Contacts } from './components/Contacts/Contacts';
import { Settings } from './components/Settings/Settings';
import { useApplications } from './hooks/useApplications';
import { Application } from './types';

function App() {
  const [activeView, setActiveView] = useState('applications');
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | undefined>();
  
  const { 
    applications, 
    loading, 
    addApplication, 
    updateApplication, 
    deleteApplication, 
    updateStatus 
  } = useApplications();

  const handleAddApplication = () => {
    setEditingApplication(undefined);
    setShowForm(true);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleSaveApplication = (applicationData: Omit<Application, 'id' | 'appliedDate' | 'lastUpdated'>) => {
    if (editingApplication) {
      updateApplication(editingApplication.id, applicationData);
    } else {
      addApplication(applicationData);
    }
    setShowForm(false);
    setEditingApplication(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingApplication(undefined);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'applications':
        return (
          <CombinedApplicationsView
            applications={applications}
            onEdit={handleEditApplication}
            onDelete={deleteApplication}
            onStatusChange={updateStatus}
          />
        );
      case 'analytics':
        return <Analytics applications={applications} />;
      case 'calendar':
        return (
          <Calendar
            applications={applications}
            onUpdateApplication={updateApplication}
          />
        );
      case 'contacts':
        return (
          <Contacts
            applications={applications}
            onUpdateApplication={updateApplication}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return (
          <CombinedApplicationsView
            applications={applications}
            onEdit={handleEditApplication}
            onDelete={deleteApplication}
            onStatusChange={updateStatus}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading JobTracker Pro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddApplication={handleAddApplication} />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {showForm && (
        <ApplicationForm
          application={editingApplication}
          onSave={handleSaveApplication}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;