import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  required = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-text-primary disabled:bg-gray-50 disabled:cursor-not-allowed transition-all ${className}`}
    />
  );
};

export default Input;
