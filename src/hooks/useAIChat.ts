import { useState } from 'react';
import { useToasts } from '../contexts/ToastContext';

interface AIResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
}

interface UseAIChatProps {
  apiKey: string | null;
}

interface UseAIChatReturn {
  aiLoading: boolean;
  aiMessage: string;
  sendMessage: (userMessage: string) => Promise<void>;
  setAiMessage: (message: string) => void;
}

export const useAIChat = ({ apiKey }: UseAIChatProps): UseAIChatReturn => {
  const { addToast } = useToasts();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState(
    "Hallo! Ich bin dein KI-Helfer. Frag mich z.B. 'Wie erstelle ich einen Dünger?' oder 'Ist mein N-Wert ok?' oder 'Was ist EC?'"
  );

  const sendMessage = async (userMessage: string): Promise<void> => {
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
        const data: AIResponse = await response.json();
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
    } catch (error: unknown) {
      console.error('AI request failed:', error);
      
      let errorMessage = 'Fehler bei der Antwortgenerierung.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Anfrage-Timeout. Bitte versuchen Sie es erneut.';
        } else if (error.message?.includes('Failed to fetch')) {
          errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
        } else {
          errorMessage = `Fehler: ${error.message}`;
        }
      }
      
      setAiMessage(errorMessage);
      addToast(errorMessage, 'error', 8000);
    } finally {
      setAiLoading(false);
    }
  };

  return {
    aiLoading,
    aiMessage,
    sendMessage,
    setAiMessage,
  };
};
