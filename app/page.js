'use client';
import { useState, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ *
 * Palette (matches innovation.expert / design-thinking-course)
 *   navy #004764 · blue #008cc1 (hover #00648C) · green #238251
 *   (hover #1a6b3a) · teal #0BB89B · light #F2F1F0
 * ------------------------------------------------------------------ */

const HERO_IMAGES = [
  { src: '/hero/hero-1.jpg', fr: 'Présentation « Démarrer avec Claude » lors d’un Burst', en: '"Getting started with Claude" session during a Burst' },
  { src: '/hero/hero-2.jpg', fr: 'Équipes au travail sur leurs postes pendant un Burst', en: 'Teams working at their stations during a Burst' },
  { src: '/hero/hero-3.jpg', fr: 'Atelier collaboratif autour d’une carte Lego', en: 'Collaborative Lego-map sprint workshop' },
  { src: '/hero/hero-4.jpg', fr: 'Salle en pleine collaboration pendant un Burst', en: 'Full room collaborating during a Burst' },
  { src: '/hero/hero-5.jpg', fr: 'Démonstration en direct devant l’équipe', en: 'Live demo in front of the team' },
];

/* ---- Bilingual copy ------------------------------------------------ */
const C = {
  fr: {
    nav: { burst: 'Le Burst', formules: 'Formules', pourQui: 'Pour qui', cta: 'Réserver un Burst' },
    hero: {
      eyebrow: 'Service IA · innovation.expert',
      title1: 'Vos équipes, prêtes à ',
      titleAccent: 'créer avec l’IA.',
      sub: "Le Burst est un atelier intensif où vos équipes apprennent à travailler avec l’IA sur vos vrais projets — et repartent avec une démo fonctionnelle, de nouvelles façons de collaborer et des compétences réutilisables.",
      ctaPrimary: 'Réserver un Burst →',
      ctaSecondary: 'Voir le déroulé ↓',
    },
    problem: {
      eyebrow: 'Le constat',
      title: "L’IA change tout — mais pas toute seule.",
      lead: "La plupart des organisations achètent des licences, font une démo… et rien ne change dans la façon dont les équipes travaillent vraiment. Les vrais gains se cachent dans vos projets : comprendre le code existant, extraire les règles d’affaires, bâtir des pratiques durables. Ce virage ne se prend pas dans un webinaire — il se prend en faisant, ensemble, sur votre propre travail.",
      cards: [
        { t: 'Des licences, pas de pratiques', d: "Tout le monde a accès à l’IA, mais les façons de travailler n’ont pas bougé." },
        { t: 'Le code legacy fait peur', d: "Les équipes hésitent à toucher au code existant qu’elles maîtrisent mal." },
        { t: 'Les preuves restent des preuves', d: "On teste, on s’émerveille, puis on retourne au quotidien comme avant." },
      ],
    },
    what: {
      eyebrow: 'Le Burst',
      title: 'Un format intensif pour apprendre en faisant.',
      lead: "Deux à deux jours et demi. De vraies équipes, de vrais projets de votre backlog, de vrais outils d’IA (Claude / Claude Code). Onboarding et formation, blocs de travail, débriefs et démos en direct. Pas un cours magistral — un sprint concret qui change la façon de travailler de vos équipes.",
      cards: [
        { t: 'Une démo fonctionnelle', d: "Une vraie fonctionnalité de votre backlog, qui tourne en live à la fin de l’atelier." },
        { t: 'De nouvelles façons de travailler', d: "Vos équipes collaborent autrement avec l’IA — pas seulement plus vite." },
        { t: 'Des compétences réutilisables', d: "Des « skills » et des méthodes que vos équipes réinvestissent dès le lendemain." },
      ],
    },
    deroule: {
      eyebrow: 'Le déroulé',
      title: 'Deux jours, cinq temps forts, une démo.',
      note: "Un rythme éprouvé : on met tout le monde à niveau, puis on livre.",
      steps: [
        { n: '01', t: 'Onboarding & accès', d: "On installe les outils, on valide les accès et on aligne les façons de travailler (Jour 0)." },
        { n: '02', t: 'Blocs de travail', d: "Les équipes attaquent un vrai projet du backlog, en autonomie encadrée." },
        { n: '03', t: 'Débriefs', d: "À chaque étape, on partage ce qui marche, les frictions et les patterns qui émergent." },
        { n: '04', t: 'Démos en direct', d: "Chaque équipe présente sa fonctionnalité fonctionnelle devant le groupe." },
        { n: '05', t: 'Apprentissages', d: "On récolte les acquis et on planifie comment les réinvestir dès la semaine suivante." },
      ],
    },
    formules: {
      eyebrow: 'Nos formules',
      title: 'Trois formats, une même ambition',
      sub: "Choisissez la formule qui correspond à votre rythme et à votre ambition.",
      priceNote: 'Prix indicatif — à confirmer',
      popular: 'Le plus populaire',
      items: [
        {
          key: 'A', name: 'Découverte (Onboarding)', tag: 'Mode formation', tagline: 'Une journée pour démystifier l’IA en équipe',
          price: '8 à 12 k$', priceUnit: 'par journée', s1: '1 jour', s1l: 'de formation', s2: '4 – 20', s2l: 'participants',
          bullets: ['Introduction pratique aux outils d’IA', 'Exercices sur des cas concrets', 'Idéal pour sensibiliser un large groupe', '20 % théorie · 80 % pratique', 'Livrable : premières démos + bases de prompting'],
          cta: 'Réserver l’atelier →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Burst', tag: 'Mode projet', tagline: '2,5 jours pour livrer sur vos vrais projets',
          price: '30 à 40 k$', priceUnit: 'pour l’événement complet', s1: '2,5 jours', s1l: 'onboarding + 2 jours', s2: '4 – 8', s2l: 'par équipe',
          bullets: ['Jour 0 d’onboarding et de formation', 'Équipes sur de vrais projets du backlog', 'Démos fonctionnelles en direct', 'Débriefs et partage d’apprentissages', 'Livrable : démos + skills réutilisables + nouvelles pratiques'],
          cta: 'Réserver un Burst →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Parcours', tag: 'Burst + ancrage', tagline: 'Le Burst + formations et suivis de projets',
          price: '50 à 65 k$', priceUnit: 'Burst + accompagnement', s1: 'Burst +', s1l: 'accompagnement', s2: 'sur mesure', s2l: 'plusieurs semaines',
          bullets: ['Tout ce qu’inclut le Burst', 'Formations additionnelles pour vos équipes', 'Suivis de projets après l’événement', 'Consolidation des skills et gouvernance', 'Livrable : capacité d’innovation ancrée + montée en charge'],
          cta: 'Démarrer le parcours →', accent: '#004764', accentHover: '#00648C', bg: '#f0f4f7', line: '#c0ccd6',
        },
      ],
    },
    proof: {
      eyebrow: 'La preuve',
      title: 'Éprouvé sur le terrain, chez Croesus.',
      lead: "Un premier Burst mené avec les équipes produit et développement de Croesus, fintech primée en gestion de patrimoine. Voici ce que les participants en ont retenu.",
      stats: [
        { big: '16', small: 'participants sondés' },
        { big: '4', small: 'équipes · 4 démos livrées' },
        { big: 'des heures\n→ minutes', small: 'pour comprendre le code legacy' },
        { big: 'Skills', small: 'l’acquis n°1 à réinvestir' },
      ],
      logosLabel: 'Ils ont vécu un Burst',
    },
    testimonial: {
      draftTag: 'Exemple — à valider avec Vincent',
      quote: "Le Burst a fait bouger nos équipes plus en deux jours que des mois de bonnes intentions. Voir nos développeurs livrer une démo fonctionnelle sur du vrai code — en collaborant avec l’IA plutôt qu’en la subissant — c’est exactement la transformation qu’on vise chez Croesus.",
      name: 'Vincent Levesque',
      role: 'Vice-Président, gestion de produit · Croesus',
    },
    pourQui: {
      eyebrow: 'Pour qui',
      title: 'Fait pour les équipes qui veulent changer leur façon de travailler',
      cards: [
        { t: 'Équipes de développement', d: "Qui veulent apprivoiser l’IA sur leur vrai code, pas sur des exemples jouets." },
        { t: 'Équipes produit & design', d: "Qui veulent prototyper et valider plus vite, de l’idée à la démo." },
        { t: 'Leaders & directions techniques', d: "Qui veulent ancrer une culture d’innovation et des pratiques durables." },
      ],
    },
    faq: {
      eyebrow: 'Questions fréquentes',
      title: 'Ce qu’on nous demande le plus',
      items: [
        { q: 'Est-ce que notre code reste confidentiel ?', a: "Oui. On travaille dans votre environnement, avec vos règles de sécurité. Rien ne sort de chez vous." },
        { q: 'Faut-il déjà savoir travailler avec l’IA ?', a: "Non. Le Jour 0 met tout le monde à niveau sur les outils, les accès et les façons de faire." },
        { q: 'Combien de participants ?', a: "De 4 à 20 selon la formule ; les équipes de travail comptent de 4 à 8 personnes." },
        { q: 'Sur quels projets travaille-t-on ?', a: "Sur de vrais items de votre backlog, choisis avec vous avant l’événement." },
        { q: 'En présentiel ou à distance ?', a: "Les deux sont possibles. Le présentiel maximise l’énergie et la collaboration." },
      ],
    },
    form: {
      title: 'Planifions votre Burst',
      sub: '5 questions · moins de 2 minutes',
      q1: '1. Qu’est-ce qui vous amène ici ?',
      q1opts: ['Découvrir l’IA en équipe', 'Livrer sur un vrai projet', 'Ancrer de nouvelles pratiques', 'Autre / pas encore sûr'],
      q2: '2. Quelle formule vous intéresse ?',
      q2opts: [['Découverte', '1 jour'], ['Burst', '2,5 jours'], ['Parcours', 'Burst + ancrage'], ['Pas encore sûr', '—']],
      q3: '3. Quel défi voulez-vous relever ?',
      q3ph: "Ex : moderniser du code legacy, accélérer notre équipe produit, créer une culture d’innovation…",
      q4: '4. Quand souhaitez-vous démarrer ?',
      q4opts: ['Le plus tôt possible', 'Dans 1 – 3 mois', 'Plus tard'],
      q5: '5. Comment vous joindre ?',
      emailPh: 'Votre adresse courriel',
      send: 'Envoyer →',
      thanksT: 'Merci !',
      thanksD: 'On vous revient rapidement pour planifier votre Burst.',
    },
    footer: { tagline: 'Le Burst — service IA · Tous droits réservés' },
  },

  en: {
    nav: { burst: 'The Burst', formules: 'Formats', pourQui: 'Who it’s for', cta: 'Book a Burst' },
    hero: {
      eyebrow: 'AI Service · innovation.expert',
      title1: 'Your teams, ready to ',
      titleAccent: 'build with AI.',
      sub: "A Burst is an intensive workshop where your teams learn to work with AI on your real projects — and leave with a working demo, new ways of collaborating, and reusable skills.",
      ctaPrimary: 'Book a Burst →',
      ctaSecondary: 'See how it works ↓',
    },
    problem: {
      eyebrow: 'The reality',
      title: 'AI changes everything — but not on its own.',
      lead: "Most organizations buy the licenses, run a demo… and nothing changes in how teams actually work. The real gains hide inside your projects: understanding existing code, extracting business rules, building durable practices. That shift doesn’t happen in a webinar — it happens by doing, together, on your own work.",
      cards: [
        { t: 'Licenses, not new practices', d: "Everyone has access to AI, but the way people work hasn’t budged." },
        { t: 'Legacy code is intimidating', d: "Teams hesitate to touch the existing code they barely understand." },
        { t: 'Proofs stay proofs', d: "You test it, you’re amazed, then you go back to business as usual." },
      ],
    },
    what: {
      eyebrow: 'The Burst',
      title: 'An intensive format for learning by doing.',
      lead: "Two to two-and-a-half days. Real teams, real backlog projects, real AI tools (Claude / Claude Code). Onboarding and training, work blocks, debriefs and live demos. Not a lecture — a hands-on sprint that changes how your teams work.",
      cards: [
        { t: 'A working demo', d: "A real feature from your backlog, running live by the end of the workshop." },
        { t: 'New ways of working', d: "Your teams collaborate differently with AI — not just faster." },
        { t: 'Reusable skills', d: "“Skills” and methods your teams reinvest the very next day." },
      ],
    },
    deroule: {
      eyebrow: 'How it works',
      title: 'Two days, five key moments, one demo.',
      note: "A proven rhythm: level everyone up, then ship.",
      steps: [
        { n: '01', t: 'Onboarding & access', d: "We install the tools, validate access and align on how to work (Day 0)." },
        { n: '02', t: 'Work blocks', d: "Teams tackle a real backlog project, with guided autonomy." },
        { n: '03', t: 'Debriefs', d: "At each step we share what works, the friction, and the patterns that emerge." },
        { n: '04', t: 'Live demos', d: "Each team presents its working feature in front of the group." },
        { n: '05', t: 'Learnings', d: "We capture the takeaways and plan how to reinvest them the following week." },
      ],
    },
    formules: {
      eyebrow: 'Our formats',
      title: 'Three formats, one ambition',
      sub: "Choose the format that matches your pace and your ambition.",
      priceNote: 'Indicative price — to be confirmed',
      popular: 'Most popular',
      items: [
        {
          key: 'A', name: 'Discovery (Onboarding)', tag: 'Training mode', tagline: 'One day to demystify AI as a team',
          price: '$8–12k', priceUnit: 'per day', s1: '1 day', s1l: 'of training', s2: '4 – 20', s2l: 'participants',
          bullets: ['Hands-on introduction to AI tools', 'Exercises on concrete cases', 'Ideal to sensitize a large group', '20% theory · 80% practice', 'Deliverable: first demos + prompting basics'],
          cta: 'Book the workshop →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Burst', tag: 'Project mode', tagline: '2.5 days to ship on your real projects',
          price: '$30–40k', priceUnit: 'for the full event', s1: '2.5 days', s1l: 'onboarding + 2 days', s2: '4 – 8', s2l: 'per team',
          bullets: ['Day 0 onboarding and training', 'Teams on real backlog projects', 'Live, working demos', 'Debriefs and shared learnings', 'Deliverable: demos + reusable skills + new practices'],
          cta: 'Book a Burst →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Journey', tag: 'Burst + embedding', tagline: 'The Burst + training and project follow-ups',
          price: '$50–65k', priceUnit: 'Burst + coaching', s1: 'Burst +', s1l: 'coaching', s2: 'tailored', s2l: 'over several weeks',
          bullets: ['Everything in the Burst', 'Additional training for your teams', 'Project follow-ups after the event', 'Skills consolidation and governance', 'Deliverable: embedded innovation capability + scale-up'],
          cta: 'Start the journey →', accent: '#004764', accentHover: '#00648C', bg: '#f0f4f7', line: '#c0ccd6',
        },
      ],
    },
    proof: {
      eyebrow: 'The proof',
      title: 'Proven in the field, at Croesus.',
      lead: "A first Burst run with the product and development teams at Croesus, an award-winning wealth-management fintech. Here’s what the participants took away.",
      stats: [
        { big: '16', small: 'participants surveyed' },
        { big: '4', small: 'teams · 4 demos shipped' },
        { big: 'hours\n→ minutes', small: 'to understand legacy code' },
        { big: 'Skills', small: 'the #1 takeaway to reinvest' },
      ],
      logosLabel: 'They’ve run a Burst',
    },
    testimonial: {
      draftTag: 'Draft — to approve with Vincent',
      quote: "The Burst moved our teams further in two days than months of good intentions. Watching our developers ship a working demo on real code — collaborating with AI instead of just watching it — is exactly the transformation we’re driving at Croesus.",
      name: 'Vincent Levesque',
      role: 'Vice-President, Product Management · Croesus',
    },
    pourQui: {
      eyebrow: 'Who it’s for',
      title: 'Built for teams who want to change how they work',
      cards: [
        { t: 'Development teams', d: "Who want to tame AI on their real code, not on toy examples." },
        { t: 'Product & design teams', d: "Who want to prototype and validate faster, from idea to demo." },
        { t: 'Leaders & tech leadership', d: "Who want to embed an innovation culture and durable practices." },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What we get asked most',
      items: [
        { q: 'Does our code stay confidential?', a: "Yes. We work in your environment, with your security rules. Nothing leaves your walls." },
        { q: 'Do we need to already know how to work with AI?', a: "No. Day 0 brings everyone up to speed on the tools, access and ways of working." },
        { q: 'How many participants?', a: "From 4 to 20 depending on the format; work teams are 4 to 8 people." },
        { q: 'What projects do we work on?', a: "On real items from your backlog, chosen with you before the event." },
        { q: 'In person or remote?', a: "Both are possible. In person maximizes energy and collaboration." },
      ],
    },
    form: {
      title: 'Let’s plan your Burst',
      sub: '5 questions · under 2 minutes',
      q1: '1. What brings you here?',
      q1opts: ['Discover AI as a team', 'Ship on a real project', 'Embed new practices', 'Other / not sure yet'],
      q2: '2. Which format interests you?',
      q2opts: [['Discovery', '1 day'], ['Burst', '2.5 days'], ['Journey', 'Burst + embedding'], ['Not sure yet', '—']],
      q3: '3. What challenge do you want to tackle?',
      q3ph: "e.g. modernize legacy code, accelerate our product team, build an innovation culture…",
      q4: '4. When would you like to start?',
      q4opts: ['As soon as possible', 'In 1 – 3 months', 'Later'],
      q5: '5. How can we reach you?',
      emailPh: 'Your email address',
      send: 'Send →',
      thanksT: 'Thank you!',
      thanksD: 'We’ll get back to you shortly to plan your Burst.',
    },
    footer: { tagline: 'The Burst — AI service · All rights reserved' },
  },
};

/* ==================================================================== */

export default function Home() {
  const [lang, setLang] = useState('fr');
  const t = C[lang];

  /* ---- Hero carousel ---- */
  const [slide, setSlide] = useState(0);
  const n = HERO_IMAGES.length;
  const go = useCallback((i) => setSlide((i + n) % n), [n]);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n]);

  /* ---- Form ---- */
  const [enjeu, setEnjeu] = useState(null);
  const [formule, setFormule] = useState(null);
  const [delai, setDelai] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    if (enjeu) data.set('enjeu', enjeu);
    if (formule) data.set('formule', formule);
    if (delai) data.set('delai', delai);
    data.set('langue', lang);
    const res = await fetch('https://formspree.io/f/xeeyelwy', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (res.ok) setSubmitted(true);
  }

  const btn = { onMouseOver: (e, c) => (e.currentTarget.style.backgroundColor = c) };

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#ffffff', color: '#004764' }}>

      {/* ---------------- Nav ---------------- */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-5 max-w-6xl mx-auto">
        <span className="font-bold text-base tracking-tight" style={{ color: '#004764' }}>
          innovation<span style={{ color: '#008cc1' }}>.</span>expert
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#burst" className="text-sm hidden sm:block" style={{ color: '#004764' }}>{t.nav.burst}</a>
          <a href="#formules" className="text-sm hidden sm:block" style={{ color: '#004764' }}>{t.nav.formules}</a>
          <a href="#pour-qui" className="text-sm hidden sm:block" style={{ color: '#004764' }}>{t.nav.pourQui}</a>

          {/* Language toggle */}
          <div className="flex items-center rounded-full overflow-hidden text-xs font-semibold" style={{ border: '1px solid #c8dde8' }}>
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-2.5 py-1 uppercase transition-colors"
                style={{ backgroundColor: lang === l ? '#008cc1' : 'transparent', color: lang === l ? '#fff' : '#00648C' }}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#inscription"
            className="text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: '#008cc1' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00648C')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#008cc1')}
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>

      {/* ---------------- Hero (carousel) ---------------- */}
      <section className="relative px-6 sm:px-8 pt-24 pb-32 overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img[lang]}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0 }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,71,100,0.82)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm font-medium mb-8" style={{ color: '#0BB89B' }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#0BB89B' }} />
            {t.hero.eyebrow}
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-7 text-white max-w-3xl">
            {t.hero.title1}
            <span style={{ color: '#0BB89B' }}>{t.hero.titleAccent}</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#inscription"
              className="text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors"
              style={{ backgroundColor: '#008cc1' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00648C')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#008cc1')}
            >
              {t.hero.ctaPrimary}
            </a>
            <a href="#deroule" className="text-sm underline underline-offset-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="relative max-w-5xl mx-auto mt-12 flex items-center gap-3">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`slide ${i + 1}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === slide ? 28 : 12,
                backgroundColor: i === slide ? '#0BB89B' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.problem.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#004764' }}>{t.problem.title}</h2>
          <p className="text-base leading-relaxed" style={{ color: '#00648C' }}>{t.problem.lead}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {t.problem.cards.map((c) => (
            <div key={c.t} className="p-7 rounded-2xl" style={{ backgroundColor: '#F2F1F0' }}>
              <h3 className="font-bold text-base mb-2" style={{ color: '#004764' }}>{c.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#00648C' }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- What is a Burst ---------------- */}
      <section id="burst" className="py-24" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.what.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#004764' }}>{t.what.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: '#00648C' }}>{t.what.lead}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {t.what.cards.map((c, i) => (
              <div key={c.t} className="p-8 rounded-2xl bg-white" style={{ border: '1px solid #e4e8ea' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white font-bold" style={{ backgroundColor: ['#008cc1', '#238251', '#0BB89B'][i] }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#004764' }}>{c.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#00648C' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Déroulé ---------------- */}
      <section id="deroule" className="max-w-5xl mx-auto px-6 sm:px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.deroule.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#004764' }}>{t.deroule.title}</h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#00648C' }}>{t.deroule.note}</p>
        </div>
        <img src="/img/room-wide.jpg" alt="Burst" className="w-full rounded-2xl object-cover mb-10" style={{ height: 300, objectPosition: 'center 55%' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.deroule.steps.map((s) => (
            <div key={s.n} className="rounded-2xl p-7 bg-white transition-all" style={{ border: '1px solid #e8e7e6' }}
              onMouseOver={(e) => (e.currentTarget.style.border = '1px solid #0BB89B')}
              onMouseOut={(e) => (e.currentTarget.style.border = '1px solid #e8e7e6')}>
              <span className="text-3xl font-bold" style={{ color: '#d4d2d0' }}>{s.n}</span>
              <h3 className="font-bold text-lg mt-3 mb-2" style={{ color: '#004764' }}>{s.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#00648C' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Formules ---------------- */}
      <section id="formules" className="py-24" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.formules.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#004764' }}>{t.formules.title}</h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#00648C' }}>{t.formules.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
            {t.formules.items.map((f) => (
              <div key={f.key} className="rounded-3xl overflow-hidden flex flex-col h-full bg-white"
                style={{ border: `2px solid ${f.accent}`, boxShadow: '0 12px 32px -22px rgba(0,71,100,0.35)' }}>
                <div className="px-6 pt-7 pb-5" style={{ backgroundColor: f.accent }}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 block">Formule {f.key} · {f.tag}</span>
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight min-h-[3.25rem]">{f.name}</h3>
                  <p className="text-white/80 text-xs min-h-[2.25rem]">{f.tagline}</p>
                </div>
                <div className="px-6 py-6 flex flex-col flex-1" style={{ backgroundColor: f.bg }}>
                  <div className="mb-5 pb-5" style={{ borderBottom: `1px solid ${f.line}` }}>
                    <div className="text-2xl font-bold" style={{ color: '#004764' }}>{f.price}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#00648C' }}>{f.priceUnit}</div>
                    <div className="text-[10px] mt-1 italic" style={{ color: '#9bb2bf' }}>{t.formules.priceNote}</div>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <div>
                      <div className="text-xl font-bold" style={{ color: '#004764' }}>{f.s1}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#00648C' }}>{f.s1l}</div>
                    </div>
                    <div style={{ borderLeft: `1px solid ${f.line}`, paddingLeft: '1rem' }}>
                      <div className="text-xl font-bold" style={{ color: '#004764' }}>{f.s2}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#00648C' }}>{f.s2l}</div>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs" style={{ color: '#004764' }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: f.accent }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#inscription" className="block text-center text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                    style={{ backgroundColor: f.accent }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = f.accentHover)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = f.accent)}>
                    {f.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.proof.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#004764' }}>{t.proof.title}</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#00648C' }}>{t.proof.lead}</p>
            <div className="grid grid-cols-2 gap-4">
              {t.proof.stats.map((s) => (
                <div key={s.small} className="p-5 rounded-2xl" style={{ backgroundColor: '#F2F1F0' }}>
                  <div className="text-2xl font-bold whitespace-pre-line leading-tight" style={{ color: '#008cc1' }}>{s.big}</div>
                  <div className="text-xs mt-1.5" style={{ color: '#00648C' }}>{s.small}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/img/pano.jpg" alt="Croesus Burst" className="w-full rounded-2xl object-cover mb-4" style={{ height: 200, objectPosition: 'center' }} />
            <img src="/img/whiteboard.jpg" alt="Impact de l'IA" className="w-full rounded-2xl object-cover" style={{ height: 200, objectPosition: 'center 40%' }} />
          </div>
        </div>

        {/* Testimonial — DRAFT quote, pending Vincent Levesque's approval. See note to user. */}
        <div className="mt-16 rounded-3xl px-8 sm:px-14 py-12 text-center relative" style={{ backgroundColor: '#004764' }}>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6" style={{ backgroundColor: 'rgba(11,184,155,0.18)', color: '#0BB89B', border: '1px dashed #0BB89B' }}>
            {t.testimonial.draftTag}
          </span>
          <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 max-w-3xl mx-auto text-white">
            « {t.testimonial.quote} »
          </p>
          <div className="flex items-center justify-center gap-3">
            <img src="/img/vincent.jpg" alt="Vincent Levesque" className="w-12 h-12 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-semibold text-sm text-white">{t.testimonial.name}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{t.testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Pour qui ---------------- */}
      <section id="pour-qui" className="py-24" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.pourQui.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#004764' }}>{t.pourQui.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.pourQui.cards.map((c) => (
              <div key={c.t} className="p-8 rounded-2xl bg-white" style={{ border: '1px solid #e4e8ea' }}>
                <h3 className="font-bold text-lg mb-3" style={{ color: '#004764' }}>{c.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#00648C' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-24">
        <div className="mb-10">
          <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.faq.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#004764' }}>{t.faq.title}</h2>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group rounded-2xl p-5" style={{ backgroundColor: '#F2F1F0' }}>
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-base list-none" style={{ color: '#004764' }}>
                {f.q}
                <span className="ml-4 transition-transform group-open:rotate-45 text-xl" style={{ color: '#008cc1' }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#00648C' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- CTA form ---------------- */}
      <section id="inscription" className="text-white py-16" style={{ backgroundColor: '#004764' }}>
        <div className="max-w-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t.form.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>{t.form.sub}</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <p className="text-2xl font-bold mb-3">{t.form.thanksT}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t.form.thanksD}</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Q1 */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q1}</p>
                <div className="grid grid-cols-2 gap-2">
                  {t.form.q1opts.map((o) => (
                    <button key={o} type="button" onClick={() => setEnjeu(o)}
                      className="text-center text-xs font-medium px-3 py-2.5 rounded-xl border transition-all leading-snug"
                      style={{ backgroundColor: enjeu === o ? '#008cc1' : 'rgba(255,255,255,0.08)', border: enjeu === o ? '1px solid #008cc1' : '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q2 */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q2}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {t.form.q2opts.map(([label, sub]) => (
                    <button key={label} type="button" onClick={() => setFormule(label)}
                      className="text-center text-xs font-medium px-2 py-2.5 rounded-xl border transition-all leading-snug"
                      style={{ backgroundColor: formule === label ? '#008cc1' : 'rgba(255,255,255,0.08)', border: formule === label ? '1px solid #008cc1' : '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                      <span className="font-bold">{label}</span><br />{sub}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q3 */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q3}</p>
                <textarea rows={2} name="defi" placeholder={t.form.q3ph}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
              </div>
              {/* Q4 */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q4}</p>
                <div className="flex gap-2">
                  {t.form.q4opts.map((o) => (
                    <button key={o} type="button" onClick={() => setDelai(o)}
                      className="flex-1 text-xs font-medium px-3 py-2.5 rounded-xl border transition-all"
                      style={{ backgroundColor: delai === o ? '#008cc1' : 'rgba(255,255,255,0.08)', border: delai === o ? '1px solid #008cc1' : '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q5 */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q5}</p>
                <div className="flex gap-2">
                  <input type="email" name="email" required placeholder={t.form.emailPh}
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
                  <button type="submit" className="text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors flex-shrink-0"
                    style={{ backgroundColor: '#238251' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1a6b3a')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#238251')}>
                    {t.form.send}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="py-8 px-6 sm:px-8 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm" style={{ borderTop: '1px solid #e8e7e6', color: '#00648C' }}>
        <span>© {new Date().getFullYear()} innovation.expert</span>
        <span>{t.footer.tagline}</span>
      </footer>

    </main>
  );
}
