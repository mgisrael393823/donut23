// Environment configuration
export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
  }
} as const;

// Validation
if (!config.openai.apiKey) {
  console.error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY environment variable.');
}

if (!config.google.clientId) {
  console.error('Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.');
}