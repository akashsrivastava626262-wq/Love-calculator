'use client';

import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <Reveal className={`mb-10 md:mb-12 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-rose-600 font-medium tracking-[0.25em] text-xs md:text-sm uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-500 max-w-lg ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
