import React from 'react';
import ChatWindow from './ChatWindow';
import { Message } from '../../types/chat';
import { Bot } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (content: string, files?: File[]) => void;
}

export default function ChatInterface({ messages, isLoading, error, onSendMessage }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Bot className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="font-medium text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500">
              Ask me anything about task management and productivity
            </p>
          </div>
        </div>
      </div>
      
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}