import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  count?: number;
}

export function NavLink({ icon, label, href, isActive = false, count }: NavLinkProps) {
  const location = useLocation();
  const isCurrentPath = location.pathname === href;
  const activeState = isActive || isCurrentPath;

  return (
    <Link
      to={href}
      className={`flex items-center justify-between px-2 py-2 rounded-lg transition-colors ${
        activeState
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500">{count}</span>
      )}
    </Link>
  );
}