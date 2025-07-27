import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAIChat } from '../useAIChat';
import { ToastProvider } from '../../contexts/ToastContext';
import React from 'react';

// Mock fetch
global.fetch = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  React.createElement(ToastProvider, null, children)
);

describe('useAIChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default message', () => {
    const { result } = renderHook(() => useAIChat({ apiKey: 'test-key' }), { wrapper });
    
    expect(result.current.aiLoading).toBe(false);
    expect(result.current.aiMessage).toContain('Hallo! Ich bin dein KI-Helfer');
  });

  it('should handle missing API key', async () => {
    const { result } = renderHook(() => useAIChat({ apiKey: null }), { wrapper });
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });
    
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should handle empty message', async () => {
    const { result } = renderHook(() => useAIChat({ apiKey: 'test-key' }), { wrapper });
    
    await act(async () => {
      await result.current.sendMessage('   ');
    });
    
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should make API call with valid message and key', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        candidates: [{
          content: {
            parts: [{ text: 'AI response' }]
          }
        }]
      })
    };
    
    (fetch as any).mockResolvedValue(mockResponse);
    
    const { result } = renderHook(() => useAIChat({ apiKey: 'test-key' }), { wrapper });
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-goog-api-key': 'test-key'
        })
      })
    );
    
    expect(result.current.aiMessage).toBe('AI response');
  });

  it('should handle API errors', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValue({
        error: { message: 'Unauthorized' }
      })
    };
    
    (fetch as any).mockResolvedValue(mockResponse);
    
    const { result } = renderHook(() => useAIChat({ apiKey: 'invalid-key' }), { wrapper });
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });
    
    expect(result.current.aiMessage).toContain('API Key ungültig');
  });

  it('should handle network errors', async () => {
    (fetch as any).mockRejectedValue(new Error('Failed to fetch'));
    
    const { result } = renderHook(() => useAIChat({ apiKey: 'test-key' }), { wrapper });
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });
    
    expect(result.current.aiMessage).toContain('Netzwerkfehler');
  });
});
