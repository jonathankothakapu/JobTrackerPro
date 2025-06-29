import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Building,
  Mail,
  Phone,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { Application, Contact } from '../../types';
import { ContactForm } from './ContactForm';
import { ContactCard } from './ContactCard';
import { ContactStats } from './ContactStats';

interface ContactsProps {
  applications: Application[];
  onUpdateApplication: (id: string, updates: Partial<Application>) => void;
}

export function Contacts({ applications, onUpdateApplication }: ContactsProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'recruiter' | 'hiring-manager' | 'employee'>('all');

  // Get all contacts from applications
  const allContacts = applications.flatMap(app => 
    (app.contacts || []).map(contact => ({
      ...contact,
      application: app
    }))
  );

  const filteredContacts = allContacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.application.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
      contact.role.toLowerCase().includes(filterBy.replace('-', ' '));
    
    return matchesSearch && matchesFilter;
  });

  const handleAddContact = (application?: Application) => {
    setSelectedApplication(application || null);
    setEditingContact(null);
    setShowContactForm(true);
  };

  const handleEditContact = (contact: Contact & { application: Application }) => {
    setSelectedApplication(contact.application);
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const handleSaveContact = (contactData: Omit<Contact, 'id'>) => {
    if (!selectedApplication) return;

    const newContact: Contact = {
      ...contactData,
      id: editingContact?.id || Date.now().toString(),
    };

    const updatedContacts = editingContact
      ? (selectedApplication.contacts || []).map(contact =>
          contact.id === editingContact.id ? newContact : contact
        )
      : [...(selectedApplication.contacts || []), newContact];

    onUpdateApplication(selectedApplication.id, {
      contacts: updatedContacts
    });

    setShowContactForm(false);
    setSelectedApplication(null);
    setEditingContact(null);
  };

  const handleDeleteContact = (contactId: string, applicationId: string) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    const updatedContacts = (application.contacts || []).filter(
      contact => contact.id !== contactId
    );

    onUpdateApplication(applicationId, {
      contacts: updatedContacts
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Management</h2>
          <p className="text-gray-600">Manage your professional network and track interactions</p>
        </div>
        
        <button
          onClick={() => handleAddContact()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Stats */}
      <ContactStats contacts={allContacts} applications={applications} />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="recruiter">Recruiters</option>
            <option value="hiring-manager">Hiring Managers</option>
            <option value="employee">Employees</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Showing {filteredContacts.length} of {allContacts.length} contacts
            </span>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-500 mb-4">
            {allContacts.length === 0 
              ? "Start building your professional network by adding contacts"
              : "Try adjusting your search or filters"
            }
          </p>
          <button
            onClick={() => handleAddContact()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Your First Contact
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => handleEditContact(contact)}
              onDelete={() => handleDeleteContact(contact.id, contact.application.id)}
            />
          ))}
        </div>
      )}

      {showContactForm && (
        <ContactForm
          contact={editingContact}
          applications={applications}
          selectedApplication={selectedApplication}
          onSave={handleSaveContact}
          onCancel={() => {
            setShowContactForm(false);
            setSelectedApplication(null);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}