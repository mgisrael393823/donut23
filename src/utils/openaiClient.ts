import OpenAI from 'openai';
import { config } from '../config/env';

let openaiClient: OpenAI | null = null;

export function createClient() {
  if (!config.openai.apiKey) {
    throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: config.openai.apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  
  return openaiClient;
}