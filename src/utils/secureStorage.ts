// Simple obfuscation utility for client-side API key storage
// Note: This is not true encryption, just basic obfuscation to prevent casual inspection

const STORAGE_KEY = 'nutricalc_secure_data';
const OBFUSCATION_KEY = 'NutriCalc2024SecureKey';

/**
 * Simple XOR-based obfuscation
 */
function obfuscate(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    result += String.fromCharCode(textChar ^ keyChar);
  }
  return btoa(result); // Base64 encode
}

/**
 * Reverse the obfuscation
 */
function deobfuscate(obfuscatedText: string, key: string): string {
  try {
    const decoded = atob(obfuscatedText); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const textChar = decoded.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      result += String.fromCharCode(textChar ^ keyChar);
    }
    return result;
  } catch (error) {
    console.error('Failed to deobfuscate data:', error);
    return '';
  }
}

/**
 * Securely store API key with obfuscation
 */
export function storeApiKey(apiKey: string): void {
  try {
    const obfuscated = obfuscate(apiKey, OBFUSCATION_KEY);
    const data = {
      key: obfuscated,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store API key:', error);
    // Fallback to regular storage if obfuscation fails
    localStorage.setItem('nutricalc_gemini_api_key', apiKey);
  }
}

/**
 * Retrieve and deobfuscate API key
 */
export function retrieveApiKey(): string {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.key && data.version) {
        return deobfuscate(data.key, OBFUSCATION_KEY);
      }
    }
    
    // Fallback: check for old unencrypted key
    const oldKey = localStorage.getItem('nutricalc_gemini_api_key');
    if (oldKey) {
      // Migrate to secure storage
      storeApiKey(oldKey);
      localStorage.removeItem('nutricalc_gemini_api_key');
      return oldKey;
    }
    
    return '';
  } catch (error) {
    console.error('Failed to retrieve API key:', error);
    return '';
  }
}

/**
 * Remove stored API key
 */
export function removeApiKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('nutricalc_gemini_api_key'); // Remove old key too
  } catch (error) {
    console.error('Failed to remove API key:', error);
  }
}

/**
 * Check if API key is stored
 */
export function hasStoredApiKey(): boolean {
  const secureData = localStorage.getItem(STORAGE_KEY);
  const oldData = localStorage.getItem('nutricalc_gemini_api_key');
  return !!(secureData || oldData);
}

/**
 * Validate API key format (basic validation)
 */
export function validateApiKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  // Basic Google API key format validation
  const googleApiKeyPattern = /^AIza[0-9A-Za-z-_]{35}$/;
  return googleApiKeyPattern.test(apiKey);
}

/**
 * Sanitize API key for logging (show only first/last few characters)
 */
export function sanitizeApiKeyForLogging(apiKey: string): string {
  if (!apiKey || apiKey.length < 8) {
    return '[INVALID_KEY]';
  }
  
  const start = apiKey.substring(0, 4);
  const end = apiKey.substring(apiKey.length - 4);
  const middle = '*'.repeat(Math.max(0, apiKey.length - 8));
  
  return `${start}${middle}${end}`;
}