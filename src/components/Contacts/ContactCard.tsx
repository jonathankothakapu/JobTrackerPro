import React from 'react';
import { 
  Mail, 
  Linkedin, 
  Building, 
  MoreVertical, 
  Edit, 
  Trash2,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Contact, Application } from '../../types';

interface ContactCardProps {
  contact: Contact & { application: Application };
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleEmailClick = () => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`, '_blank');
    }
  };

  const handleLinkedInClick = () => {
    if (contact.linkedin) {
      window.open(contact.linkedin, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {contact.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{contact.role}</p>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Building className="w-4 h-4" />
            <span>{contact.application.company}</span>
          </div>
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
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Contact</span>
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 text-red-600 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Contact</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Actions */}
      <div className="flex items-center space-x-2 mb-4">
        {contact.email && (
          <button
            onClick={handleEmailClick}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm"
          >
            <Mail className="w-3 h-3" />
            <span>Email</span>
          </button>
        )}
        
        {contact.linkedin && (
          <button
            onClick={handleLinkedInClick}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm"
          >
            <Linkedin className="w-3 h-3" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Application Context */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Application:</span> {contact.application.jobTitle}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Applied {contact.application.appliedDate.toLocaleDateString()}
        </p>
      </div>

      {/* Notes */}
      {contact.notes && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Notes</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">
            {contact.notes}
          </p>
        </div>
      )}
    </div>
  );
}