import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import { useLang } from '../i18n';

function AnimatedLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function About() {
  const { t } = useLang();
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ['start 0.8', 'end 0.2'] });
  const chars = t.aboutBody.split('');

  return (
    <section id="um-okkur" className="bg-black px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-16 sm:px-10 sm:py-24 md:py-32 text-center">
        <p className="text-primary text-[10px] sm:text-xs mb-6 sm:mb-8 tracking-wide">{t.aboutLabel}</p>

        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          style={{ color: '#E1E0CC' }}
          segments={[
            { text: t.aboutSegments[0], className: 'font-normal' },
            { text: t.aboutSegments[1], className: 'italic font-serif' },
            { text: t.aboutSegments[2], className: 'font-normal' },
          ]}
        />

        <p
          ref={bodyRef}
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-10 sm:mt-14 leading-relaxed"
        >
          {chars.map((char, i) => (
            <AnimatedLetter key={i} char={char} index={i} total={chars.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}
