import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Clock, MapPin, Phone, Scissors } from 'lucide-react';
import { ProposalBanner, Reveal, SplitWords, EASE_OUT } from './shared';
import './demo.css';

const C = { bg: '#0E0E0E', ink: '#F4EFE6', coral: '#FF5A36', muted: '#8C877E', panel: '#191817' };
const display = { fontFamily: "'Anton', Impact, sans-serif" };
const body = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const SLOTS = ['10:30', '11:15', '13:00', '14:45', '16:30'];
const PHONE = '581 3090';
const HOURS = [
  ['Mánudagur – föstudagur', '09:00 – 18:00'],
  ['Laugardagur', '10:00 – 18:00'],
  ['Sunnudagur', 'Lokað'],
];
const SERVICES = [
  ['Klipping', 'Dömu-, herra- og barnaklipping'],
  ['Litun', 'Heillitun, rót og glans'],
  ['Strípur', 'Folíur og balayage'],
  ['Blástur', 'Fyrir veislur og viðburði'],
  ['Skegg', 'Snyrting og mótun'],
  ['Permanent', 'Liðir og lyfting'],
];

function ScissorsLine() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 1200 80" className="w-full h-auto" aria-hidden>
      <motion.path
        d="M0 40 H1200"
        stroke={C.coral}
        strokeWidth="2"
        strokeDasharray="10 10"
        fill="none"
        style={{ originX: 0 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      />
      <motion.g
        initial={{ x: reduce ? 1120 : 0 }}
        whileInView={{ x: 1120 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <circle cx="30" cy="22" r="12" fill="none" stroke={C.ink} strokeWidth="4" />
        <circle cx="30" cy="58" r="12" fill="none" stroke={C.ink} strokeWidth="4" />
        <path d="M40 28 L80 46 M40 52 L80 34" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -30]);
  return (
    <header className="relative overflow-hidden px-4 pt-10 pb-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm" style={{ color: C.muted }}>
          <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Háaleitisbraut 58–60, Reykjavík</span>
          <span className="inline-flex items-center gap-2" style={{ color: C.coral }}>
            <span className="w-2 h-2 rounded-full" style={{ background: C.coral }} /> Opið í dag · tekið við fólki án tímapöntunar
          </span>
        </div>

        <motion.h1 style={{ ...display, color: C.ink, y }} className="mt-10 sm:mt-16 uppercase leading-[0.82] text-[24vw] sm:text-[21vw] lg:text-[17.5vw] tracking-tight">
          <SplitWords text="Greiðan" />
        </motion.h1>

        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="md:col-span-6 text-lg sm:text-2xl leading-snug" style={{ ...body, color: C.ink }}>
            <SplitWords text="Hverfisstofan sem tekur á móti þér í dag. Kíktu við, við finnum stól." delay={0.3} />
          </p>
          <Reveal index={4} className="md:col-span-6 md:justify-self-end flex flex-wrap gap-3">
            <a href="#lausir" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-black transition-transform duration-150 active:scale-[0.97]" style={{ ...body, background: C.coral }}>
              Sjá lausa tíma í dag <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#thjonusta" className="inline-flex items-center rounded-full px-6 py-3 border transition-opacity duration-150 hover:opacity-80" style={{ ...body, color: C.ink, borderColor: '#3a3835' }}>
              Þjónusta
            </a>
          </Reveal>
        </div>
      </div>
      <div className="mt-12"><ScissorsLine /></div>
    </header>
  );
}

function Slots() {
  return (
    <section id="lausir" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em]" style={{ ...body, color: C.coral }}>Lausir tímar í dag</p>
          <h2 className="mt-4 uppercase text-5xl sm:text-7xl leading-[0.9]" style={{ ...display, color: C.ink }}>
            <SplitWords text="Enginn biðlisti." />
          </h2>
          <p className="mt-5 max-w-md text-base sm:text-lg" style={{ ...body, color: C.muted }}>
            Við póstum laus pláss um leið og þau opnast. Smelltu á tíma til að taka hann frá, eða komdu bara við.
          </p>
        </div>
        <ul className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
          {SLOTS.map((t, i) => (
            <Reveal as="li" key={t} index={i}>
              <button
                type="button"
                className="group w-full rounded-2xl p-5 text-left transition-transform duration-150 active:scale-[0.97]"
                style={{ background: C.panel, color: C.ink }}
              >
                <span className="flex items-center gap-2 text-xs" style={{ ...body, color: C.muted }}><Clock className="w-3.5 h-3.5" /> Í dag</span>
                <span className="mt-2 block text-4xl tabular-nums" style={display}>{t}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm transition-colors duration-150 group-hover:text-[#FF5A36]" style={body}>
                  Taka frá <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
          <Reveal as="li" index={SLOTS.length}>
            <div className="h-full rounded-2xl p-5 flex flex-col justify-between" style={{ background: C.coral, color: '#120A07' }}>
              <Scissors className="w-6 h-6" />
              <span className="mt-6 text-lg leading-tight font-medium" style={body}>Eða gakktu inn. Við gerum pláss.</span>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function Marquee() {
  const reduce = useReducedMotion();
  const words = ['Klipping', 'Litun', 'Strípur', 'Blástur', 'Skegg', 'Án tímapöntunar'];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden py-6 border-y" style={{ borderColor: '#2a2826' }} aria-hidden>
      <motion.div
        className="flex whitespace-nowrap gap-10 uppercase text-4xl sm:text-6xl"
        style={{ ...display, color: C.ink }}
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span style={{ color: C.coral }}>✂</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Services() {
  return (
    <section id="thjonusta" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="uppercase text-5xl sm:text-7xl" style={{ ...display, color: C.ink }}>
          <SplitWords text="Þjónusta" />
        </h2>
        <ul className="mt-10 border-t" style={{ borderColor: '#2a2826' }}>
          {SERVICES.map(([name, desc], i) => (
            <Reveal as="li" key={name} index={i % 3} className="border-b border-[#2a2826]">
              <div className="group flex flex-wrap items-baseline justify-between gap-3 py-6">
                <span className="uppercase text-3xl sm:text-5xl transition-transform duration-200 group-hover:translate-x-2" style={{ ...display, color: C.ink }}>
                  {name}
                </span>
                <span className="text-sm sm:text-base" style={{ ...body, color: C.muted }}>{desc}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm" style={{ ...body, color: C.muted }}>Verðskrá kemur hér.</p>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="px-4 pb-20 sm:px-8">
      <div className="mx-auto max-w-7xl grid gap-3 md:grid-cols-2">
        <Reveal>
          <div style={{ background: C.coral, color: '#120A07' }} className="rounded-3xl p-8 sm:p-12 h-full min-h-[280px] flex flex-col justify-between">
            <h2 className="uppercase text-5xl sm:text-7xl leading-[0.9]" style={display}>Komdu við</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 text-base sm:text-lg" style={body}>
              <div className="space-y-2">
                <p className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Háaleitisbraut 58–60</p>
                <p>108 Reykjavík</p>
                <a href="tel:+3545813090" className="inline-flex items-center gap-2 font-medium underline underline-offset-4"><Phone className="w-5 h-5" /> {PHONE}</a>
              </div>
              <dl className="space-y-1 text-sm sm:text-base">
                {HOURS.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4 border-b border-black/15 pb-1">
                    <dt>{d}</dt>
                    <dd className="tabular-nums">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
        <Reveal index={1} className="rounded-3xl overflow-hidden">
          <svg viewBox="0 0 400 300" className="w-full h-full min-h-[280px]" role="img" aria-label="Kort sem sýnir staðsetningu við Háaleitisbraut">
            <rect width="400" height="300" fill={C.panel} />
            <g stroke="#2e2c29" strokeWidth="14" fill="none">
              <path d="M-10 90 H410" /><path d="M-10 210 H410" /><path d="M120 -10 V310" /><path d="M290 -10 V310" />
            </g>
            <g stroke="#3a3835" strokeWidth="5"><path d="M-10 150 Q200 120 410 160" fill="none" /></g>
            <text x="135" y="84" fill={C.muted} fontSize="11" style={body}>Háaleitisbraut</text>
            <motion.g initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3, ease: EASE_OUT }}>
              <circle cx="205" cy="150" r="26" fill={C.coral} opacity="0.2" />
              <circle cx="205" cy="150" r="9" fill={C.coral} />
            </motion.g>
          </svg>
        </Reveal>
      </div>
      <footer className="mx-auto max-w-7xl mt-10 flex flex-wrap justify-between gap-2 text-xs" style={{ ...body, color: C.muted }}>
        <span>© Greiðan Hárgreiðslustofa</span>
        <span>Tillaga smíðuð af Dagsverk</span>
      </footer>
    </section>
  );
}

function App() {
  return (
    <div style={{ background: C.bg, ...body }} className="min-h-screen">
      <ProposalBanner business="Greiðuna Hárgreiðslustofu" dark />
      <Hero />
      <Slots />
      <Marquee />
      <Services />
      <Visit />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
