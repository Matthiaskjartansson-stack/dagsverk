import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import { LangProvider, useLang } from './i18n';

function Page() {
  const { lang } = useLang();
  // Remount on language change so the pull-up text animations replay in the new language.
  return (
    <main key={lang} className="bg-black min-h-screen">
      <Hero />
      <About />
      <Features />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
