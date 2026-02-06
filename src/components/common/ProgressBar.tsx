import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = '#10B981', className = '' }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="h-2.5 rounded-full transition-all duration-300"
        style={{
          width: `${clampedValue}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default ProgressBar;
