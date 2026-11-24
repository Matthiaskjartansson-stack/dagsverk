import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from './WordsPullUp';
import { useLang } from '../i18n';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t, toggle } = useLang();
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 whitespace-nowrap">
            {t.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={toggle}
                className="text-[10px] sm:text-xs md:text-sm rounded-full border px-2 py-0.5 transition-opacity duration-150 hover:opacity-100 opacity-80"
                style={{ color: '#E1E0CC', borderColor: 'rgba(225, 224, 204, 0.35)' }}
              >
                {t.switchTo}
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute top-14 sm:top-16 md:top-20 inset-x-0 z-10 flex justify-center px-4 pointer-events-none">
          <motion.div
            className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[10px] sm:text-xs whitespace-nowrap text-primary"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            {t.offer}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="sr-only">{t.heroSr}</h1>
              <WordsPullUp
                text="Dagsverk"
                showAsterisk
                className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] xl:text-[14.5vw] 2xl:text-[15vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-4 sm:gap-6 lg:pb-[2vw]">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base max-w-md"
                style={{ lineHeight: 1.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                {t.heroText}
              </motion.p>
              <motion.a
                href="#verd"
                className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 pr-1 py-1 text-black font-medium text-sm sm:text-base transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              >
                {t.heroCta}
                <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
