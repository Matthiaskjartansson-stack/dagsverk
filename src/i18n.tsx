import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'is' | 'en';

const STRINGS = {
  is: {
    nav: [
      { label: 'Um okkur', href: '#um-okkur' },
      { label: 'Ferlið', href: '#ferlid' },
      { label: 'Verð', href: '#verd' },
      { label: 'Spurningar', href: '#spurningar' },
      { label: 'Samband', href: '#samband' },
    ],
    offer: 'Black Friday · 50% afsláttur til 30. nóvember',
    heroText:
      'Dagsverk smíðar vefsíður fyrir lítil fyrirtæki á einum vinnudegi. Þú pantar að morgni og síðan þín er komin í loftið áður en þú lokar.',
    heroCta: 'Panta síðu í dag',
    heroSr: 'Dagsverk – vefsíður á einum degi',
    aboutLabel: 'Vefsíður á einum degi',
    aboutSegments: ['Við erum Dagsverk,', 'lítið vefstúdíó í Reykjavík.', 'Við smíðum hraðar og fallegar síður fyrir lítil fyrirtæki.'],
    aboutBody:
      'Hvert fyrirtæki fær sitt eigið útlit, ekkert sniðmát. Þú sendir okkur nafn, lógó og nokkrar línur um reksturinn. Við skrifum textann, veljum liti og myndir og setjum síðuna á lénið þitt sama dag. Ef fyrstu drögin henta þér ekki færðu endurgreitt að fullu.',
    featTitle: 'Vefsíða sem selur, tilbúin samdægurs.',
    featSub: 'Hálfvirði til 30. nóvember.',
    videoCard: 'Síðan þín, í loftinu í kvöld.',
    before: 'áður ',
    plans: {
      tilbod: {
        title: 'Tilboðssíða.',
        now: '14.900 kr',
        was: '29.800 kr',
        items: [
          'Ein síða fyrir Black Friday- eða jólatilboðið þitt.',
          'Hentar vel til að deila á Facebook og Instagram.',
          'Virkar fullkomlega í síma.',
          'Pantir þú fyrir kl. 12 er hún tilbúin sama dag.',
        ],
        cta: 'Panta tilboðssíðu',
      },
      heimasida: {
        title: 'Heimasíða.',
        now: '39.900 kr',
        was: '79.800 kr',
        items: [
          'Um okkur, þjónusta, myndir, kort og samband.',
          'Tengd við lénið þitt, hýsing án mánaðargjalds.',
          'Ein umferð lagfæringa innifalin.',
        ],
        cta: 'Panta heimasíðu',
      },
      ferlid: {
        title: 'Ferlið.',
        steps: [
          ['09:00', 'Þú sendir nafn, lógó og nokkrar línur.'],
          ['12:00', 'Þú færð fyrstu drögin og segir hvað á að breytast.'],
          ['17:00', 'Síðan fer í loftið á lénið þitt.'],
        ],
        cta: 'Spyrja spurningar',
      },
    },
    faqLabel: 'Spurningar',
    faq: [
      ['Þarf ég að eiga lén?', 'Nei. Við hjálpum þér að skrá .is lén eða notum lén sem þú átt nú þegar.'],
      ['Hvað ef ég á enga texta eða myndir?', 'Við skrifum textann út frá stuttu spjalli og notum myndir af samfélagsmiðlunum þínum eða vandaðar myndir úr myndabanka.'],
      ['Er mánaðargjald fyrir hýsingu?', 'Nei. Hýsing er innifalin án mánaðargjalds. Lén (.is) greiðist sér hjá ISNIC.'],
      ['Hvernig greiði ég?', 'Með korti á öruggri greiðslusíðu. Við byrjum á síðunni um leið og greiðsla berst.'],
      ['Get ég látið breyta síðunni seinna?', 'Já. Þú sendir okkur línu og við lögum smáatriði fyrir þig.'],
    ],
    contactLabel: 'Samband',
    contactTitle: ['Byrjum', 'í dag.'],
    contactText: 'Sendu okkur línu. Við svörum yfirleitt innan klukkustundar.',
    footer: 'Vefsíður smíðaðar á einum degi · Reykjavík',
    switchTo: 'English',
  },
  en: {
    nav: [
      { label: 'About', href: '#um-okkur' },
      { label: 'Process', href: '#ferlid' },
      { label: 'Pricing', href: '#verd' },
      { label: 'FAQ', href: '#spurningar' },
      { label: 'Contact', href: '#samband' },
    ],
    offer: 'Black Friday · 50% off until November 30',
    heroText:
      'Dagsverk builds websites for small businesses in one working day. Order in the morning and your site is live before you close.',
    heroCta: 'Order your site today',
    heroSr: 'Dagsverk – websites in a day',
    aboutLabel: 'Websites in a day',
    aboutSegments: ['We are Dagsverk,', 'a small web studio in Reykjavík.', 'We build fast, beautiful sites for small businesses worldwide.'],
    aboutBody:
      'Every business gets its own look, never a template. Send us your name, logo and a few lines about what you do. We write the copy, pick the colors and images, and put the site on your domain the same day. If the first draft isn’t right for you, you get a full refund.',
    featTitle: 'A website that sells, ready the same day.',
    featSub: 'Half price until November 30.',
    videoCard: 'Your site, live tonight.',
    before: 'was ',
    plans: {
      tilbod: {
        title: 'Offer page.',
        now: '$99',
        was: '$198',
        items: [
          'One page for your Black Friday or holiday offer.',
          'Made to share on Facebook and Instagram.',
          'Works perfectly on phones.',
          'Order before noon (GMT) and it’s ready the same day.',
        ],
        cta: 'Order an offer page',
      },
      heimasida: {
        title: 'Website.',
        now: '$279',
        was: '$558',
        items: [
          'About, services, photos, map and contact.',
          'Connected to your domain, no monthly hosting fee.',
          'One round of revisions included.',
        ],
        cta: 'Order a website',
      },
      ferlid: {
        title: 'The process.',
        steps: [
          ['09:00', 'You send your name, logo and a few lines.'],
          ['12:00', 'You get the first draft and tell us what to change.'],
          ['17:00', 'Your site goes live on your domain.'],
        ],
        cta: 'Ask a question',
      },
    },
    faqLabel: 'FAQ',
    faq: [
      ['Do I need a domain?', 'No. We can help you register one, or use a domain you already own.'],
      ['What if I have no copy or photos?', 'We write the copy from a short chat and use photos from your social media or quality stock images.'],
      ['Is there a monthly hosting fee?', 'No. Hosting is included with no monthly fee. A domain, if you want one, is paid separately to your registrar.'],
      ['How do I pay?', 'By card on a secure payment page. We start as soon as payment arrives.'],
      ['Do you work across time zones?', 'Yes. We’re in Iceland (GMT) and work with clients in Europe and North America.'],
    ],
    contactLabel: 'Contact',
    contactTitle: ['Let’s start', 'today.'],
    contactText: 'Send us a line. We usually reply within an hour during GMT working hours.',
    footer: 'Websites built in a day · Reykjavík, Iceland',
    switchTo: 'Íslenska',
  },
} as const;

export type Strings = (typeof STRINGS)[Lang];

const readInitial = (): Lang => {
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'en' || q === 'is') return q;
  try {
    const saved = localStorage.getItem('dagsverk-lang');
    if (saved === 'en' || saved === 'is') return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('is') ? 'is' : 'en';
};

const LangContext = createContext<{ lang: Lang; t: Strings; toggle: () => void } | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'Dagsverk – Websites in a day' : 'Dagsverk – Vefsíður á einum degi';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
    try {
      localStorage.setItem('dagsverk-lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'is' ? 'en' : 'is'));
  return <LangContext.Provider value={{ lang, t: STRINGS[lang], toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
