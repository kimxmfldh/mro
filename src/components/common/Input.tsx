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
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text-primary disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    />
  );
};

export default Input;
