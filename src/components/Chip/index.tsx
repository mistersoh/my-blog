import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

function Chip({ children, className = '' }: ChipProps) {
  return (
    <div className={`bg-gray-100 px-3 py-1 rounded-2xl text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors ${className}`}>
      {children}
    </div>
  );
}

Chip.displayName = "Chip";

export default Chip; 