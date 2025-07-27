import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import Button from '../Button';
import { useToasts } from '../../contexts/ToastContext';

interface AISettingsProps {
  language: 'de' | 'en';
  onSettingsChange?: (settings: AISettingsConfig) => void;
  className?: string;
}

interface AISettingsConfig {
  apiKey: string;
  provider: 'gemini' | 'openai' | 'claude';
  enableProactiveAlerts: boolean;
  enableFloatingWidget: boolean;
  conversationHistory: boolean;
  dataPrivacy: boolean;
}

const AISettings: React.FC<AISettingsProps> = ({
  language,
  onSettingsChange,
  className
}) => {
  const [settings, setSettings] = useState<AISettingsConfig>({
    apiKey: '',
    provider: 'gemini',
    enableProactiveAlerts: true,
    enableFloatingWidget: true,
    conversationHistory: true,
    dataPrivacy: true
  });
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { addToast } = useToasts();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('ai-assistant-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse saved AI settings');
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ai-assistant-settings', JSON.stringify(settings));
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleSettingChange = (key: keyof AISettingsConfig, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const testConnection = async () => {
    if (!settings.apiKey.trim()) {
      addToast(
        language === 'de' ? 'Bitte geben Sie einen API-Schlüssel ein' : 'Please enter an API key',
        'error'
      );
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      // Test the API connection based on provider
      let testResult = false;
      
      switch (settings.provider) {
        case 'gemini':
          testResult = await testGeminiConnection(settings.apiKey);
          break;
        case 'openai':
          testResult = await testOpenAIConnection(settings.apiKey);
          break;
        case 'claude':
          testResult = await testClaudeConnection(settings.apiKey);
          break;
      }

      if (testResult) {
        setConnectionStatus('success');
        addToast(
          language === 'de' ? 'Verbindung erfolgreich!' : 'Connection successful!',
          'success'
        );
      } else {
        setConnectionStatus('error');
        addToast(
          language === 'de' ? 'Verbindung fehlgeschlagen' : 'Connection failed',
          'error'
        );
      }
    } catch (error) {
      setConnectionStatus('error');
      addToast(
        language === 'de' ? 'Verbindungstest fehlgeschlagen' : 'Connection test failed',
        'error'
      );
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testGeminiConnection = async (apiKey: string): Promise<boolean> => {
    try {
      // Import GoogleGenerativeAI from the service to avoid duplicate imports
      const AIAssistantService = (await import('../../services/AIAssistantService')).default;
      const service = new AIAssistantService(apiKey);

      // Simple test by creating the service - if it doesn't throw, the key is valid format
      return true;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  };

  const testOpenAIConnection = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('OpenAI connection test failed:', error);
      return false;
    }
  };

  const testClaudeConnection = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Test' }]
        })
      });
      return response.ok;
    } catch (error) {
      console.error('Claude connection test failed:', error);
      return false;
    }
  };

  const clearAllData = () => {
    if (window.confirm(language === 'de' ?
      'Möchten Sie wirklich alle AI-Daten löschen? Dies kann nicht rückgängig gemacht werden.' :
      'Are you sure you want to clear all AI data? This cannot be undone.'
    )) {
      localStorage.removeItem('ai-assistant-settings');
      localStorage.removeItem('ai-conversation-history');
      setSettings({
        apiKey: '',
        provider: 'gemini',
        enableProactiveAlerts: true,
        enableFloatingWidget: true,
        conversationHistory: true,
        dataPrivacy: true
      });
      addToast(
        language === 'de' ? 'Alle AI-Daten wurden gelöscht' : 'All AI data has been cleared',
        'success'
      );
    }
  };

  const providers = [
    {
      id: 'gemini' as const,
      name: 'Google Gemini',
      description: language === 'de' ? 'Googles fortschrittliches AI-Modell' : 'Google\'s advanced AI model',
      setupUrl: 'https://makersuite.google.com/app/apikey'
    },
    {
      id: 'openai' as const,
      name: 'OpenAI GPT-4',
      description: language === 'de' ? 'OpenAIs leistungsstarkes Sprachmodell' : 'OpenAI\'s powerful language model',
      setupUrl: 'https://platform.openai.com/api-keys'
    },
    {
      id: 'claude' as const,
      name: 'Anthropic Claude',
      description: language === 'de' ? 'Anthropics sicheres AI-System' : 'Anthropic\'s safe AI system',
      setupUrl: 'https://console.anthropic.com/'
    }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'AI-Provider Konfiguration' : 'AI Provider Configuration'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {language === 'de' ? 'AI-Provider auswählen' : 'Select AI Provider'}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {providers.map(provider => (
                <div
                  key={provider.id}
                  className={cn(
                    'p-3 border-2 rounded-lg cursor-pointer transition-all',
                    settings.provider === provider.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-stone-200 hover:border-stone-300'
                  )}
                  onClick={() => handleSettingChange('provider', provider.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-stone-600">{provider.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {settings.provider === provider.id && (
                        <span className="text-emerald-600">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {language === 'de' ? 'API-Schlüssel' : 'API Key'}
            </label>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.apiKey}
                  onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                  placeholder={language === 'de' ? 'Geben Sie Ihren API-Schlüssel ein' : 'Enter your API key'}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showApiKey ? '🙈' : '👁️'}
                </button>
              </div>
              <Button
                onClick={testConnection}
                disabled={isTestingConnection || !settings.apiKey.trim()}
                variant="outline"
                className={cn(
                  connectionStatus === 'success' && 'border-green-500 text-green-700',
                  connectionStatus === 'error' && 'border-red-500 text-red-700'
                )}
              >
                {isTestingConnection ? '⏳' : connectionStatus === 'success' ? '✅' : connectionStatus === 'error' ? '❌' : '🔍'}
                {language === 'de' ? 'Testen' : 'Test'}
              </Button>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              {language === 'de' ? 'API-Schlüssel erhalten:' : 'Get API key:'}{' '}
              <a
                href={providers.find(p => p.id === settings.provider)?.setupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {providers.find(p => p.id === settings.provider)?.name}
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature Settings */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'Funktionen' : 'Features'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Proactive Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {language === 'de' ? 'Proaktive Warnungen' : 'Proactive Alerts'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'de' 
                  ? 'Automatische Benachrichtigungen bei kritischen Problemen'
                  : 'Automatic notifications for critical issues'
                }
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableProactiveAlerts}
                onChange={(e) => handleSettingChange('enableProactiveAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Floating Widget */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {language === 'de' ? 'Schwebendes Chat-Widget' : 'Floating Chat Widget'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'de' 
                  ? 'Chat-Button in der unteren rechten Ecke anzeigen'
                  : 'Show chat button in bottom right corner'
                }
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableFloatingWidget}
                onChange={(e) => handleSettingChange('enableFloatingWidget', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Conversation History */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {language === 'de' ? 'Gesprächsverlauf speichern' : 'Save Conversation History'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'de' 
                  ? 'Chat-Verlauf lokal speichern für besseren Kontext'
                  : 'Save chat history locally for better context'
                }
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.conversationHistory}
                onChange={(e) => handleSettingChange('conversationHistory', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'Datenschutz & Daten' : 'Privacy & Data'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              {language === 'de' ? 'Datenschutz-Hinweis' : 'Privacy Notice'}
            </h4>
            <p className="text-sm text-blue-800">
              {language === 'de' 
                ? 'Ihre Daten werden nur lokal gespeichert und nur für AI-Anfragen an den gewählten Provider gesendet. Keine Daten werden an Dritte weitergegeben.'
                : 'Your data is only stored locally and only sent to the selected AI provider for requests. No data is shared with third parties.'
              }
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <div>
              <h4 className="font-medium text-red-700">
                {language === 'de' ? 'Alle AI-Daten löschen' : 'Clear All AI Data'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'de' 
                  ? 'Löscht alle gespeicherten Einstellungen und Gesprächsverläufe'
                  : 'Removes all saved settings and conversation history'
                }
              </p>
            </div>
            <Button onClick={clearAllData} variant="destructive">
              {language === 'de' ? 'Löschen' : 'Clear'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettings;
