import React from 'react';
import { Home, Calendar, Mail, Clock, Star, Rocket, LogOut, ChevronDown } from 'lucide-react';
import { NavLink } from './NavLink';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div className={`
        fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `} onClick={onClose} />
      
      <div className={`
        fixed lg:static inset-y-0 left-0 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 bg-white h-screen flex flex-col border-r border-gray-100 z-30
      `}>
        <div className="flex items-center gap-2 p-4 mb-4">
          <Calendar className="text-blue-600" size={24} />
          <span className="text-lg font-medium">Lumos</span>
        </div>
        
        <nav className="flex-1 px-3">
          <NavLink icon={<Home size={20} />} href="/home" label="Home" />
          <NavLink icon={<Calendar size={20} />} href="/calendar" label="Calendar" />
          <NavLink icon={<Mail size={20} />} href="/inbox" label="Inbox" />
          <NavLink icon={<Clock size={20} />} href="/productivity" label="Productivity" />
          
          <div className="mt-8">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-medium text-gray-500">FAVORITES</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <div className="space-y-1">
              <NavLink icon={<Star size={20} />} href="/kanban" label="Kanban board" count={24} />
              <NavLink icon={<Star size={20} />} href="/design" label="Design" count={62} />
              <NavLink icon={<Star size={20} />} href="/development" label="Development" count={38} />
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-medium text-gray-500">WORK SPACES</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <NavLink icon={<Rocket size={20} />} href="/work-spaces" label="Work spaces" />
          </div>
        </nav>
        
        <div className="mt-auto p-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-2 py-2 rounded-lg w-full text-sm">
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}