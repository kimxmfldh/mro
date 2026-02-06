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
      className={`bg-bg-card rounded-lg shadow-md p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
