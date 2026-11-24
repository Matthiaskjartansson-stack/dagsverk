import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { ProposalBanner, Reveal, SplitWords, EASE_OUT } from './shared';
import './demo.css';

const C = { bg: '#14291F', paper: '#EFE6D8', peach: '#F2A07B', sage: '#8FA98F', ink: '#14291F', soft: '#B9C4B6' };
const serif = { fontFamily: "'DM Serif Display', Georgia, serif" };
const sans = { fontFamily: "'Karla', system-ui, sans-serif" };

const STORY =
  'Manda er hverfisstofa í hjarta Vesturbæjar. Hingað koma nágrannar, fjölskyldur og fastakúnnar sem vilja góða klippingu, gott spjall og kaffibolla á meðan liturinn tekur sig.';

/** Flowing "hair" strands that draw themselves in. */
function Strands() {
  const reduce = useReducedMotion();
  const paths = [
    'M-20 260 C 120 120, 260 360, 420 200 S 700 80, 860 220',
    'M-20 300 C 140 170, 280 400, 440 240 S 720 120, 880 260',
    'M-20 340 C 160 220, 300 440, 460 280 S 740 160, 900 300',
  ];
  return (
    <svg viewBox="0 0 860 420" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={i === 1 ? C.peach : C.sage}
          strokeWidth={i === 1 ? 3 : 1.5}
          strokeLinecap="round"
          strokeDasharray="1400"
          initial={{ opacity: 0, strokeDashoffset: reduce ? 0 : 1400 }}
          animate={{ opacity: 0.9, strokeDashoffset: 0 }}
          transition={{ duration: 2.2, delay: 0.2 + i * 0.15, ease: EASE_OUT }}
        />
      ))}
    </svg>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden px-4 sm:px-8" style={{ background: C.bg }}>
      <Strands />
      <div className="relative mx-auto max-w-6xl pt-10 pb-20 sm:pt-14 sm:pb-28">
        <nav className="flex items-center justify-between text-sm" style={{ ...sans, color: C.soft }}>
          <span style={{ ...serif, color: C.paper }} className="text-2xl">Manda</span>
          <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Hofsvallagötu 16 · Vesturbær</span>
        </nav>
        <p className="mt-20 sm:mt-28 text-xs uppercase tracking-[0.25em]" style={{ ...sans, color: C.peach }}>Hárgreiðslustofan Manda</p>
        <h1 className="mt-4 text-[15vw] sm:text-[11vw] lg:text-[9rem] leading-[0.9]" style={{ ...serif, color: C.paper }}>
          <SplitWords text="Hárið þitt," />
          <br />
          <SplitWords text="hverfið þitt." delay={0.2} wordClass="italic" style={{ color: C.peach }} />
        </h1>
        <Reveal index={4} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#boka" className="group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-medium transition-transform duration-150 active:scale-[0.97]" style={{ ...sans, background: C.paper, color: C.ink }}>
            Bóka tíma
            <span className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5" style={{ background: C.peach }}>
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <span className="text-sm" style={{ ...sans, color: C.soft }}>Gróin hverfisstofa á Hofsvallagötu</span>
        </Reveal>
      </div>
    </header>
  );
}

function Letter({ ch, i, n, p }: { ch: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(p, [start - 0.1, start + 0.05], [0.18, 1]);
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}

function Story() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] });
  const chars = STORY.split('');
  return (
    <section className="px-4 py-20 sm:px-8 sm:py-32" style={{ background: C.paper }}>
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.25em]" style={{ ...sans, color: '#7A6F60' }}>Um stofuna</p>
        <p ref={ref} className="mt-6 text-3xl sm:text-5xl leading-[1.15]" style={{ ...serif, color: C.ink }} aria-label={STORY}>
          {chars.map((ch, i) => <Letter key={i} ch={ch} i={i} n={chars.length} p={scrollYProgress} />)}
        </p>
      </div>
    </section>
  );
}

const CARDS = [
  { title: 'Klipping', note: 'Dömur, herrar og börn', bg: '#F2A07B', art: 'M30 80 l40 -50 M70 80 l-40 -50' },
  { title: 'Litun', note: 'Heillitun, rót og strípur', bg: '#8FA98F', art: 'M50 20 C 20 60, 20 90, 50 95 C 80 90, 80 60, 50 20 Z' },
  { title: 'Blástur', note: 'Fyrir stóra daginn', bg: '#D9C3A5', art: 'M15 55 q20 -25 40 0 t40 0 M15 75 q20 -25 40 0 t40 0' },
  { title: 'Kaffi', note: 'Alltaf á könnunni', bg: '#C9B8D9', art: 'M28 45 h40 v25 a20 20 0 0 1 -40 0 z M68 52 h8 a8 8 0 0 1 0 16 h-8' },
];

function Polaroids() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 py-20 sm:px-8 sm:py-28" style={{ background: C.paper }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-5xl sm:text-7xl" style={{ ...serif, color: C.ink }}>
          <SplitWords text="Úr stólnum" />
        </h2>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} index={i}>
              <motion.figure
                className="bg-white p-3 pb-5 shadow-[0_18px_40px_-20px_rgba(20,41,31,0.45)]"
                style={{ rotate: reduce ? 0 : (i % 2 ? 2.5 : -2.5) }}
                whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <div className="aspect-square flex items-center justify-center" style={{ background: c.bg }}>
                  <svg viewBox="0 0 100 110" className="w-1/2" aria-hidden>
                    <path d={c.art} fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <figcaption className="mt-4 px-1">
                  <span className="block text-2xl" style={{ ...serif, color: C.ink }}>{c.title}</span>
                  <span className="text-sm" style={{ ...sans, color: '#6B6457' }}>{c.note}</span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section id="boka" className="px-4 py-20 sm:px-8 sm:py-28" style={{ background: C.bg }}>
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 md:items-end">
        <h2 className="text-6xl sm:text-8xl leading-[0.9]" style={{ ...serif, color: C.paper }}>
          <SplitWords text="Sjáumst" /> <SplitWords text="á stofunni." wordClass="italic" style={{ color: C.peach }} delay={0.16} />
        </h2>
        <Reveal index={2} className="space-y-4 text-lg" >
          <p style={{ ...sans, color: C.soft }} className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Hofsvallagötu 16, 101 Reykjavík</p>
          <p style={{ ...sans, color: C.soft }}>Sími 551 7455 · Opnunartími kemur hér.</p>
          <a href="tel:+3545517455" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform duration-150 active:scale-[0.97]" style={{ ...sans, background: C.peach, color: C.ink }}>
            Hringja í 551 7455 <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
      <footer className="mx-auto max-w-6xl mt-16 flex flex-wrap justify-between gap-2 text-xs" style={{ ...sans, color: C.soft }}>
        <span>© Hárgreiðslustofan Manda</span>
        <span>Tillaga smíðuð af Dagsverk</span>
      </footer>
    </section>
  );
}

function App() {
  return (
    <div style={sans} className="min-h-screen">
      <ProposalBanner business="Hárgreiðslustofuna Möndu" />
      <Hero />
      <Story />
      <Polaroids />
      <Book />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
