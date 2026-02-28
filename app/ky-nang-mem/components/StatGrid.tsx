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
  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const gridClass = gridColsMap[columns] || 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-6 sm:gap-10 md:gap-14 ${className}`}>
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
}
