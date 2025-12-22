import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <div className="text-2xl font-light text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

interface StatGridProps {
  stats: StatItemProps[];
  columns?: number;
  className?: string;
}

export function StatGrid({ stats, columns = 3, className = '' }: StatGridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
}
