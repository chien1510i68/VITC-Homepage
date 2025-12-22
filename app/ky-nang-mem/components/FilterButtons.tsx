import React from 'react';

export interface FilterButtonsProps<T extends string> {
  filters: Array<{ id: T; label: string; count?: number }>;
  activeFilter: T;
  onChange: (filter: T) => void;
  className?: string;
}

export function FilterButtons<T extends string>({ 
  filters, 
  activeFilter, 
  onChange,
  className = '' 
}: FilterButtonsProps<T>) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          aria-pressed={activeFilter === filter.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-600 hover:text-sky-600'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeFilter === filter.id ? 'bg-white/80' : 'bg-slate-200'}`} />
          <span>{filter.label}</span>
          {filter.count !== undefined && (
            <span className="ml-1 text-xs opacity-70">({filter.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
