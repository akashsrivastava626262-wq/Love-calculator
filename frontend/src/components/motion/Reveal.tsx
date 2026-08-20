'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp, defaultViewport, motionTransition } from '@/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: 'div' | 'section' | 'article' | 'li';
  once?: boolean;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  variants = fadeUp,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...defaultViewport, once }}
      variants={variants}
      transition={motionTransition(delay, duration)}
    >
      {children}
    </Component>
  );
}

export function StaggerReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp} transition={motionTransition()}>
      {children}
    </motion.div>
  );
}
