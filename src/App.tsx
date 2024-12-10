import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import ChatInterface from './components/Chat/ChatInterface';
import Inbox from './components/Inbox/Inbox';
import CalendarView from './components/Calendar/CalendarView';
import { Message } from './types/chat';
import { createMessage, getChatCompletion } from './utils/chatUtils';
import { handleFileUpload } from './utils/fileUtils';

interface MobileMenuState {
  isSidebarOpen: boolean;
}

function AppContent() {
  const [mobileMenu, setMobileMenu] = useState<MobileMenuState>({
    isSidebarOpen: false,
  });

  const [chatState, setChatState] = useState<{
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const currentPath = window.location.hash.split('/')[1] || 'home';
  const capitalizedPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);


  const handleSendMessage = async (content: string, files?: File[]) => {
    let attachments = [];
    if (files && files.length > 0) {
      const uploadPromises = files.map(file => handleFileUpload(file));
      attachments = await Promise.all(uploadPromises);
    }

    const userMessage = createMessage(content, 'user');
    if (attachments.length > 0) {
      userMessage.attachments = attachments;
    }
    
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant focused on task management and productivity. Help users organize their tasks, manage their time effectively, and provide actionable productivity tips. When suggesting task creation, use the available task structure with priority, status, due date, and tags.',
        },
        ...chatState.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: 'user', content },
      ];

      const aiResponse = await getChatCompletion(messages);
      const assistantMessage = createMessage(aiResponse, 'assistant');

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get response from AI',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <Sidebar 
          isOpen={mobileMenu.isSidebarOpen} 
          onClose={() => setMobileMenu(prev => ({ ...prev, isSidebarOpen: false }))} 
        />
        <div className="flex-1 min-w-0 flex flex-col h-screen">
          <TopBar 
            onMenuClick={() => setMobileMenu(prev => ({ ...prev, isSidebarOpen: true }))}
            title={capitalizedPath}
          />
          <div className="flex-1 p-4 overflow-hidden flex gap-4">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={
                <div className="flex-1">
                  <ChatInterface
                    messages={chatState.messages}
                    isLoading={chatState.isLoading}
                    error={chatState.error}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              } />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => <AppContent />;

export default App;