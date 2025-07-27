import React, { useRef, memo, useCallback } from 'react';
import { useToasts } from '../contexts/ToastContext';
import Button from './Button';

interface ImportExportData {
  waterVolume: number;
  growthStage: string;
  waterType: string;
  selectedFertilizers: Array<{ id: string; amount: number; active: boolean }>;
  customWaterProfile: Record<string, number>;
}

interface ImportExportControlsProps {
  data: ImportExportData;
  onImport: (data: ImportExportData) => void;
}

const ImportExportControls: React.FC<ImportExportControlsProps> = memo(({ data, onImport }) => {
  const { addToast } = useToasts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    try {
      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        data,
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nutrient-setup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('Setup exportiert!', 'success');
    } catch (error) {
      console.error('Export error:', error);
      addToast('Fehler beim Export!', 'error');
    }
  }, [data, addToast]);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const parsed = JSON.parse(content);
        
        // Validate the imported data structure
        const importedData = parsed.data || parsed;
        if (importedData && typeof importedData === 'object') {
          // Ensure required fields exist with defaults
          const validatedData: ImportExportData = {
            waterVolume: Number(importedData.waterVolume) || 10,
            growthStage: importedData.growthStage || 'vegetative',
            waterType: importedData.waterType || 'ro',
            selectedFertilizers: Array.isArray(importedData.selectedFertilizers) 
              ? importedData.selectedFertilizers 
              : [],
            customWaterProfile: importedData.customWaterProfile || {},
          };
          
          onImport(validatedData);
          addToast('Setup importiert!', 'success');
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('Import error:', error);
        addToast('Ungültige Datei!', 'error');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImport, addToast]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={handleExport}
        variant="secondary"
        className="text-sm"
        title="Aktuelle Einstellungen als JSON-Datei exportieren"
      >
        📤 Export
      </Button>
      
      <Button
        onClick={triggerFileInput}
        variant="secondary"
        className="text-sm"
        title="Einstellungen aus JSON-Datei importieren"
      >
        📥 Import
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
        aria-label="JSON-Datei für Import auswählen"
      />
    </div>
  );
});

export default ImportExportControls;
