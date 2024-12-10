import React from 'react';
import { format, parseISO } from 'date-fns';
import { Clock } from 'lucide-react';
import { CalendarEvent } from '../../types/calendar';

interface EventListProps {
  events: CalendarEvent[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No upcoming events
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
        >
          <div className="w-12 text-center">
            <div className="text-sm font-medium text-gray-900">
              {format(parseISO(event.start.dateTime), 'HH:mm')}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{event.summary}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Clock size={12} />
              {format(parseISO(event.start.dateTime), 'HH:mm')} -{' '}
              {format(parseISO(event.end.dateTime), 'HH:mm')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}