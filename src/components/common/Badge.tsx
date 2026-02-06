import React from 'react';
import { TaskPriority } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  priority?: TaskPriority;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color, priority, className = '' }) => {
  let bgColor = color || '#6B7280';
  let textColor = '#FFFFFF';

  if (priority) {
    switch (priority) {
      case '높음':
        bgColor = '#EF4444';
        break;
      case '보통':
        bgColor = '#F59E0B';
        break;
      case '낮음':
        bgColor = '#6B7280';
        break;
    }
  }

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </span>
  );
};

export default Badge;
