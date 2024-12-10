import React from 'react';
import { format, parseISO, startOfWeek, addDays, isSameDay } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';

interface WeekViewProps {
  events: CalendarEvent[];
}

export default function WeekView({ events }: WeekViewProps) {
  const startDate = startOfWeek(new Date());
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-gray-500 mb-1">
              {format(day, 'EEE')}
            </div>
            <div
              className={`text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto
                ${isSameDay(day, new Date())
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-900'
              }`}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="w-16 text-center">
              <div className="text-sm font-medium text-gray-900">
                {format(parseISO(event.start.dateTime), 'HH:mm')}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {event.summary}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {format(parseISO(event.start.dateTime), 'HH:mm')} -{' '}
                {format(parseISO(event.end.dateTime), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}