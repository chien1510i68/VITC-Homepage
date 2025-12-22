import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} ${className}`}>
      {label && (
        <div className="flex items-center gap-4 mb-6">
          {align === 'center' && <div className="w-12 h-px bg-slate-900" />}
          <span className="text-xs tracking-[0.25em] uppercase text-slate-500 font-medium">
            {label}
          </span>
          {align === 'center' && <div className="w-12 h-px bg-slate-900" />}
        </div>
      )}

      {typeof title === 'string' ? (
        <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900 mb-6">
          {title}
        </h2>
      ) : (
        title
      )}

      {description && (
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
