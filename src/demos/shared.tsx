import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type CSSProperties, type ReactNode } from 'react';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const DAGSVERK_URL = 'https://matthiaskjartansson-stack.github.io/dagsverk/';

/** Sticky strip that makes clear the page is a proposal, not the business's official site. */
export function ProposalBanner({ business, dark = false }: { business: string; dark?: boolean }) {
  return (
    <div
      className={`sticky top-0 z-50 w-full text-[11px] sm:text-xs ${dark ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2">
        <span>
          <strong className="font-semibold">Tillaga frá Dagsverk</strong> · Sýnishorn fyrir {business}, ekki opinber
          síða. Upplýsingar eru dæmi.
        </span>
        <a href={DAGSVERK_URL} className="underline underline-offset-2 opacity-80 hover:opacity-100">
          Þessi síða fyrir 14.900 kr →
        </a>
      </div>
    </div>
  );
}

/** Words slide up 12px, de-blur and fade, ~80ms apart. */
export function SplitWords({
  text,
  className = '',
  style,
  delay = 0,
  wordClass = '',
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  wordClass?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block ${wordClass}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: EASE_OUT }}
        >
          {w}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
}

/** Group reveal on scroll: one entrance per block, staggered by index (~100ms). */
export function Reveal({
  children,
  index = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}
