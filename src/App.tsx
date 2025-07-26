import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ToastProvider, useToasts } from './contexts/ToastContext';
import { WaterProvider, useWater } from './contexts/WaterContext';
import ChatBar from './components/ChatBar';
import SetupTab from './components/SetupTab';
import FertilizerTab from './components/FertilizerTab';
import AnalysisTab from './components/AnalysisTab';
import DetailsTab from './components/DetailsTab';
import ReferencesTab from './components/ReferencesTab';
import SettingsPage from './components/SettingsPage';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import {
  NUTRIENT_FIELDS,
  GROWTH_STAGES,
  WATER_TYPES,
  BASE_FERTILIZER_DATABASE,
  LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS,
  TABS_CONFIG,
  TAB_MIXING_ASSISTANT,
  TAB_WATERING_SCHEDULER,
  TAB_SETTINGS,
} from './constants';
import { useApiKey } from './hooks/useApiKey';
import MixingAssistant from './components/MixingAssistant';
import WateringScheduler from './components/WateringScheduler';
import { Fertilizer, NutrientCalculation, FertilizerDatabase, FertilizerData } from './types';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
      title="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
};

function mergeFertilizerDatabases(
  baseDb: Record<string, Fertilizer>,
  customList: Fertilizer[]
): Record<string, Fertilizer> {
  const customDb: Record<string, Fertilizer> = {};
  (customList || []).forEach((fert) => {
    const id = fert.id || `custom_${fert.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const composition: Record<string, number> = {};
    Object.entries(fert.composition || {}).forEach(([k, v]) => {
      composition[k.toLowerCase()] = Number(v) || 0;
    });
    customDb[id] = {
      ...fert,
      id,
      name: fert.name,
      type: fert.type || 'liquid',
      unit: fert.unit || 'ml',
      composition,
      description: fert.description || 'Benutzerdefinierter Dünger',
    };
  });
  return { ...baseDb, ...customDb };
}

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].id);
  const [fertilizerDatabase, setFertilizerDatabase] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS);
    let customList = [];
    try {
      if (stored) customList = JSON.parse(stored);
    } catch {}
    return mergeFertilizerDatabases(BASE_FERTILIZER_DATABASE, customList);
  });
  const [analysisInputs, setAnalysisInputs] = useState({
    NUTRIENT_FIELDS,
    GROWTH_STAGES,
    WATER_TYPES,
    fertilizerDatabase,
    selectedFertilizers: [],
    waterVolume: 10,
    growthStage: Object.keys(GROWTH_STAGES)[0],
    waterType: Object.keys(WATER_TYPES)[0],
    customWaterProfile: {},
    results: {
      nutrients: {},
      contributions: {},
      stage: GROWTH_STAGES[Object.keys(GROWTH_STAGES)[0]],
    },
  });
  const { apiKey } = useApiKey();
  const { addToast } = useToasts();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState(
    "Hallo! Ich bin dein KI-Helfer. Frag mich z.B. 'Wie erstelle ich einen Dünger?' oder 'Ist mein N-Wert ok?' oder 'Was ist EC?'"
  );
  const { mixedWater } = useWater();
  const chatSuggestions: string[] = ['Wie erstelle ich einen Dünger?', 'Ist mein N-Wert ok?', 'Was ist EC?'];

  // Stabilize the onAnalysisUpdate callback to prevent hot reload loops
  const handleAnalysisUpdate = React.useCallback((data: any) => {
    setAnalysisInputs(data);
  }, []);

  // Refresh fertilizer database when custom fertilizers change
  const refreshFertilizerDatabase = React.useCallback(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS);
    let customList = [];
    try {
      if (stored) customList = JSON.parse(stored);
    } catch {}
    setFertilizerDatabase(mergeFertilizerDatabases(BASE_FERTILIZER_DATABASE, customList));
  }, []);

  // Listen for storage changes (in case another tab updates custom fertilizers)
  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS) refreshFertilizerDatabase();
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleSendAI = async (userMessage: string) => {
    if (!apiKey) {
      addToast('API Key fehlt! Bitte geben Sie Ihren Google Gemini API Key in den Einstellungen ein.', 'error', 8000);
      return;
    }

    // Validate user message
    if (!userMessage.trim()) {
      addToast('Bitte geben Sie eine Nachricht ein.', 'warning');
      return;
    }

    setAiLoading(true);
    setAiMessage('Denke nach...');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: userMessage }] }],
            generationConfig: { temperature: 0.6, maxOutputTokens: 150 },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ],
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMsg = errorData.error?.message || errorMsg;
          
          // Handle specific error cases
          if (response.status === 400) {
            errorMsg = 'Ungültige Anfrage. Bitte überprüfen Sie Ihren API Key.';
          } else if (response.status === 401) {
            errorMsg = 'API Key ungültig oder abgelaufen. Bitte überprüfen Sie Ihren API Key.';
          } else if (response.status === 403) {
            errorMsg = 'Zugriff verweigert. Bitte überprüfen Sie Ihre API Key Berechtigungen.';
          } else if (response.status === 429) {
            errorMsg = 'Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.';
          } else if (response.status >= 500) {
            errorMsg = 'Server-Fehler. Bitte versuchen Sie es später erneut.';
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }

        setAiMessage(`AI Fehler: ${errorMsg}`);
        addToast(`API Fehler: ${errorMsg}`, 'error', 8000);
      } else {
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setAiMessage(data.candidates[0].content.parts[0].text.trim());
        } else if (data.promptFeedback?.blockReason) {
          const blockReason = data.promptFeedback.blockReason;
          setAiMessage(`Anfrage blockiert: ${blockReason}. Bitte formulieren Sie Ihre Frage anders.`);
          addToast(`Anfrage blockiert: ${blockReason}. Bitte formulieren Sie Ihre Frage anders.`, 'warning', 8000);
        } else {
          setAiMessage('Keine Antwort erhalten. Bitte versuchen Sie es erneut.');
          addToast('Keine Antwort von der AI erhalten.', 'warning');
        }
      }
    } catch (error: any) {
      console.error('AI request failed:', error);
      
      let errorMessage = 'Fehler bei der Antwortgenerierung.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Anfrage-Timeout. Bitte versuchen Sie es erneut.';
      } else if (error.message?.includes('Failed to fetch')) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
      } else if (error.message) {
        errorMessage = `Fehler: ${error.message}`;
      }
      
      setAiMessage(errorMessage);
      addToast(errorMessage, 'error', 8000);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
        <header className="p-4 bg-blue-600 text-white text-center text-2xl font-bold shadow flex items-center justify-between md:ml-48">
          <span>NutriCalc</span>
          <DarkModeToggle />
        </header>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="p-4 max-w-4xl mx-auto md:ml-48 pb-16 md:pb-0">
          <ErrorBoundary>
            <ChatBar
              apiKey={!!apiKey}
              onSend={handleSendAI}
              isLoading={aiLoading}
              displayMessage={aiMessage}
              suggestions={chatSuggestions}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            {activeTab === TABS_CONFIG[0].id && (
              <SetupTab
                NUTRIENT_FIELDS={NUTRIENT_FIELDS}
                GROWTH_STAGES={GROWTH_STAGES}
                WATER_TYPES={WATER_TYPES}
                fertilizerDatabase={fertilizerDatabase}
                onAnalysisUpdate={handleAnalysisUpdate}
                mixedWater={mixedWater}
              />
            )}
            {activeTab === TABS_CONFIG[1].id && <DetailsTab results={analysisInputs.results} />}
            {activeTab === TABS_CONFIG[2].id && <AnalysisTab {...analysisInputs} />}
            {activeTab === TABS_CONFIG[3].id && (
              <FertilizerTab refreshFertilizerDatabase={refreshFertilizerDatabase} />
            )}
            {activeTab === TAB_SETTINGS && <SettingsPage />}
            {activeTab === TAB_MIXING_ASSISTANT && (
              <MixingAssistant
                fertilizerDatabase={fertilizerDatabase}
                GROWTH_STAGES={GROWTH_STAGES}
                WATER_TYPES={WATER_TYPES}
              />
            )}
            {activeTab === TAB_WATERING_SCHEDULER && <WateringScheduler />}
            {activeTab === TABS_CONFIG[TABS_CONFIG.length - 1].id && <ReferencesTab />}
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <ThemeProvider>
    <ToastProvider>
      <WaterProvider>
        <AppLayout />
      </WaterProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default App;
