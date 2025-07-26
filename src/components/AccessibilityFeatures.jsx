




import React, { useEffect, useState } from 'react';

const AccessibilityFeatures = () => {
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    switch (fontSize) {
      case 'large':
        root.style.setProperty('--font-size-scale', '1.25');
        break;
      case 'extra-large':
        root.style.setProperty('--font-size-scale', '1.5');
        break;
      default:
        root.style.setProperty('--font-size-scale', '1');
    }

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [fontSize, highContrast, reducedMotion]);

  const handleKeyDown = (e) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '=':
        case '+':
          e.preventDefault();
          setFontSize(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'extra-large' : 'extra-large');
          break;
        case '-':
          e.preventDefault();
          setFontSize(prev => prev === 'extra-large' ? 'large' : prev === 'large' ? 'normal' : 'normal');
          break;
        case '0':
          e.preventDefault();
          setFontSize('normal');
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Accessibility</h3>
        
        <div className="space-y-2">
          <label className="block text-xs text-slate-600 dark:text-slate-400">
            Font Size
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="ml-2 px-2 py-1 text-xs border rounded"
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </label>

          <label className="flex items-center text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="mr-2"
            />
            High Contrast
          </label>

          <label className="flex items-center text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="mr-2"
            />
            Reduced Motion
          </label>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          <p>Shortcuts:</p>
          <p>Ctrl/Cmd + + : Increase font</p>
          <p>Ctrl/Cmd + - : Decrease font</p>
          <p>Ctrl/Cmd + 0 : Reset font</p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;




