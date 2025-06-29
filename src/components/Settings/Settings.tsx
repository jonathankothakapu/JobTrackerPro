import React from 'react';
import { 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  Trash2,
  Save,
  RotateCcw,
  Globe,
  Eye,
  Bell,
  Zap
} from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export function Settings() {
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    currencyConfigs,
    getCurrencyName 
  } = useSettings();

  const handleExportData = () => {
    const data = {
      applications: JSON.parse(localStorage.getItem('jobtracker-applications') || '[]'),
      settings,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobtracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.applications) {
          localStorage.setItem('jobtracker-applications', JSON.stringify(data.applications));
        }
        
        if (data.settings) {
          Object.entries(data.settings).forEach(([key, value]) => {
            updateSetting(key as any, value);
          });
        }
        
        alert('Data imported successfully! Please refresh the page to see changes.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('jobtracker-applications');
      alert('All data has been cleared. Please refresh the page.');
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset all settings to default values?')) {
      resetSettings();
    }
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label, 
    description 
  }: { 
    checked: boolean; 
    onChange: (value: boolean) => void; 
    label: string; 
    description: string; 
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Customize your JobTracker Pro experience</p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => updateSetting('theme', value as any)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-200 ${
                    settings.theme === value 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <ToggleSwitch
            checked={settings.compactView}
            onChange={(value) => updateSetting('compactView', value)}
            label="Compact View"
            description="Use a more condensed layout to show more information"
          />
        </div>
      </div>

      {/* Localization Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Localization</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={settings.currency}
              onChange={(e) => updateSetting('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(currencyConfigs).map(([code, config]) => (
                <option key={code} value={code}>
                  {config.name} ({config.symbol})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Currently: {getCurrencyName()}</p>
          </div>

          <div>
            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              id="dateFormat"
              value={settings.dateFormat}
              onChange={(e) => updateSetting('dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
              <option value="MMM DD, YYYY">MMM DD, YYYY (Long)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Application Defaults */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Application Defaults</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="defaultPriority" className="block text-sm font-medium text-gray-700 mb-2">
              Default Priority
            </label>
            <select
              id="defaultPriority"
              value={settings.defaultPriority}
              onChange={(e) => updateSetting('defaultPriority', e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="defaultStatus" className="block text-sm font-medium text-gray-700 mb-2">
              Default Status
            </label>
            <select
              id="defaultStatus"
              value={settings.defaultStatus}
              onChange={(e) => updateSetting('defaultStatus', e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Display Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.showSalaryInList}
            onChange={(value) => updateSetting('showSalaryInList', value)}
            label="Show Salary in Lists"
            description="Display salary information in application lists and cards"
          />
        </div>
      </div>

      {/* Notifications & Behavior */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications & Behavior</h3>
        </div>
        
        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.notifications}
            onChange={(value) => updateSetting('notifications', value)}
            label="Enable Notifications"
            description="Get notified about interview reminders and follow-ups"
          />

          <ToggleSwitch
            checked={settings.autoSave}
            onChange={(value) => updateSetting('autoSave', value)}
            label="Auto-save Changes"
            description="Automatically save changes as you make them"
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleExportData}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>

          <label className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetSettings}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Settings</span>
          </button>

          <button
            onClick={handleClearAllData}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>

      {/* Save Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Save className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">Settings are automatically saved and applied across all tabs</span>
        </div>
      </div>
    </div>
  );
}