import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import WeekView from './WeekView';
import EventList from './EventList';

export default function Calendar() {
  const navigate = useNavigate();
  const { events, isLoading, error, fetchEvents } = useCalendarEvents();
  const [view, setView] = useState<'week' | 'list'>('week');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('googleToken');
    if (storedToken) {
      setToken(storedToken);
      fetchEvents();
    }
  }, [fetchEvents]);

  const login = useGoogleLogin({
    onSuccess: response => {
      localStorage.setItem('googleToken', response.access_token);
      window.location.href = '/#/calendar';
    },
    onError: (error) => console.error('Login Failed:', error),
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit'
  });

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Calendar</h2>
          <p className="text-gray-600 mb-6">Connect your Google Calendar to view and manage your events</p>
          <button
            onClick={() => login()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 mx-auto"
          >
            <CalendarIcon size={20} />
            Connect Google Calendar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                view === 'week'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        ) : view === 'week' ? (
          <WeekView events={events} />
        ) : (
          <EventList events={events} />
        )}
      </div>
    </div>
  );
}