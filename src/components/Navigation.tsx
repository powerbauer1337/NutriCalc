import React, { useRef } from 'react';
import { TABS_CONFIG } from '../constants';

// Simple SVG icon map for demonstration (replace with real icons as needed)
const tabIcons = {
  setup: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  details: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  analysis: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 16v-4M12 16v-8M16 16v-2" />
    </svg>
  ),
  fertilizer: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 7h6" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  references: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),
};

function getTabIcon(tabId) {
  // Map tab id to icon, fallback to a default
  return (
    tabIcons[tabId] || (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  );
}

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabRefs = useRef([]);

  // Keyboard navigation handler
  const handleKeyDown = (e, idx) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const next = (idx + 1) % TABS_CONFIG.length;
      tabRefs.current[next]?.focus();
    } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      const prev = (idx - 1 + TABS_CONFIG.length) % TABS_CONFIG.length;
      tabRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      tabRefs.current[TABS_CONFIG.length - 1]?.focus();
    }
  };

  // Sidebar for md+ screens
  // Bottom nav for mobile
  return (
    <nav aria-label="App Navigation" className="">
      {/* Sidebar (md+) */}
      <div className="hidden md:flex flex-col w-48 min-h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 py-6 px-2 space-y-1 fixed top-0 left-0 z-20">
        <div className="mb-6 text-2xl font-bold text-blue-600 dark:text-blue-400 px-2">
          NutriCalc
        </div>
        <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-1">
          {TABS_CONFIG.map((tab, idx) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[idx] = el)}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === tab.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-label={tab.label}
            >
              {getTabIcon(tab.id)}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Bottom nav (mobile) */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around py-1 shadow">
        <div role="tablist" aria-orientation="horizontal" className="flex w-full">
          {TABS_CONFIG.map((tab, idx) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[idx] = el)}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`flex flex-col items-center flex-1 px-1 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300'}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-label={tab.label}
            >
              {getTabIcon(tab.id)}
              <span className="mt-0.5">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
