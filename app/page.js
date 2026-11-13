'use client';
import { useState, useEffect, useCallback, Fragment } from 'react';

/* ------------------------------------------------------------------ *
 * Palette (matches innovation.expert / design-thinking-course)
 *   navy #004764 · blue #008cc1 (hover #00648C) · green #238251
 *   (hover #1a6b3a) · teal #0BB89B · light #F2F1F0
 * ------------------------------------------------------------------ */

/* blur: px of blur on top of the navy overlay, so faces stay unrecognizable.
   Close-ups get more. */
const HERO_IMAGES = [
  { src: '/hero/hero-1.jpg', blur: 7, fr: 'Présentation pendant un Burst', en: 'Presentation during a Burst' },
  { src: '/hero/hero-2.jpg', blur: 4, fr: 'Équipes au travail sur leurs postes pendant un Burst', en: 'Teams working at their stations during a Burst' },
  { src: '/hero/hero-3.jpg', blur: 7, fr: 'Atelier collaboratif autour d’une carte Lego', en: 'Collaborative Lego-map sprint workshop' },
  { src: '/hero/hero-4.jpg', blur: 4, fr: 'Salle en pleine collaboration pendant un Burst', en: 'Full room collaborating during a Burst' },
  { src: '/hero/hero-5.jpg', blur: 4, fr: 'Démonstration en direct devant l’équipe', en: 'Live demo in front of the team' },
];

/* ---- Bilingual copy ------------------------------------------------ *
 * In titles and short labels, "|" marks the boundary between phrase
 * groups: lines break there, never in the middle of a group (see Phrases).
 * "~" marks a weaker boundary inside a group, used only when the group
 * itself is wider than the line.
 * ------------------------------------------------------------------ */
const COPY = {
  fr: {
    nav: { burst: 'Le Burst', pourQui: 'Pour qui', formules: 'Formules', cta: 'Réserver un Burst' },
    hero: {
      eyebrow: 'Service IA · innovation.expert',
      title1: 'Vos équipes,',
      title2: 'prêtes à',
      titleAccent: 'créer avec l’IA.',
      sub: "Le Burst fait passer vos équipes de curieuses à adeptes de l’IA. Plus qu’une formation, plus qu’une démo : elles appliquent l’IA à leurs vrais projets et changent pour de bon leur façon de travailler. Après un Burst, aucun participant n’est revenu en arrière.",
      ctaPrimary: 'Réserver un Burst →',
      ctaSecondary: 'Voir le déroulé ↓',
    },
    problem: {
      eyebrow: 'Le constat',
      title: 'L’IA change tout —|mais pas toute seule.',
      lead: "La plupart des organisations achètent des licences, font une démo… et rien ne change dans la façon dont les équipes travaillent vraiment. Les vrais gains se cachent dans vos projets : comprendre et faire évoluer ce qui existe déjà, clarifier vos façons de faire, bâtir des pratiques durables. Ce virage ne se prend pas dans un webinaire — il se prend en faisant, ensemble, sur votre propre travail.",
      cards: [
        { t: 'Des licences,|pas encore de pratiques', d: "Les outils sont disponibles, mais les façons de travailler restent les mêmes." },
        { t: 'Faire évoluer ses méthodes|est exigeant', d: "Revoir des façons de faire éprouvées demande du temps, l’appui d’experts et un cadre sûr pour expérimenter." },
        { t: 'Les essais|restent des essais', d: "Les démonstrations impressionnent, puis le quotidien reprend le dessus." },
      ],
      bridge: "Le Burst crée ce passage : un cadre intensif et structuré où les équipes intègrent l’IA à leur propre travail, sur de vrais défis, avec un résultat concret à présenter.",
      not: {
        heading: 'Ce que le Burst n’est pas',
        items: [
          { t: 'Une formation générique', d: "Le contenu porte sur vos outils, vos processus et vos défis." },
          { t: 'Une démonstration', d: "Les participants font le travail, les experts les guident." },
          { t: 'Un mandat clé en main', d: "Vos équipes repartent capables de poursuivre seules." },
        ],
      },
    },
    what: {
      eyebrow: 'Le Burst',
      title: 'Un format intensif|pour apprendre~en faisant.',
      lead: "Deux à deux jours et demi. De vraies équipes, de vrais projets, vos outils d’IA. Pas un cours magistral — un sprint concret qui change la façon de travailler de vos équipes.",
      modesIntro: 'Trois modes d’apprentissage combinés, dans le bon ordre',
      cards: [
        { t: 'Apprentissage', d: "On te montre les choses : les outils, les méthodes et les bonnes pratiques." },
        { t: 'Pratique', d: "Tu réalises un défi concret sur un vrai projet, pas un exemple jouet." },
        { t: 'Échange', d: "Tu échanges avec les pairs sur leurs apprentissages et leurs problématiques." },
      ],
      roles: {
        heading: 'La formule magique :|deux rôles complémentaires',
        sub: "C’est cette combinaison qui fait vraiment fonctionner le format.",
        items: [
          { icon: 'users', t: 'Un animateur', d: "Organise les équipes, les stimule et les fait progresser tout au long du Burst." },
          { icon: 'sparkles', t: 'Un spécialiste', d: "Accompagne, débloque et forme les gens en direct, au moment où ça compte." },
        ],
      },
      levels: {
        heading: 'Débutants~et utilisateurs avancés,|dans la même salle',
        d: "Le Burst fonctionne aussi bien avec des gens qui débutent qu’avec des utilisateurs avancés. La mise à niveau amène chacun au même point. Les plus avancés proposent des défis, servent de référence dans leur sous-équipe et partagent leurs façons de faire. Tout le monde y trouve son compte.",
      },
    },
    pourQui: {
      eyebrow: 'Pour qui',
      title: 'Pour les équipes~qui veulent|maximiser~leur performance~avec l’IA',
      cards: [
        { t: 'Équipes exécutives|et de direction', d: "Qui veulent piloter la transformation IA de l’intérieur et décider sur la base de résultats concrets, pas de démos." },
        { t: 'Équipes d’innovation', d: "Qui veulent passer de l’expérimentation à des livrables concrets et outiller le reste de l’organisation." },
        { t: 'Équipes opérationnelles', d: "Qui veulent accélérer leur livraison et faire évoluer leurs façons de faire, leurs produits et leurs services grâce à l’IA." },
        { t: 'Tous vos employés', d: "Qui veulent intégrer l’IA à leur travail quotidien, quel que soit leur poste ou leur niveau." },
      ],
      examples: {
        heading: 'Une même formule,|des défis propres~à chaque fonction',
        items: [
          { t: 'Direction', d: "Préparer les rencontres et en tirer décisions, actions et suivis." },
          { t: 'Ventes', d: "Préparer plus vite propositions, suivis et réponses aux clients." },
          { t: 'Opérations', d: "Documenter les processus et simplifier les tâches répétitives." },
          { t: 'Finances et RH', d: "Produire rapports, analyses et communications à partir de l’existant." },
        ],
      },
    },
    deroule: {
      eyebrow: 'Le déroulé',
      title: 'Deux jours,|cinq temps forts,|une démo.',
      note: "Un rythme éprouvé : on met tout le monde à niveau, puis on livre.",
      steps: [
        { n: '01', t: 'Onboarding & accès', d: "On installe les outils, on valide les accès et on aligne les façons de travailler (Jour 0)." },
        { n: '02', t: 'Blocs de travail', d: "Les équipes attaquent un vrai projet, en autonomie encadrée." },
        { n: '03', t: 'Débriefs', d: "À chaque étape, on partage ce qui marche, les frictions et les patterns qui émergent." },
        { n: '04', t: 'Démos en direct', d: "Chaque équipe présente sa démo fonctionnelle devant le groupe." },
        { n: '05', t: 'Apprentissages', d: "On récolte les acquis et on planifie comment les réinvestir dès la semaine suivante." },
      ],
    },
    formules: {
      eyebrow: 'Nos formules',
      title: 'Des formats|pour chaque ambition',
      sub: "Choisissez la formule qui correspond à votre rythme et à votre ambition.",
      label: 'Formule',
      items: [
        {
          key: 'A', name: 'Intensif', tag: 'Mode immersion', tagline: 'Apprendre, pratiquer et échanger|pour adopter l’IA',
          s1: '0,5 – 1 j', s1l: 'en immersion', s2: '4 – 20', s2l: 'participants',
          bullets: ['Apprentissage guidé des outils et des bonnes pratiques', 'Un défi concret à réaliser en équipe — pas juste de la théorie', 'Échanges entre pairs sur les apprentissages et les blocages', 'Animateur + spécialiste pour vous faire progresser', 'Livrable : premières démos + réflexes d’usage au quotidien'],
          cta: 'Choisir cette formule →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Actif', tag: 'Mode projet', tagline: '2,5 jours pour livrer|sur vos projets',
          s1: '2,5 jours', s1l: 'onboarding + 2 jours', s2: '3 – 6', s2l: 'équipes',
          bullets: ['Jour 0 d’onboarding et de formation', 'Équipes sur de vrais projets, pas des exemples jouets', 'Démos fonctionnelles en direct', 'Animateur + spécialiste tout au long', 'Livrable : démos + skills réutilisables + nouvelles pratiques'],
          cta: 'Choisir cette formule →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Itératif', tag: 'Tout inclus', tagline: 'Plusieurs Bursts + formation|+ accompagnement',
          s1: 'Sur mesure', s1l: 'durée adaptée', s2: 'illimité', s2l: 'participants / équipes',
          bullets: ['Plusieurs Bursts, avec plusieurs équipes', 'Onboarding et formation des équipes', 'Accompagnement et suivis de projets', 'Participants et équipes illimités', 'Livrable : capacité d’innovation ancrée + montée en charge'],
          cta: 'Choisir cette formule →', accent: '#004764', accentHover: '#00648C', bg: '#f0f4f7', line: '#c0ccd6',
        },
        {
          key: 'D', name: 'Sur mesure', tag: 'Selon vos besoins', tagline: 'Parce qu’il n’y a pas|que des recettes fixes',
          s1: 'Adapté', s1l: 'à vos modèles / outils', s2: 'Vos', s2l: 'objectifs d’affaires',
          bullets: ['Formation adaptée aux modèles et outils que vous utilisez', 'Conçue autour de vos objectifs d’affaires', 'Combine librement les formats précédents', 'On bâtit le format avec vous'],
          cta: 'En discuter →', accent: '#5b7280', accentHover: '#455563', bg: '#f6f8f9', line: '#d5dee3',
        },
      ],
    },
    proof: {
      eyebrow: 'La preuve',
      title: 'Éprouvé sur le terrain.|L’exemple Croesus.',
      lead: "Plus de cinq Bursts menés avec différentes équipes de Croesus, fintech primée en gestion de patrimoine.",
      stats: [
        { big: '5+', small: 'Bursts avec différentes équipes' },
        { big: '20', small: 'équipes de 3 à 5 personnes ont livré une démo fonctionnelle dès leur premier Burst' },
        { big: 'Des heures|→ minutes', small: 'pour comprendre et faire évoluer des systèmes existants' },
        { big: 'Skills', small: 'l’acquis n°1 à réinvestir' },
      ],
    },
    testimonial: {
      quote: "Le Burst a fait bouger nos équipes plus en deux jours que des mois de bonnes intentions. Voir nos développeurs livrer une démo fonctionnelle en collaborant avec l’IA accélère grandement la transformation que nous visons chez Croesus. Ce fut aussi un formidable moment de mobilisation pour faire avancer de grandes priorités propres à l’organisation.",
      name: 'Vincent Lévesque',
      role: 'Vice-président, chef des produits · Croesus',
    },
    faq: {
      eyebrow: 'Questions fréquentes',
      title: 'Ce qu’on~nous demande le plus',
      items: [
        { q: 'Est-ce que notre travail reste confidentiel ?', a: "Oui. On travaille dans votre environnement, avec vos règles de sécurité. Rien ne sort de chez vous." },
        { q: 'Faut-il déjà savoir travailler avec l’IA ?', a: "Non. La mise à niveau amène chacun au même point, quel que soit son niveau. Les utilisateurs déjà avancés y trouvent aussi leur compte : ils servent de relais dans leur sous-équipe et repartent avec de nouvelles pratiques." },
        { q: 'Combien de participants ?', a: "De 4 à 20 selon la formule ; les équipes de travail comptent de 4 à 8 personnes." },
        { q: 'Sur quels projets travaille-t-on ?', a: "Sur de vrais items de votre backlog, choisis avec vous avant l’événement." },
        { q: 'En présentiel ou à distance ?', a: "Les deux sont possibles. Le présentiel maximise l’énergie et la collaboration." },
      ],
    },
    form: {
      title: 'Planifions|votre Burst',
      sub: '6 questions · moins de 2 minutes',
      q1: '1. Qu’est-ce qui vous amène ici ?',
      q1opts: ['Découvrir l’IA en équipe', 'Livrer sur un vrai projet', 'Ancrer de nouvelles pratiques', 'Autre / pas encore sûr'],
      q2: '2. Quelle formule vous intéresse ?',
      q2opts: [['Intensif', '0,5 – 1 j'], ['Actif', '2,5 j'], ['Itératif', 'tout inclus'], ['Sur mesure', 'selon vos besoins'], ['Pas encore sûr', '—']],
      qTools: '3. Quels outils IA utilisez-vous ou vous intéressent ?',
      qToolsHint: 'plusieurs choix possibles',
      toolsOpts: [['Copilot', 'Microsoft'], ['ChatGPT', 'OpenAI'], ['Gemini', 'Google'], ['Claude', 'Anthropic'], ['Autre', '—']],
      q3: '4. Quel défi voulez-vous relever ?',
      q3ph: "Ex : accélérer notre équipe produit, faire évoluer un système existant, créer une culture d’innovation…",
      q4: '5. Quand souhaitez-vous démarrer ?',
      q4opts: ['Le plus tôt possible', 'Dans 1 – 3 mois', 'Plus tard'],
      q5: '6. Comment vous joindre ?',
      emailPh: 'Votre adresse courriel',
      send: 'Envoyer →',
      thanksT: 'Merci !',
      thanksD: 'On vous revient rapidement pour planifier votre Burst.',
    },
    footer: { tagline: 'Le Burst — service IA ·|Tous droits réservés' },
  },

  en: {
    nav: { burst: 'The Burst', pourQui: 'Who it’s for', formules: 'Formats', cta: 'Book a Burst' },
    hero: {
      eyebrow: 'AI Service · innovation.expert',
      title1: 'Your teams,',
      title2: 'ready to',
      titleAccent: 'build with AI.',
      sub: "The Burst takes your teams from AI-curious to AI adopters. More than training, more than a demo: they apply AI to their real projects and change the way they work for good. After a Burst, not a single participant has gone back.",
      ctaPrimary: 'Book a Burst →',
      ctaSecondary: 'See how it works ↓',
    },
    problem: {
      eyebrow: 'The reality',
      title: 'AI changes~everything —|but not on its own.',
      lead: "Most organizations buy the licenses, run a demo… and nothing changes in how teams actually work. The real gains hide inside your projects: understanding and evolving what already exists, clarifying your ways of working, building durable practices. That shift doesn’t happen in a webinar — it happens by doing, together, on your own work.",
      cards: [
        { t: 'Licenses,|not yet practices', d: "The tools are there, but the ways of working stay the same." },
        { t: 'Evolving your methods|is demanding', d: "Rethinking proven ways of working takes time, expert support and a safe space to experiment." },
        { t: 'Trials|stay trials', d: "Demos impress, then day-to-day work takes over again." },
      ],
      bridge: "The Burst bridges that gap: an intensive, structured setting where teams build AI into their own work, on real challenges, with a concrete result to present.",
      not: {
        heading: 'What the Burst isn’t',
        items: [
          { t: 'Generic training', d: "The content is about your tools, your processes and your challenges." },
          { t: 'A demo', d: "Participants do the work; the experts guide them." },
          { t: 'A turnkey mandate', d: "Your teams leave able to keep going on their own." },
        ],
      },
    },
    what: {
      eyebrow: 'The Burst',
      title: 'An intensive format|for learning by doing.',
      lead: "Two to two-and-a-half days. Real teams, real projects, your AI tools. Not a lecture — a hands-on sprint that changes how your teams work.",
      modesIntro: 'Three learning modes combined, in the right order',
      cards: [
        { t: 'Learn', d: "We show you the tools, the methods and the best practices." },
        { t: 'Practice', d: "You tackle a concrete challenge on a real project, not a toy example." },
        { t: 'Exchange', d: "You exchange with peers on their learnings and their challenges." },
      ],
      roles: {
        heading: 'The magic formula:|two complementary roles',
        sub: "It’s that combination that truly makes the format work.",
        items: [
          { icon: 'users', t: 'A facilitator', d: "Organizes the teams, energizes them and drives their progress throughout the Burst." },
          { icon: 'sparkles', t: 'A specialist', d: "Coaches, unblocks and trains people live, right when it matters." },
        ],
      },
      levels: {
        heading: 'Beginners~and advanced users,|in the same room',
        d: "The Burst works just as well with people who are starting out as with advanced users. The onboarding brings everyone to the same starting point. The most advanced propose challenges, act as go-to people in their sub-team and share how they work. Everyone gets something out of it.",
      },
    },
    pourQui: {
      eyebrow: 'Who it’s for',
      title: 'For teams~that want|to maximize~their performance~with AI',
      cards: [
        { t: 'Executive|& leadership teams', d: "Who want to steer the AI transformation from the inside and decide on real results, not demos." },
        { t: 'Innovation teams', d: "Who want to move from experimentation to concrete deliverables and equip the rest of the organization." },
        { t: 'Operational teams', d: "Who want to accelerate delivery and evolve their ways of working, products and services with AI." },
        { t: 'All your employees', d: "Who want to build AI into their daily work, whatever their role or level." },
      ],
      examples: {
        heading: 'One format,|challenges specific~to each function',
        items: [
          { t: 'Leadership', d: "Prepare meetings and turn them into decisions, actions and follow-ups." },
          { t: 'Sales', d: "Prepare proposals, follow-ups and client replies faster." },
          { t: 'Operations', d: "Document processes and simplify repetitive tasks." },
          { t: 'Finance and HR', d: "Produce reports, analyses and communications from what already exists." },
        ],
      },
    },
    deroule: {
      eyebrow: 'How it works',
      title: 'Two days,|five key moments,|one demo.',
      note: "A proven rhythm: level everyone up, then ship.",
      steps: [
        { n: '01', t: 'Onboarding & access', d: "We install the tools, validate access and align on how to work (Day 0)." },
        { n: '02', t: 'Work blocks', d: "Teams tackle a real project, with guided autonomy." },
        { n: '03', t: 'Debriefs', d: "At each step we share what works, the friction, and the patterns that emerge." },
        { n: '04', t: 'Live demos', d: "Each team presents its working demo in front of the group." },
        { n: '05', t: 'Learnings', d: "We capture the takeaways and plan how to reinvest them the following week." },
      ],
    },
    formules: {
      eyebrow: 'Our formats',
      title: 'Formats|for every ambition',
      sub: "Choose the format that matches your pace and your ambition.",
      label: 'Format',
      items: [
        {
          key: 'A', name: 'Intensive', tag: 'Immersion mode', tagline: 'Learn, practise and exchange|to adopt AI',
          s1: '0.5 – 1 d', s1l: 'immersive', s2: '4 – 20', s2l: 'participants',
          bullets: ['Guided learning of the tools and best practices', 'A concrete challenge to tackle as a team — not just theory', 'Peer exchange on learnings and blockers', 'Facilitator + specialist to drive your progress', 'Deliverable: first demos + everyday usage reflexes'],
          cta: 'Choose this format →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Active', tag: 'Project mode', tagline: '2.5 days to ship|on your projects',
          s1: '2.5 days', s1l: 'onboarding + 2 days', s2: '3 – 6', s2l: 'teams',
          bullets: ['Day 0 onboarding and training', 'Teams on real projects, not toy examples', 'Live, working demos', 'Facilitator + specialist throughout', 'Deliverable: demos + reusable skills + new practices'],
          cta: 'Choose this format →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Iterative', tag: 'All-in', tagline: 'Several Bursts + training|+ coaching',
          s1: 'Custom', s1l: 'adapted duration', s2: 'unlimited', s2l: 'participants / teams',
          bullets: ['Several Bursts, with several teams', 'Team onboarding and training', 'Coaching and project follow-ups', 'Unlimited participants and teams', 'Deliverable: embedded innovation capability + scale-up'],
          cta: 'Choose this format →', accent: '#004764', accentHover: '#00648C', bg: '#f0f4f7', line: '#c0ccd6',
        },
        {
          key: 'D', name: 'Custom', tag: 'Based on your needs', tagline: 'Because it’s not only|about fixed recipes',
          s1: 'Adapted', s1l: 'to your models / tools', s2: 'Your', s2l: 'business goals',
          bullets: ['Training adapted to the models and tools you use', 'Designed around your business goals', 'Freely combines the formats above', 'We build the format with you'],
          cta: 'Let’s talk →', accent: '#5b7280', accentHover: '#455563', bg: '#f6f8f9', line: '#d5dee3',
        },
      ],
    },
    proof: {
      eyebrow: 'The proof',
      title: 'Proven in the field.|The Croesus example.',
      lead: "More than five Bursts run with different teams at Croesus, an award-winning wealth-management fintech.",
      stats: [
        { big: '5+', small: 'Bursts with different teams' },
        { big: '20', small: 'teams of 3 to 5 people shipped a working demo in their very first Burst' },
        { big: 'Hours|→ minutes', small: 'to understand and evolve existing systems' },
        { big: 'Skills', small: 'the #1 takeaway to reinvest' },
      ],
    },
    testimonial: {
      quote: "The Burst moved our teams further in two days than months of good intentions. Watching our developers ship a working demo while collaborating with AI greatly accelerates the transformation we are pursuing at Croesus. It was also a tremendous moment of mobilization to move forward major priorities specific to our organization.",
      name: 'Vincent Lévesque',
      role: 'Vice-President, Head of Products · Croesus',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What we get|asked most',
      items: [
        { q: 'Does our work stay confidential?', a: "Yes. We work in your environment, with your security rules. Nothing leaves your walls." },
        { q: 'Do we need to already know how to work with AI?', a: "No. The onboarding brings everyone to the same starting point, whatever their level. Advanced users get something out of it too: they act as go-to people in their sub-team and leave with new practices." },
        { q: 'How many participants?', a: "From 4 to 20 depending on the format; work teams are 4 to 8 people." },
        { q: 'What projects do we work on?', a: "On real items from your backlog, chosen with you before the event." },
        { q: 'In person or remote?', a: "Both are possible. In person maximizes energy and collaboration." },
      ],
    },
    form: {
      title: 'Let’s plan|your Burst',
      sub: '6 questions · under 2 minutes',
      q1: '1. What brings you here?',
      q1opts: ['Discover AI as a team', 'Ship on a real project', 'Embed new practices', 'Other / not sure yet'],
      q2: '2. Which format interests you?',
      q2opts: [['Intensive', '0.5 – 1 d'], ['Active', '2.5 d'], ['Iterative', 'all-in'], ['Custom', 'based on your needs'], ['Not sure yet', '—']],
      qTools: '3. Which AI tools do you use or want to use?',
      qToolsHint: 'select all that apply',
      toolsOpts: [['Copilot', 'Microsoft'], ['ChatGPT', 'OpenAI'], ['Gemini', 'Google'], ['Claude', 'Anthropic'], ['Other', '—']],
      q3: '4. What challenge do you want to tackle?',
      q3ph: "e.g. accelerate our product team, evolve an existing system, build an innovation culture…",
      q4: '5. When would you like to start?',
      q4opts: ['As soon as possible', 'In 1 – 3 months', 'Later'],
      q5: '6. How can we reach you?',
      emailPh: 'Your email address',
      send: 'Send →',
      thanksT: 'Thank you!',
      thanksD: 'We’ll get back to you shortly to plan your Burst.',
    },
    footer: { tagline: 'The Burst — AI service ·|All rights reserved' },
  },
};

/* ---- Typography ---------------------------------------------------- *
 * Non-breaking spaces so a line never strands a number away from its unit
 * (« 2,5 jours », « 4 – 20 ») or, in French, a ? ! ; : » at the start of
 * a line.
 * ------------------------------------------------------------------ */
const NBSP = ' ';
const NNBSP = ' ';

function fixSpaces(str, lang) {
  let s = str
    .replace(/(\d) (?=\S)/g, `$1${NBSP}`)
    .replace(/([–—]) (?=\d)/g, `$1${NBSP}`);
  if (lang === 'fr') {
    s = s
      .replace(/ ([?!;»])/g, `${NNBSP}$1`)
      .replace(/ :/g, `${NBSP}:`)
      .replace(/« /g, `«${NBSP}`);
  }
  return s;
}

function typo(value, lang) {
  if (typeof value === 'string') return fixSpaces(value, lang);
  if (Array.isArray(value)) return value.map((v) => typo(v, lang));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typo(v, lang)]));
  }
  return value;
}

const C = { fr: typo(COPY.fr, 'fr'), en: typo(COPY.en, 'en') };

/* Keeps the last two words of a paragraph together, so no word sits alone on the last line. */
const noOrphan = (str) => str.replace(/ (\S+)$/, `${NBSP}$1`);

/* ---- Small building blocks ---------------------------------------- */

/* Renders copy split on "|" into phrase groups. Each group is an
   inline-block, so a line breaks between groups — never mid-group unless a
   group alone is wider than the line. Then it breaks at its "~" sub-groups
   first, and only then between words, balanced. */
function Groups({ text, separator, className }) {
  const parts = text.split(separator);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className={className}>
        {separator === '|' && part.includes('~')
          ? <Groups text={part} separator="~" className="inline-block" />
          : part}
      </span>
    </Fragment>
  ));
}

function Phrases({ text }) {
  return <Groups text={text} separator="|" className="inline-block text-balance" />;
}

/* Line icons for the people and roles (paths from the Lucide set, ISC). */
const ICON_PATHS = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </>
  ),
};

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

const H2 = 'text-[1.625rem]/[1.2] sm:text-4xl font-bold';

/* ==================================================================== */

export default function Home() {
  const [lang, setLang] = useState('fr');
  const t = C[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
  const [outils, setOutils] = useState([]);
  const [delai, setDelai] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleOutil = (o) =>
    setOutils((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    if (enjeu) data.set('enjeu', enjeu);
    if (formule) data.set('formule', formule);
    if (outils.length) data.set('outils', outils.join(', '));
    if (delai) data.set('delai', delai);
    data.set('langue', lang);
    const res = await fetch('https://formspree.io/f/xeeyelwy', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (res.ok) setSubmitted(true);
  }

  const chipStyle = (active) => ({
    backgroundColor: active ? '#008cc1' : 'rgba(255,255,255,0.08)',
    border: active ? '1px solid #008cc1' : '1px solid rgba(255,255,255,0.2)',
    color: 'white',
  });

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: '#ffffff', color: '#004764' }}>

      {/* ---------------- Nav ---------------- */}
      <nav className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 max-w-6xl mx-auto">
        <span className="font-bold text-base tracking-tight whitespace-nowrap" style={{ color: '#004764' }}>
          innovation<span style={{ color: '#008cc1' }}>.</span>expert
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#burst" className="text-sm hidden md:block" style={{ color: '#004764' }}>{t.nav.burst}</a>
          <a href="#pour-qui" className="text-sm hidden md:block" style={{ color: '#004764' }}>{t.nav.pourQui}</a>
          <a href="#formules" className="text-sm hidden md:block" style={{ color: '#004764' }}>{t.nav.formules}</a>

          {/* Language toggle */}
          <div className="flex items-center rounded-full overflow-hidden text-xs font-semibold" style={{ border: '1px solid #c8dde8' }}>
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className="px-2.5 py-1 uppercase transition-colors"
                style={{ backgroundColor: lang === l ? '#008cc1' : 'transparent', color: lang === l ? '#fff' : '#00648C' }}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#inscription"
            className="hidden sm:inline-block whitespace-nowrap text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors bg-[#008cc1] hover:bg-[#00648C]"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>

      {/* ---------------- Hero (carousel) ---------------- */}
      <section className="relative px-6 sm:px-8 pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-hidden">
        {/* Slides */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img[lang]}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === slide ? 1 : 0, filter: `blur(${img.blur}px)`, transform: 'scale(1.08)' }}
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
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-7 text-white max-w-3xl">
            <span className="inline-block">{t.hero.title1}</span>{' '}
            <span className="inline-block">
              <span className="inline-block">{t.hero.title2}</span>{' '}
              <span className="inline-block" style={{ color: '#0BB89B' }}>{t.hero.titleAccent}</span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 text-pretty" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#inscription"
              className="inline-block whitespace-nowrap text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors bg-[#008cc1] hover:bg-[#00648C]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a href="#deroule" className="whitespace-nowrap text-sm underline underline-offset-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
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
          <h2 className={`${H2} mb-5`} style={{ color: '#004764' }}><Phrases text={t.problem.title} /></h2>
          <p className="text-base leading-relaxed text-pretty" style={{ color: '#00648C' }}>{t.problem.lead}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {t.problem.cards.map((c) => (
            <div key={c.t} className="p-7 rounded-2xl" style={{ backgroundColor: '#F2F1F0' }}>
              <h3 className="font-bold text-base mb-2" style={{ color: '#004764' }}><Phrases text={c.t} /></h3>
              <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-base sm:text-lg font-semibold leading-relaxed max-w-3xl text-pretty" style={{ color: '#004764' }}>
          {t.problem.bridge}
        </p>

        {/* What the Burst isn't */}
        <div className="mt-8 rounded-2xl p-7 sm:p-8" style={{ border: '1px solid #e4e8ea' }}>
          <h3 className="font-bold text-base mb-5" style={{ color: '#004764' }}>{t.problem.not.heading}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.problem.not.items.map((it) => (
              <li key={it.t} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5" style={{ backgroundColor: '#F2F1F0', color: '#7d94a1' }} aria-hidden="true">✕</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#004764' }}>{it.t}</p>
                  <p className="text-sm leading-relaxed mt-1 text-pretty" style={{ color: '#00648C' }}>{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- What is a Burst ---------------- */}
      <section id="burst" className="py-24 scroll-mt-4" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.what.eyebrow}</p>
            <h2 className={`${H2} mb-5`} style={{ color: '#004764' }}><Phrases text={t.what.title} /></h2>
            <p className="text-base leading-relaxed text-pretty" style={{ color: '#00648C' }}>{t.what.lead}</p>
          </div>

          {/* Three learning modes — order matters: learn → practice → exchange */}
          <p className="text-sm font-semibold mb-4" style={{ color: '#238251' }}>{t.what.modesIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {t.what.cards.map((c, i) => (
              <div key={c.t} className="p-8 rounded-2xl bg-white" style={{ border: '1px solid #e4e8ea' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white font-bold" style={{ backgroundColor: ['#008cc1', '#238251', '#0BB89B'][i] }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#004764' }}>{c.t}</h3>
                <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{c.d}</p>
              </div>
            ))}
          </div>

          {/* The "magic formula": two complementary roles */}
          <div className="mt-8 rounded-2xl p-6 sm:p-8 bg-white" style={{ border: '1px solid #e4e8ea' }}>
            <h3 className="font-bold text-lg" style={{ color: '#004764' }}><Phrases text={t.what.roles.heading} /></h3>
            <p className="text-sm mb-6" style={{ color: '#00648C' }}>{t.what.roles.sub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.what.roles.items.map((r, i) => (
                <div key={r.t} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: i === 0 ? '#008cc1' : '#0BB89B' }}>
                    <Icon name={r.icon} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1" style={{ color: '#004764' }}>{r.t}</h4>
                    <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mixed AI levels */}
          <div className="mt-6 rounded-2xl p-6 sm:p-8 bg-white" style={{ border: '1px solid #e4e8ea', borderLeft: '4px solid #0BB89B' }}>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#004764' }}><Phrases text={t.what.levels.heading} /></h3>
            <p className="text-sm leading-relaxed max-w-3xl text-pretty" style={{ color: '#00648C' }}>{t.what.levels.d}</p>
          </div>
        </div>
      </section>

      {/* ---------------- Pour qui ---------------- */}
      <section id="pour-qui" className="max-w-5xl mx-auto px-6 sm:px-8 py-24 scroll-mt-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.pourQui.eyebrow}</p>
          <h2 className={H2} style={{ color: '#004764' }}><Phrases text={t.pourQui.title} /></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.pourQui.cards.map((c) => (
            <div key={c.t} className="p-8 rounded-2xl" style={{ backgroundColor: '#F2F1F0' }}>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#004764' }}><Phrases text={c.t} /></h3>
              <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{c.d}</p>
            </div>
          ))}
        </div>

        {/* One format, challenges specific to each function */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-5" style={{ color: '#004764' }}><Phrases text={t.pourQui.examples.heading} /></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.pourQui.examples.items.map((x) => (
              <div key={x.t} className="rounded-2xl p-5" style={{ border: '1px solid #e4e8ea' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#238251' }}>{x.t}</p>
                <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Déroulé ---------------- */}
      <section id="deroule" className="py-24 scroll-mt-4" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.deroule.eyebrow}</p>
              <h2 className={H2} style={{ color: '#004764' }}><Phrases text={t.deroule.title} /></h2>
            </div>
            <p className="text-sm max-w-xs leading-relaxed text-pretty" style={{ color: '#00648C' }}>{t.deroule.note}</p>
          </div>
          <img src="/img/room-wide.jpg" alt="Burst" className="w-full rounded-2xl object-cover mb-10" style={{ height: 300, objectPosition: 'center 55%' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.deroule.steps.map((s) => (
              <div key={s.n} className="rounded-2xl p-7 bg-white border border-[#e8e7e6] hover:border-[#0BB89B] transition-colors">
                <span className="text-3xl font-bold" style={{ color: '#d4d2d0' }}>{s.n}</span>
                <h3 className="font-bold text-lg mt-3 mb-2" style={{ color: '#004764' }}>{s.t}</h3>
                <p className="text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Formules ---------------- */}
      <section id="formules" className="py-24 scroll-mt-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.formules.eyebrow}</p>
            <h2 className={H2} style={{ color: '#004764' }}><Phrases text={t.formules.title} /></h2>
            <p className="mt-4 text-base max-w-xl mx-auto text-pretty" style={{ color: '#00648C' }}>{t.formules.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {t.formules.items.map((f) => (
              <div key={f.key} className="rounded-3xl overflow-hidden flex flex-col h-full bg-white"
                style={{ border: `2px solid ${f.accent}`, boxShadow: '0 12px 32px -22px rgba(0,71,100,0.35)' }}>
                <div className="px-6 pt-7 pb-5" style={{ backgroundColor: f.accent }}>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.formules.label} {f.key}<br />{f.tag}</span>
                  <h3 className="text-xl font-bold mb-1 leading-tight" style={{ color: '#fff' }}>{f.name}</h3>
                  <p className="text-xs min-h-[2.25rem]" style={{ color: 'rgba(255,255,255,0.8)' }}><Phrases text={f.tagline} /></p>
                </div>
                <div className="px-6 py-6 flex flex-col flex-1" style={{ backgroundColor: f.bg }}>
                  <div className="flex gap-4 mb-6">
                    <div>
                      <div className="text-xl xl:text-lg font-bold whitespace-nowrap" style={{ color: '#004764' }}>{f.s1}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#00648C' }}>{f.s1l}</div>
                    </div>
                    <div style={{ borderLeft: `1px solid ${f.line}`, paddingLeft: '1rem' }}>
                      <div className="text-xl xl:text-lg font-bold whitespace-nowrap" style={{ color: '#004764' }}>{f.s2}</div>
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
                  <a href="#inscription" className="block whitespace-nowrap text-center text-sm font-semibold px-4 py-3 rounded-full transition-colors"
                    style={{ backgroundColor: f.accent, color: '#fff' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = f.accentHover; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = f.accent; }}>
                    {f.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="py-24" style={{ backgroundColor: '#F2F1F0' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.proof.eyebrow}</p>
              <h2 className={`${H2} mb-5`} style={{ color: '#004764' }}><Phrases text={t.proof.title} /></h2>
              <p className="text-base leading-relaxed mb-8 text-pretty" style={{ color: '#00648C' }}>{t.proof.lead}</p>
              <div className="grid grid-cols-2 gap-4">
                {t.proof.stats.map((s) => (
                  <div key={s.small} className="p-5 rounded-2xl bg-white">
                    <div className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: '#008cc1' }}><Groups text={s.big} separator="|" className="inline-block whitespace-nowrap" /></div>
                    <div className="text-xs mt-1.5 leading-snug" style={{ color: '#00648C' }}>{s.small}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden mb-4">
                <img src="/img/pano.jpg" alt="Burst chez Croesus" className="w-full object-cover" style={{ height: 200, objectPosition: 'center', filter: 'blur(1.5px)', transform: 'scale(1.04)' }} />
              </div>
              <img src="/img/whiteboard.jpg" alt={lang === 'fr' ? 'Impact de l’IA' : 'Impact of AI'} className="w-full rounded-2xl object-cover" style={{ height: 200, objectPosition: 'center 40%' }} />
            </div>
          </div>

          {/* Testimonial — final quote, as approved by Vincent Lévesque */}
          <div className="mt-16 rounded-3xl px-8 sm:px-14 py-12 text-center" style={{ backgroundColor: '#004764' }}>
            <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 max-w-3xl mx-auto text-white text-pretty">
              {lang === 'fr' ? `«${NBSP}${noOrphan(t.testimonial.quote)}${NBSP}»` : `“${noOrphan(t.testimonial.quote)}”`}
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src="/img/vincent.jpg" alt={t.testimonial.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-semibold text-sm text-white">{t.testimonial.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{t.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-24">
        <div className="mb-10">
          <p className="text-sm font-medium mb-2" style={{ color: '#238251' }}>{t.faq.eyebrow}</p>
          <h2 className={H2} style={{ color: '#004764' }}><Phrases text={t.faq.title} /></h2>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group rounded-2xl p-5" style={{ backgroundColor: '#F2F1F0' }}>
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-base list-none" style={{ color: '#004764' }}>
                {f.q}
                <span className="ml-4 transition-transform group-open:rotate-45 text-xl" style={{ color: '#008cc1' }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-pretty" style={{ color: '#00648C' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- CTA form ---------------- */}
      <section id="inscription" className="text-white py-16 scroll-mt-4" style={{ backgroundColor: '#004764' }}>
        <div className="max-w-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-8">
            <h2 className={`${H2} mb-2`}><Phrases text={t.form.title} /></h2>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>{t.form.sub}</p>
          </div>

          {submitted ? (
            <div className="text-center py-12" role="status">
              <p className="text-2xl font-bold mb-3">{t.form.thanksT}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t.form.thanksD}</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Q1 — motivation */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q1}</p>
                <div className="grid grid-cols-2 gap-2">
                  {t.form.q1opts.map((o) => (
                    <button key={o} type="button" onClick={() => setEnjeu(o)} aria-pressed={enjeu === o}
                      className="text-center text-xs font-medium px-3 py-2.5 rounded-xl border transition-all leading-snug"
                      style={chipStyle(enjeu === o)}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q2 — format */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q2}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {t.form.q2opts.map(([label, sub]) => (
                    <button key={label} type="button" onClick={() => setFormule(label)} aria-pressed={formule === label}
                      className="text-center text-xs font-medium px-2 py-2.5 rounded-xl border transition-all leading-snug"
                      style={chipStyle(formule === label)}>
                      <span className="font-bold">{label}</span><br />{sub}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q3 — AI tools (multi-select) */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {t.form.qTools} <span className="font-normal" style={{ color: 'rgba(255,255,255,0.5)' }}>· {t.form.qToolsHint}</span>
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {t.form.toolsOpts.map(([label, sub]) => (
                    <button key={label} type="button" onClick={() => toggleOutil(label)} aria-pressed={outils.includes(label)}
                      className="text-center text-xs font-medium px-2 py-2.5 rounded-xl border transition-all leading-snug"
                      style={chipStyle(outils.includes(label))}>
                      <span className="font-bold">{label}</span><br /><span style={{ color: 'rgba(255,255,255,0.65)' }}>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Q4 — challenge */}
              <div>
                <label htmlFor="defi" className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q3}</label>
                <textarea id="defi" rows={2} name="defi" placeholder={t.form.q3ph}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none placeholder:text-white/50"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
              </div>
              {/* Q5 — timing */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q4}</p>
                <div className="grid grid-cols-3 gap-2">
                  {t.form.q4opts.map((o) => (
                    <button key={o} type="button" onClick={() => setDelai(o)} aria-pressed={delai === o}
                      className="text-xs font-medium px-2 py-2.5 rounded-xl border transition-all leading-snug"
                      style={chipStyle(delai === o)}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              {/* Q6 — email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.q5}</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input id="email" type="email" name="email" required placeholder={t.form.emailPh}
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/50"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
                  <button type="submit" className="whitespace-nowrap text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors flex-shrink-0 bg-[#238251] hover:bg-[#1a6b3a]">
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
        <span className="text-center sm:text-right"><Phrases text={t.footer.tagline} /></span>
      </footer>

    </main>
  );
}
