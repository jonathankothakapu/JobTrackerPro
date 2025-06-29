import React from 'react';
import { Users, Building, Mail, MessageSquare } from 'lucide-react';
import { Contact, Application } from '../../types';

interface ContactStatsProps {
  contacts: Array<Contact & { application: Application }>;
  applications: Application[];
}

export function ContactStats({ contacts, applications }: ContactStatsProps) {
  const totalContacts = contacts.length;
  const companiesWithContacts = new Set(contacts.map(c => c.application.company)).size;
  const contactsWithEmail = contacts.filter(c => c.email).length;
  const contactsWithNotes = contacts.filter(c => c.notes).length;

  const stats = [
    {
      title: 'Total Contacts',
      value: totalContacts,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Companies',
      value: companiesWithContacts,
      icon: Building,
      color: 'green',
    },
    {
      title: 'Email Contacts',
      value: contactsWithEmail,
      icon: Mail,
      color: 'yellow',
    },
    {
      title: 'With Notes',
      value: contactsWithNotes,
      icon: MessageSquare,
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg border ${colorClasses[stat.color]}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}