import { Message } from '../types/chat';
import { config } from '../config/env';
import OpenAI from 'openai';
import { createClient } from './openaiClient';

export function generateMessageId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export async function getChatCompletion(messages: Array<{ role: string; content: string }>) {
  try {
    const openai = createClient();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 500,
      messages,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    });
    return response.choices[0]?.message?.content || 'No response';
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get AI response';
    throw new Error(`AI Error: ${message}`);
  }
}

export function createMessage(content: string, role: Message['role']): Message {
  return {
    id: generateMessageId(),
    content,
    role,
    timestamp: new Date(),
  };
}

export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}