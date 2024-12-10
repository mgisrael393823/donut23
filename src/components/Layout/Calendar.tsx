import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MOCK_EVENTS = [
  { date: 18, title: 'Client Meeting', time: '09:00 AM', type: 'Zoom Meeting' },
  { date: 18, title: 'Project Review', time: '02:00 PM', type: 'Team Sync' },
];

export default function Calendar() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-eerie-black">March 2023</h2>
        <div className="flex items-center gap-4">
          <div className="flex">
            <button className="px-3 py-1 text-sm font-medium text-electric border-b-2 border-electric">
              Monthly
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-electric">
              Daily
            </button>
          </div>
          <button className="p-1 hover:bg-cream rounded-md">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 hover:bg-cream rounded-md">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-onyx">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
          <button
            key={date}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm
              ${date === 18 ? 'bg-electric text-white' : 'hover:bg-cream'}
              ${MOCK_EVENTS.some(e => e.date === date) ? 'font-bold' : ''}
            `}
          >
            {date}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-bold text-eerie-black">Today's Events</h3>
        {MOCK_EVENTS.map((event, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-cream/50">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              {event.date}
            </div>
            <div>
              <h4 className="font-medium text-eerie-black">{event.title}</h4>
              <p className="text-sm text-onyx">
                {event.time} · {event.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}