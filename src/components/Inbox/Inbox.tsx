import React from 'react';
import { Mail, Star, Archive, Trash2 } from 'lucide-react';

export default function Inbox() {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="border-b border-gray-100 p-4">
        <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Archive size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Trash2 size={20} />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            No messages selected
          </div>
        </div>

        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <button className="text-gray-400 hover:text-gray-600">
                <Star size={18} />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail size={20} className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    Example Message {i + 1}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  This is an example message preview that would appear in the inbox.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}