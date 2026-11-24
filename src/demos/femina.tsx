import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Phone, Plus, Sparkles } from 'lucide-react';
import { ProposalBanner, Reveal, SplitWords, EASE_OUT } from './shared';
import './demo.css';

const C = { bg: '#F4EEE8', blush: '#E8C9C0', sage: '#B7C4AE', deep: '#3D3631', muted: '#8A7F76', card: '#FBF8F5', gold: '#B8956A' };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Manrope', system-ui, sans-serif" };
const PHONE = '772 1666';

const TREATMENTS = [
  { name: 'Andlitsmeðferðir', text: 'Djúphreinsun, rakagefandi og endurnærandi meðferðir sniðnar að þinni húð.' },
  { name: 'Litun og plokkun', text: 'Augabrúnir og augnhár mótuð og lituð svo umgjörðin njóti sín.' },
  { name: 'Vaxmeðferðir', text: 'Mjúk og vönduð vaxmeðferð fyrir andlit og líkama.' },
  { name: 'Hand- og fótsnyrting', text: 'Snyrting, naglalakk og dekur fyrir hendur og fætur.' },
  { name: 'Gjafabréf', text: 'Falleg jólagjöf sem gleður. Fæst á stofunni.' },
];

/** Slow parallax orbs: decoration in the hero only, driven by scroll (no idle loop). */
function Orbs() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);
  const y2 = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -90]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div style={{ y: y1, background: C.blush }} className="absolute -top-24 -right-20 h-[55vw] w-[55vw] max-h-[620px] max-w-[620px] rounded-full opacity-70 blur-3xl" />
      <motion.div style={{ y: y2, background: C.sage }} className="absolute bottom-[-20%] -left-24 h-[45vw] w-[45vw] max-h-[520px] max-w-[520px] rounded-full opacity-60 blur-3xl" />
    </div>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden px-4 sm:px-8">
      <Orbs />
      <div className="relative mx-auto max-w-6xl pt-10 pb-24 sm:pb-32">
        <nav className="flex items-center justify-between">
          <span className="text-3xl tracking-wide" style={{ ...serif, color: C.deep }}>Femina</span>
          <a href={`tel:+354${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sm" style={{ ...sans, color: C.deep }}>
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
        </nav>
        <p className="mt-24 sm:mt-32 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]" style={{ ...sans, color: C.gold }}>
          <Sparkles className="w-3.5 h-3.5" /> Snyrtistofa · Strikinu 6, Garðabæ
        </p>
        <h1 className="mt-5 text-[16vw] sm:text-[11vw] lg:text-[9.5rem] leading-[0.88] font-normal" style={{ ...serif, color: C.deep }}>
          <SplitWords text="Gefðu þér" />
          <br />
          <SplitWords text="stund." delay={0.16} wordClass="italic" />
        </h1>
        <Reveal index={3} className="mt-8 max-w-md">
          <p className="text-base sm:text-lg leading-relaxed" style={{ ...sans, color: C.muted }}>
            Róleg og hlýleg snyrtistofa þar sem fagfólk hugsar um húðina þína frá toppi til táar.
          </p>
        </Reveal>
        <Reveal index={4} className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:+354${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-150 active:scale-[0.97]" style={{ ...sans, background: C.deep, color: C.bg }}>
            Bóka í síma {PHONE}
          </a>
          <a href="#medferdir" className="inline-flex items-center rounded-full px-7 py-3.5 text-sm border transition-opacity duration-150 hover:opacity-70" style={{ ...sans, color: C.deep, borderColor: C.deep }}>
            Meðferðir
          </a>
        </Reveal>
      </div>
    </header>
  );
}

function Treatment({ name, text, i }: { name: string; text: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <Reveal as="li" index={i} className="border-b" >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full min-h-[64px] items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-3xl sm:text-5xl" style={{ ...serif, color: C.deep }}>{name}</span>
        <Plus className="h-6 w-6 shrink-0 transition-transform duration-200" style={{ color: C.gold, transform: open ? 'rotate(45deg)' : 'none' }} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <p className="pb-7 max-w-xl text-base leading-relaxed" style={{ ...sans, color: C.muted }}>{text}</p>
      </motion.div>
    </Reveal>
  );
}

function Treatments() {
  return (
    <section id="medferdir" className="px-4 py-20 sm:px-8 sm:py-28" style={{ background: C.card }}>
      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ ...sans, color: C.gold }}>Meðferðir</p>
          <h2 className="mt-4 text-5xl sm:text-6xl leading-[0.95]" style={{ ...serif, color: C.deep }}>
            <SplitWords text="Allt sem húðin" /> <SplitWords text="þráir." wordClass="italic" delay={0.24} />
          </h2>
          <p className="mt-6 text-sm" style={{ ...sans, color: C.muted }}>Verðskrá kemur hér.</p>
        </div>
        <ul className="lg:col-span-8 border-t" style={{ borderColor: '#E4DAD1' }}>
          {TREATMENTS.map((t, i) => <Treatment key={t.name} {...t} i={i} />)}
        </ul>
      </div>
    </section>
  );
}

function Gift() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32" style={{ background: C.deep }}>
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ ...sans, color: C.gold }}>Fyrir jólin</p>
          <h2 className="mt-4 text-5xl sm:text-7xl leading-[0.95]" style={{ ...serif, color: C.bg }}>
            <SplitWords text="Gjafabréf sem" /> <SplitWords text="gleður." wordClass="italic" delay={0.24} />
          </h2>
          <p className="mt-6 max-w-md text-base" style={{ ...sans, color: '#CFC4BA' }}>
            Hringdu í {PHONE} og við útbúum gjafabréf í fallegum umbúðum.
          </p>
        </div>
        <Reveal index={1}>
          <motion.div
            className="mx-auto aspect-[1.6] w-full max-w-md rounded-2xl p-7 flex flex-col justify-between shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${C.blush}, ${C.bg} 60%, ${C.sage})` }}
            whileHover={reduce ? undefined : { rotate: -1.5, y: -6 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <span className="text-3xl" style={{ ...serif, color: C.deep }}>Femina</span>
            <div className="flex items-end justify-between">
              <span className="text-xs uppercase tracking-[0.3em]" style={{ ...sans, color: C.deep }}>Gjafabréf</span>
              <span className="text-4xl italic" style={{ ...serif, color: C.deep }}>fyrir þig</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
      <footer className="mx-auto max-w-6xl mt-20 flex flex-wrap justify-between gap-2 text-xs" style={{ ...sans, color: '#A89D93' }}>
        <span>© Femina snyrtistofa · Strikinu 6, 210 Garðabæ · {PHONE}</span>
        <span>Tillaga smíðuð af Dagsverk</span>
      </footer>
    </section>
  );
}

function App() {
  return (
    <div style={{ background: C.bg, ...sans }} className="min-h-screen">
      <ProposalBanner business="Feminu snyrtistofu" />
      <Hero />
      <Treatments />
      <Gift />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
