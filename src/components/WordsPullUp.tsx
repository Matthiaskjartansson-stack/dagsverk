import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  showAsterisk?: boolean;
  delay?: number;
}

export default function WordsPullUp({ text, className = '', style, showAsterisk = false, delay = 0.08 }: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        const withAsterisk = showAsterisk && isLast;
        return (
          <span key={i} className="inline-block pb-[0.05em]">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * delay, ease: [0.16, 1, 0.3, 1] }}
            >
              {withAsterisk ? (
                <>
                  {word.slice(0, -1)}
                  <span className="relative inline-block">
                    {word.slice(-1)}
                    <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none">*</span>
                  </span>
                </>
              ) : (
                word
              )}
              {!isLast && ' '}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
