import React from 'react';

export default function PerformanceChart() {
  const data = [25, 45, 87, 35, 45, 30, 25];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-sm text-gray-500">Last Week</h4>
        </div>
        <select className="text-sm border-none bg-transparent focus:ring-0">
          <option>Normalized</option>
          <option>Raw Data</option>
        </select>
      </div>
      
      <div className="flex items-end h-32 sm:h-48 gap-2 sm:gap-4">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-electric/20 rounded-md relative overflow-hidden"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <div 
                className="absolute bottom-0 w-full bg-electric rounded-md"
                style={{ height: `${value}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-electric" />
          <span className="text-xs sm:text-sm text-gray-600">Goal Achieved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-electric/20" />
          <span className="text-xs sm:text-sm text-gray-600">Expected</span>
        </div>
      </div>
    </div>
  );
}