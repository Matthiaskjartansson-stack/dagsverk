import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRef } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import { PAY } from '../config';
import { useLang, type Strings } from '../i18n';

const CARD_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const img = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${file}&w=1280&q=85`;

const ICONS = {
  verd: img('hf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png'),
  heimasida: img('hf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png'),
  ferlid: img('hf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png'),
};

interface FeatureCard {
  id: string;
  number: string;
  title: string;
  icon: string;
  price?: { now: string; was: string };
  items: { lead?: string; text: string }[];
  cta: { label: string; href: string };
}

const buildFeatures = (t: Strings): FeatureCard[] => [
  {
    id: 'verd',
    number: '01',
    title: t.plans.tilbod.title,
    icon: ICONS.verd,
    price: { now: t.plans.tilbod.now, was: t.plans.tilbod.was },
    items: t.plans.tilbod.items.map((text) => ({ text })),
    cta: { label: t.plans.tilbod.cta, href: PAY.tilbod || '#samband' },
  },
  {
    id: 'heimasida',
    number: '02',
    title: t.plans.heimasida.title,
    icon: ICONS.heimasida,
    price: { now: t.plans.heimasida.now, was: t.plans.heimasida.was },
    items: t.plans.heimasida.items.map((text) => ({ text })),
    cta: { label: t.plans.heimasida.cta, href: PAY.heimasida || '#samband' },
  },
  {
    id: 'ferlid',
    number: '03',
    title: t.plans.ferlid.title,
    icon: ICONS.ferlid,
    items: t.plans.ferlid.steps.map(([lead, text]) => ({ lead, text })),
    cta: { label: t.plans.ferlid.cta, href: '#spurningar' },
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function AnimatedCard({
  index,
  id,
  className,
  children,
}: {
  index: number;
  id?: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Features() {
  const { t } = useLang();
  const FEATURES = buildFeatures(t);
  return (
    <section className="relative min-h-screen bg-black px-4 py-16 sm:px-6 sm:py-24 md:py-32 overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col items-start">
          <WordsPullUpMultiStyle
            className="!justify-start text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
            style={{ color: '#E1E0CC' }}
            segments={[{ text: t.featTitle }]}
          />
          <WordsPullUpMultiStyle
            className="!justify-start text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500"
            segments={[{ text: t.featSub }]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <AnimatedCard index={0} className="relative overflow-hidden rounded-2xl min-h-[380px] lg:min-h-0 lg:h-full">
            <video
              src={CARD_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-0 left-0 p-5 sm:p-6 text-lg sm:text-xl" style={{ color: '#E1E0CC' }}>
              {t.videoCard}
            </p>
          </AnimatedCard>

          {FEATURES.map((feature, i) => (
            <AnimatedCard
              key={feature.number}
              id={feature.id}
              index={i + 1}
              className="bg-[#212121] rounded-2xl p-5 sm:p-6 flex flex-col min-h-[380px] lg:min-h-0 lg:h-full scroll-mt-6"
            >
              <img
                src={feature.icon}
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                loading="lazy"
              />
              <h3
                className="mt-6 sm:mt-8 text-lg sm:text-xl flex items-baseline justify-between gap-3"
                style={{ color: '#E1E0CC' }}
              >
                <span>{feature.title}</span>
                <span className="text-xs text-gray-500">({feature.number})</span>
              </h3>
              {feature.price && (
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl text-primary tabular-nums">{feature.price.now}</span>
                  <s className="text-xs text-gray-500">
                    <span className="sr-only">{t.before}</span>
                    {feature.price.was}
                  </s>
                </p>
              )}
              <ul className="mt-5 flex flex-col gap-3">
                {feature.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5 text-sm text-gray-400 leading-snug">
                    {item.lead ? (
                      <span className="text-primary tabular-nums shrink-0 w-11">{item.lead}</span>
                    ) : (
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={feature.cta.href}
                {...(feature.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                className="group mt-auto pt-6 inline-flex items-center gap-1.5 text-sm text-primary hover:text-[#E1E0CC] transition-colors w-fit"
              >
                {feature.cta.label}
                <ArrowRight className="w-4 h-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
