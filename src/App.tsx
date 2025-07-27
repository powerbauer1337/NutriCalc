import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
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
  TABS_CONFIG,
  TAB_MIXING_ASSISTANT,
  TAB_WATERING_SCHEDULER,
  TAB_SETTINGS,
} from './constants';
import { useApiKey } from './hooks/useApiKey';
import { useAIChat } from './hooks/useAIChat';
import { useFertilizerDatabase } from './hooks/useFertilizerDatabase';
import { useAnalysisData } from './hooks/useAnalysisData';
import MixingAssistant from './components/MixingAssistant';
import WateringScheduler from './components/WateringScheduler';

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



const AppLayout = () => {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].id);
  const { apiKey } = useApiKey();
  const { mixedWater } = useWater();
  const { fertilizerDatabase, refreshFertilizerDatabase } = useFertilizerDatabase();
  const { analysisInputs, updateAnalysisInputs } = useAnalysisData(fertilizerDatabase);
  const { aiLoading, aiMessage, sendMessage } = useAIChat({ apiKey });

  const chatSuggestions: string[] = ['Wie erstelle ich einen Dünger?', 'Ist mein N-Wert ok?', 'Was ist EC?'];



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
              onSend={sendMessage}
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
                onAnalysisUpdate={updateAnalysisInputs}
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
