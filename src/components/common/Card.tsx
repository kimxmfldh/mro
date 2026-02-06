import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, onClick }) => {
  return (
    <div
      className={`bg-bg-card rounded-xl border border-border p-6 ${onClick ? 'cursor-pointer hover:border-gray-300 transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="text-base font-semibold text-text-primary mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
