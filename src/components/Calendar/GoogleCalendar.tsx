import React, { useEffect, useState } from 'react';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { config } from '../../config/env';

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

export default function GoogleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleError = (error: Error) => {
    console.error('Calendar error:', error);
    setError('Failed to connect to Google Calendar');
  };

  const login = useGoogleLogin({
    onSuccess: response => {
      setAccessToken(response.access_token);
      window.localStorage.setItem('googleToken', response.access_token);
      window.location.reload();
    },
    onError: handleError, 
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit',
    prompt: 'consent'
  });

  if (!config.google.clientId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 h-full">
        <div className="text-center py-4 text-gray-500">
          Calendar integration is not configured
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (accessToken) {
      fetchEvents();
    } else {
      // Check for stored token on component mount
      const storedToken = sessionStorage.getItem('google_access_token');
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, [accessToken]);

  const handleLogin = () => {
    setError(null);
    login();
  };

  const fetchEvents = async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        new URLSearchParams({
          timeMin: startOfWeek(new Date()).toISOString(),
          timeMax: addDays(startOfWeek(new Date()), 7).toISOString(),
          maxResults: '20',
          singleEvents: 'true',
          orderBy: 'startTime',
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }

      const data = await response.json();
      if (!data.items) throw new Error('Invalid response format');
      setEvents(data.items);
    } catch (error) {
      handleError(error instanceof Error ? error : new Error('Failed to fetch calendar events'));
    } finally {
      setIsLoading(false);
    }
  };

  const startDate = startOfWeek(new Date());
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
        {!accessToken && (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <CalendarIcon size={16} />
            Connect Google Calendar
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-gray-500 mb-1">
              {format(day, 'EEE')}
            </div>
            <div className={`text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto
              ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? 'bg-blue-600 text-white'
                : 'text-gray-900'}`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {error && (
          <div className="text-center py-2 px-3 text-red-600 bg-red-50 rounded-lg text-sm">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">Loading events...</div>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-12 text-center">
                <div className="text-sm font-medium text-gray-900">
                  {format(parseISO(event.start.dateTime), 'HH:mm')}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{event.summary}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock size={12} />
                  {format(parseISO(event.start.dateTime), 'HH:mm')} - 
                  {format(parseISO(event.end.dateTime), 'HH:mm')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            {accessToken ? 'No upcoming events' : 'Connect your calendar to see events'}
          </div>
        )}
      </div>
    </div>
  );
}