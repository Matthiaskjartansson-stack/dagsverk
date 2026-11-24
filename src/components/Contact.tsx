import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import { CONTACT } from '../config';

const FAQ = [
  { q: 'Þarf ég að eiga lén?', a: 'Nei. Við hjálpum þér að skrá .is lén eða notum lén sem þú átt nú þegar.' },
  {
    q: 'Hvað ef ég á enga texta eða myndir?',
    a: 'Við skrifum textann út frá stuttu spjalli og notum myndir af samfélagsmiðlunum þínum eða vandaðar myndir úr myndabanka.',
  },
  { q: 'Er mánaðargjald fyrir hýsingu?', a: 'Nei. Hýsing er innifalin án mánaðargjalds. Lén (.is) greiðist sér hjá ISNIC.' },
  { q: 'Hvernig greiði ég?', a: 'Með korti á öruggri greiðslusíðu. Við byrjum á síðunni um leið og greiðsla berst.' },
  { q: 'Get ég látið breyta síðunni seinna?', a: 'Já. Þú sendir okkur línu og við lögum smáatriði fyrir þig.' },
  { q: 'Do you work in English?', a: 'Yes. We build sites in Icelandic, English, or both, in one working day.' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full min-h-[52px] flex items-center justify-between gap-4 py-4 text-left text-sm sm:text-base"
        style={{ color: '#E1E0CC' }}
      >
        {q}
        <Plus
          className="w-4 h-4 shrink-0 text-primary transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-gray-400 leading-relaxed max-w-xl">{a}</p>
      </motion.div>
    </li>
  );
}

export default function Contact() {
  const hasContact = CONTACT.email || CONTACT.phone;
  return (
    <section className="bg-black px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-2 md:gap-1">
        <div id="spurningar" className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-6 sm:p-10 scroll-mt-6">
          <p className="text-primary text-[10px] sm:text-xs mb-4 tracking-wide">Spurningar</p>
          <ul>
            {FAQ.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </ul>
        </div>

        <div
          id="samband"
          className="relative overflow-hidden bg-[#101010] rounded-2xl md:rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between gap-10 min-h-[420px] scroll-mt-6"
        >
          <div className="noise-overlay absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" />
          <div className="relative">
            <p className="text-primary text-[10px] sm:text-xs mb-6 tracking-wide">Samband</p>
            <WordsPullUpMultiStyle
              className="!justify-start text-4xl sm:text-5xl md:text-6xl leading-[0.95]"
              style={{ color: '#E1E0CC' }}
              segments={[
                { text: 'Byrjum', className: 'font-normal' },
                { text: 'í dag.', className: 'italic font-serif' },
              ]}
            />
            <p className="mt-6 text-primary/70 text-sm sm:text-base max-w-sm" style={{ lineHeight: 1.3 }}>
              Sendu okkur línu. Við svörum yfirleitt innan klukkustundar.
            </p>
          </div>

          <div className="relative flex flex-col gap-3">
            {hasContact ? (
              <>
                {CONTACT.email && (
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 pr-1 py-1 text-black font-medium text-sm sm:text-base transition-all duration-300 w-fit"
                  >
                    {CONTACT.email}
                    <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E1E0CC' }} />
                    </span>
                  </a>
                )}
                {CONTACT.phone && (
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-primary text-lg sm:text-xl w-fit">
                    {CONTACT.phone}
                  </a>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">[Netfang og sími koma hér – fylltu út src/config.ts]</p>
            )}
          </div>
        </div>
      </div>

      <footer className="mx-auto max-w-7xl mt-10 flex flex-wrap justify-between gap-2 text-[10px] sm:text-xs text-gray-500">
        <span>© 2026 Dagsverk</span>
        <span>Vefsíður smíðaðar á einum degi · Reykjavík</span>
      </footer>
    </section>
  );
}
