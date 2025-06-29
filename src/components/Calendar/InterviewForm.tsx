import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Application, Interview } from '../../types';

interface InterviewFormProps {
  interview?: Interview | null;
  applications: Application[];
  selectedApplication?: Application | null;
  onSave: (interview: Omit<Interview, 'id'>) => void;
  onCancel: () => void;
}

export function InterviewForm({ 
  interview, 
  applications, 
  selectedApplication,
  onSave, 
  onCancel 
}: InterviewFormProps) {
  const [formData, setFormData] = useState({
    type: interview?.type || 'Phone Screen',
    date: interview?.date ? new Date(interview.date).toISOString().slice(0, 16) : '',
    duration: interview?.duration || 60,
    interviewer: interview?.interviewer || '',
    notes: interview?.notes || '',
    feedback: interview?.feedback || '',
    rating: interview?.rating || 0,
    applicationId: selectedApplication?.id || interview?.applicationId || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      alert('Please select a date and time');
      return;
    }
    onSave({
      type: formData.type,
      date: new Date(formData.date),
      duration: formData.duration,
      interviewer: formData.interviewer,
      notes: formData.notes,
      feedback: formData.feedback,
      rating: formData.rating,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {interview ? 'Edit Interview' : 'Schedule Interview'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!selectedApplication && (
              <div className="md:col-span-2">
                <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 mb-2">
                  Application
                </label>
                <select
                  id="applicationId"
                  name="applicationId"
                  value={formData.applicationId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an application</option>
                  {applications.map(app => (
                    <option key={app.id} value={app.id}>
                      {app.jobTitle} at {app.company}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Interview Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Phone Screen">Phone Screen</option>
                <option value="Video Interview">Video Interview</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Behavioral Interview">Behavioral Interview</option>
                <option value="Final Interview">Final Interview</option>
                <option value="Panel Interview">Panel Interview</option>
                <option value="On-site Interview">On-site Interview</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
                max="480"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700 mb-2">
                Interviewer
              </label>
              <input
                type="text"
                id="interviewer"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., John Smith, Engineering Manager"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Questions to ask, topics to prepare, etc."
            />
          </div>

          {interview && (
            <>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How did the interview go? What went well? What could be improved?"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating (1-5)
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Not rated</option>
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>
            </>
          )}

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              {interview ? 'Update Interview' : 'Schedule Interview'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}