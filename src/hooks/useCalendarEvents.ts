import { useState, useCallback } from 'react';
import { startOfWeek, addDays } from 'date-fns';
import { CalendarEvent } from '../types/calendar';

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    const token = localStorage.getItem('googleToken');
    if (!token) {
      setError(null); // Don't show error when token is missing
      return;
    }

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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('googleToken');
          setError('Authentication expired. Please reconnect your calendar.');
          return;
        }
        throw new Error('Failed to fetch calendar events');
      }

      const data = await response.json();
      setEvents(data.items || []);
    } catch (error) {
      localStorage.removeItem('googleToken');
      setError('Failed to fetch calendar events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { events, isLoading, error, fetchEvents };
}