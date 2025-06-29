import { useState, useEffect } from 'react';

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  dateFormat: string;
  notifications: boolean;
  autoSave: boolean;
  language: string;
  compactView: boolean;
  showSalaryInList: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  defaultStatus: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
}

const defaultSettings: AppSettings = {
  theme: 'light',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  notifications: true,
  autoSave: true,
  language: 'en',
  compactView: false,
  showSalaryInList: true,
  defaultPriority: 'medium',
  defaultStatus: 'applied',
};

const currencyConfigs: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc' },
  SEK: { symbol: 'kr', name: 'Swedish Krona' },
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem('jobtracker-settings');
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobtracker-settings', JSON.stringify(settings));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
    
    // Apply theme immediately
    applyTheme(settings.theme);
  }, [settings]);

  // Listen for settings changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jobtracker-settings' && e.newValue) {
        try {
          const newSettings = JSON.parse(e.newValue);
          setSettings({ ...defaultSettings, ...newSettings });
        } catch {
          // Ignore invalid JSON
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Formatting functions
  const formatCurrency = (amount: number | string): string => {
    const config = currencyConfigs[settings.currency];
    if (!config) return `$${amount}`;

    if (typeof amount === 'string') {
      // Handle salary ranges like "120000-150000" or "120,000 - 150,000"
      const numbers = amount.match(/\d{1,3}(?:,\d{3})*/g);
      if (numbers && numbers.length >= 2) {
        const min = parseInt(numbers[0].replace(/,/g, ''));
        const max = parseInt(numbers[1].replace(/,/g, ''));
        return `${config.symbol}${min.toLocaleString()} - ${config.symbol}${max.toLocaleString()}`;
      } else if (numbers && numbers.length === 1) {
        const value = parseInt(numbers[0].replace(/,/g, ''));
        return `${config.symbol}${value.toLocaleString()}`;
      }
      return `${config.symbol}${amount}`;
    }

    return `${config.symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (settings.dateFormat) {
      case 'DD/MM/YYYY':
        options.day = '2-digit';
        options.month = '2-digit';
        options.year = 'numeric';
        return date.toLocaleDateString('en-GB', options);
      case 'YYYY-MM-DD':
        return date.toISOString().split('T')[0];
      case 'MMM DD, YYYY':
        options.month = 'short';
        options.day = 'numeric';
        options.year = 'numeric';
        return date.toLocaleDateString('en-US', options);
      default: // MM/DD/YYYY
        options.month = '2-digit';
        options.day = '2-digit';
        options.year = 'numeric';
        return date.toLocaleDateString('en-US', options);
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDateTime = (date: Date): string => {
    return `${formatDate(date)} ${formatTime(date)}`;
  };

  const getCurrencySymbol = (): string => {
    return currencyConfigs[settings.currency]?.symbol || '$';
  };

  const getCurrencyName = (): string => {
    return currencyConfigs[settings.currency]?.name || 'US Dollar';
  };

  return {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    formatCurrency,
    formatDate,
    formatTime,
    formatDateTime,
    getCurrencySymbol,
    getCurrencyName,
    currencyConfigs,
  };
}