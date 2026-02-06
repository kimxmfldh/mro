import React from 'react';
import { TaskPriority } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  priority?: TaskPriority;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color, priority, className = '' }) => {
  let bgColor = color || '#71717A';
  let textColor = '#FFFFFF';
  let borderColor = '';

  if (priority) {
    switch (priority) {
      case '높음':
        bgColor = '#FEE2E2';
        textColor = '#991B1B';
        borderColor = '#FCA5A5';
        break;
      case '보통':
        bgColor = '#FEF3C7';
        textColor = '#92400E';
        borderColor = '#FCD34D';
        break;
      case '낮음':
        bgColor = '#F4F4F5';
        textColor = '#52525B';
        borderColor = '#E4E4E7';
        break;
    }
  }

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border ${className}`}
      style={{
        backgroundColor: priority ? bgColor : color,
        color: priority ? textColor : '#FFFFFF',
        borderColor: priority ? borderColor : 'transparent'
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
