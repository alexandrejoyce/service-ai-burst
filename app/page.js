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
      eyebrow: 'Burst IA · Adopter l’IA par la pratique',
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
      lead: "La plupart des organisations ont déjà accès à des outils d’IA. Le défi est de les intégrer au travail réel. Ce virage ne se prend pas dans un webinaire : il se prend en faisant, ensemble, sur votre propre travail.",
      cards: [
        { t: 'Des licences,|pas encore de pratiques', d: "Les outils sont disponibles, mais les façons de travailler restent les mêmes." },
        { t: 'Des niveaux|très variés', d: "Quelques personnes explorent déjà l’IA pendant que d’autres débutent. Sans cadre commun, les écarts se creusent." },
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
          { t: 'Un produit fini', d: "Le Burst produit des prototypes ; leur mise en production est souvent une étape distincte." },
        ],
      },
    },
    what: {
      eyebrow: 'Le Burst',
      title: 'Un format intensif|pour apprendre~en faisant.',
      lead: "Une formation-action intensive : une demi-journée de mise à niveau, puis deux jours en sous-équipes sur vos défis réels, avec l’appui d’un duo d’experts. Pas un cours magistral : vos équipes réalisent elles-mêmes des prototypes concrets.",
      modesIntro: 'Trois modes d’apprentissage combinés',
      cards: [
        { t: 'Apprendre', d: "Les bons outils, méthodes et pratiques, présentés aux bons moments." },
        { t: 'Pratiquer', d: "Un défi réel, tiré du travail des participants, plutôt qu’un exercice fictif." },
        { t: 'Échanger', d: "Des debriefs entre équipes : ce qui fonctionne, les blocages, les découvertes." },
      ],
      roles: {
        heading: 'La formule magique :|deux rôles complémentaires',
        sub: "C’est cette combinaison qui fait vraiment fonctionner le format.",
        items: [
          { icon: 'users', t: 'L’animateur', d: "Structure la démarche, rythme les blocs de travail et fait progresser chaque équipe vers sa démonstration." },
          { icon: 'sparkles', t: 'L’expert en IA', d: "Accompagne, débloque et forme en temps réel, au moment où une équipe en a besoin." },
        ],
      },
      levels: {
        heading: 'Débutants~et utilisateurs avancés,|dans la même salle',
        d: "Le Burst fonctionne aussi bien avec des gens qui débutent qu’avec des utilisateurs avancés. La mise à niveau amène chacun au même point, et vos utilisateurs avancés deviennent des multiplicateurs :",
        points: ['proposent des défis à fort potentiel', 'partagent leurs agents, skills et façons de faire', 'servent de référence dans une sous-équipe', 'portent l’élan après le Burst'],
      },
      ingredients: {
        heading: 'Les ingrédients|qui font la différence',
        items: [
          { t: 'Une mise à niveau', d: "adaptée au niveau et aux besoins de chacun" },
          { t: 'Des défis réels', d: "choisis et cadrés avec vous avant le Burst" },
          { t: 'Des équipes mixtes', d: "de 3 à 5 personnes aux profils variés" },
          { t: 'Une démonstration', d: "comme ligne d’arrivée pour chaque équipe" },
        ],
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
      title: 'Deux jours et demi,|cinq temps forts,|des démos.',
      note: "Un rythme éprouvé : on met tout le monde à niveau, puis on livre.",
      steps: [
        { n: '01', t: 'Mise à niveau', d: "Un tronc commun sur les méthodes, puis des activités adaptées au niveau de chacun." },
        { n: '02', t: 'Blocs de travail', d: "Les sous-équipes avancent sur leur défi, en autonomie guidée." },
        { n: '03', t: 'Debriefs', d: "Ce qui fonctionne, les blocages et les découvertes sont partagés entre équipes." },
        { n: '04', t: 'Démonstrations', d: "Chaque équipe présente son prototype ou son projet." },
        { n: '05', t: 'Apprentissages', d: "Les acquis sont consolidés pour être réinvestis dans le travail." },
      ],
      around: [
        { t: 'Avant', d: "Cadrage, participants, défis et accès, à distance." },
        { t: 'Après', d: "Synthèse, sondage et suites possibles." },
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
          bullets: ['Apprentissage guidé des outils et des bonnes pratiques', 'Un défi concret à réaliser en équipe — pas juste de la théorie', 'Échanges entre pairs sur les apprentissages et les blocages', 'Animateur + expert en IA pour vous faire progresser', 'Livrable : premières démos + réflexes d’usage au quotidien'],
          cta: 'Choisir cette formule →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Actif', tag: 'Mode projet', tagline: '2,5 jours pour livrer|sur vos projets',
          s1: '2,5 jours', s1l: 'mise à niveau + 2 jours', s2: '4 – 20', s2l: 'participants',
          bullets: ['Une demi-journée de mise à niveau', 'Équipes sur de vrais projets, pas des exemples jouets', 'Démos fonctionnelles en direct', 'Animateur + expert en IA tout au long', 'Sondage des participants : apprentissages, satisfaction, potentiel de réutilisation', 'Livrable : prototypes présentés entre équipes + synthèse des apprentissages + pratiques à réutiliser'],
          cta: 'Choisir cette formule →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Itératif', tag: 'Tout inclus', tagline: 'Plusieurs Bursts + formation|+ accompagnement',
          s1: 'Sur mesure', s1l: 'durée adaptée', s2: 'illimité', s2l: 'participants / équipes',
          bullets: ['Plusieurs Bursts, avec plusieurs équipes', 'Mise à niveau et formation des équipes', 'Accompagnement vers l’adoption ou l’opérationnalisation des meilleurs prototypes', 'Participants et équipes illimités', 'Livrable : capacité d’innovation ancrée + montée en charge'],
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
      lead: "Plus de cinq Bursts menés avec différentes équipes de Croesus, fintech primée en gestion de patrimoine. Auprès de plusieurs clients : un usage de l’IA plus efficace, les meilleures pratiques adoptées et des apprentissages partagés entre équipes.",
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
        { q: 'Est-ce que notre travail reste confidentiel ?', a: "Oui. Les informations partagées sont traitées en toute confidentialité, et vous demeurez propriétaire des prototypes, contenus, skills et agents développés par vos équipes." },
        { q: 'Faut-il déjà savoir travailler avec l’IA ?', a: "Non. La mise à niveau amène chacun au même point, quel que soit son niveau. Les utilisateurs déjà avancés y trouvent aussi leur compte : ils servent de relais dans leur sous-équipe et repartent avec de nouvelles pratiques." },
        { q: 'Combien de participants ?', a: "De 4 à 20 participants par Burst, en sous-équipes de 3 à 5 personnes aux profils variés." },
        { q: 'Sur quels projets travaille-t-on ?', a: "Sur de vrais défis tirés du travail des participants, choisis et cadrés avec vous avant le Burst." },
        { q: 'Avec quels outils ?', a: "Ceux que votre organisation a approuvés : Microsoft Copilot, Claude, ChatGPT ou Gemini, par exemple. On valide licences et accès avec vous avant le Burst, pour éviter tout faux départ." },
        { q: 'Et la sécurité ?', a: "Elle fait partie du programme dès la mise à niveau : quelles données confier à l’IA, utiliser les outils approuvés, limiter les accès, vérifier les résultats et repérer les instructions piégées. Ces repères complètent votre politique d’usage de l’IA, sans la remplacer." },
        { q: 'En présentiel ou à distance ?', a: "La préparation et la synthèse se font à distance. Le Burst lui-même se vit sur place, 2,5 jours consécutifs, en français ou en anglais." },
        { q: 'Et après le Burst ?', a: "Vos équipes repartent capables de poursuivre seules. Quand un prototype mérite d’aller plus loin, on peut les accompagner vers une solution opérationnelle, dans une offre distincte." },
      ],
    },
    form: {
      title: 'Planifions|votre Burst',
      lead: "Un Burst conçu pour que vos équipes ne se contentent pas de découvrir l’IA, mais commencent réellement à transformer leur travail avec elle.",
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
      eyebrow: 'AI Burst · Adopting AI through practice',
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
      lead: "Most organizations already have access to AI tools. The challenge is to build them into real work. That shift doesn’t happen in a webinar: it happens by doing, together, on your own work.",
      cards: [
        { t: 'Licenses,|not yet practices', d: "The tools are there, but the ways of working stay the same." },
        { t: 'Very uneven|levels', d: "A few people are already exploring AI while others are just starting. Without a shared framework, the gaps widen." },
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
          { t: 'A finished product', d: "The Burst produces prototypes; putting them into production is often a separate step." },
        ],
      },
    },
    what: {
      eyebrow: 'The Burst',
      title: 'An intensive format|for learning by doing.',
      lead: "An intensive learning-by-doing program: a half-day to bring everyone up to speed, then two days in sub-teams on your real challenges, backed by a duo of experts. Not a lecture: your teams build concrete prototypes themselves.",
      modesIntro: 'Three learning modes combined',
      cards: [
        { t: 'Learn', d: "The right tools, methods and practices, introduced at the right moments." },
        { t: 'Practice', d: "A real challenge, drawn from the participants’ own work, rather than a made-up exercise." },
        { t: 'Exchange', d: "Debriefs between teams: what works, what blocks, what people discover." },
      ],
      roles: {
        heading: 'The magic formula:|two complementary roles',
        sub: "It’s that combination that truly makes the format work.",
        items: [
          { icon: 'users', t: 'The facilitator', d: "Structures the approach, paces the work blocks and moves each team toward its demo." },
          { icon: 'sparkles', t: 'The AI expert', d: "Coaches, unblocks and trains in real time, right when a team needs it." },
        ],
      },
      levels: {
        heading: 'Beginners~and advanced users,|in the same room',
        d: "The Burst works just as well with beginners as with advanced users. Getting up to speed brings everyone to the same starting point, and your advanced users become multipliers:",
        points: ['propose high-potential challenges', 'share their agents, skills and ways of working', 'act as go-to people in a sub-team', 'carry the momentum after the Burst'],
      },
      ingredients: {
        heading: 'The ingredients|that make the difference',
        items: [
          { t: 'Getting up to speed', d: "adapted to each person’s level and needs" },
          { t: 'Real challenges', d: "chosen and framed with you before the Burst" },
          { t: 'Mixed teams', d: "of 3 to 5 people with varied profiles" },
          { t: 'A demo', d: "as the finish line for every team" },
        ],
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
      title: 'Two and a half days,|five key moments,|working demos.',
      note: "A proven rhythm: level everyone up, then ship.",
      steps: [
        { n: '01', t: 'Getting up to speed', d: "A common core on methods, then activities adapted to each person’s level." },
        { n: '02', t: 'Work blocks', d: "Sub-teams move forward on their challenge, with guided autonomy." },
        { n: '03', t: 'Debriefs', d: "What works, what blocks and what people discover is shared between teams." },
        { n: '04', t: 'Demos', d: "Each team presents its prototype or project." },
        { n: '05', t: 'Learnings', d: "The takeaways are consolidated so they can be reinvested in the work." },
      ],
      around: [
        { t: 'Before', d: "Framing, participants, challenges and access, done remotely." },
        { t: 'After', d: "Synthesis, survey and possible next steps." },
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
          bullets: ['Guided learning of the tools and best practices', 'A concrete challenge to tackle as a team — not just theory', 'Peer exchange on learnings and blockers', 'Facilitator + AI expert to drive your progress', 'Deliverable: first demos + everyday usage reflexes'],
          cta: 'Choose this format →', accent: '#008cc1', accentHover: '#00648C', bg: '#f0f7fb', line: '#c8dde8',
        },
        {
          key: 'B', name: 'Active', tag: 'Project mode', tagline: '2.5 days to ship|on your projects',
          s1: '2.5 days', s1l: 'half-day + 2 days', s2: '4 – 20', s2l: 'participants',
          bullets: ['A half-day to get up to speed', 'Teams on real projects, not toy examples', 'Live, working demos', 'Facilitator + AI expert throughout', 'Participant survey: learnings, satisfaction, reuse potential', 'Deliverable: prototypes presented across teams + synthesis of learnings + practices to reuse'],
          cta: 'Choose this format →', accent: '#238251', accentHover: '#1a6b3a', bg: '#f2f8f4', line: '#b8d8c4',
        },
        {
          key: 'C', name: 'Iterative', tag: 'All-in', tagline: 'Several Bursts + training|+ coaching',
          s1: 'Custom', s1l: 'adapted duration', s2: 'unlimited', s2l: 'participants / teams',
          bullets: ['Several Bursts, with several teams', 'Getting teams up to speed and trained', 'Support toward adopting or operationalizing the best prototypes', 'Unlimited participants and teams', 'Deliverable: embedded innovation capability + scale-up'],
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
      lead: "More than five Bursts run with different teams at Croesus, an award-winning wealth-management fintech. With several clients: more effective use of AI, best practices adopted and learnings shared across teams.",
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
        { q: 'Does our work stay confidential?', a: "Yes. Everything you share is treated as confidential, and you remain the owner of the prototypes, content, skills and agents your teams develop." },
        { q: 'Do we need to already know how to work with AI?', a: "No. The onboarding brings everyone to the same starting point, whatever their level. Advanced users get something out of it too: they act as go-to people in their sub-team and leave with new practices." },
        { q: 'How many participants?', a: "From 4 to 20 participants per Burst, in sub-teams of 3 to 5 people with varied profiles." },
        { q: 'What projects do we work on?', a: "On real challenges drawn from the participants’ own work, chosen and framed with you before the Burst." },
        { q: 'Which tools do we use?', a: "The ones your organization has approved: Microsoft Copilot, Claude, ChatGPT or Gemini, for example. We validate licenses and access with you before the Burst, to avoid any false start." },
        { q: 'What about security?', a: "It’s part of the program from the very first half-day: which data to entrust to AI, using approved tools, limiting access, checking results and spotting hidden instructions. These guidelines complement your AI use policy; they don’t replace it." },
        { q: 'In person or remote?', a: "Preparation and synthesis are done remotely. The Burst itself happens on site, over 2.5 consecutive days, in French or English." },
        { q: 'What happens after the Burst?', a: "Your teams leave able to keep going on their own. When a prototype deserves to go further, we can support them toward an operational solution, as a separate engagement." },
      ],
    },
    form: {
      title: 'Let’s plan|your Burst',
      lead: "A Burst designed so your teams don’t just discover AI, but actually start transforming their work with it.",
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
  // Keep the last two words together: no word alone on the last line.
  return s.replace(/ (\S+)$/, `${NBSP}$1`);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

          {/* Ingredients that make the difference */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4" style={{ color: '#004764' }}><Phrases text={t.what.ingredients.heading} /></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.what.ingredients.items.map((x) => (
                <div key={x.t} className="rounded-2xl p-5 bg-white" style={{ border: '1px solid #e4e8ea' }}>
                  <p className="font-bold text-sm" style={{ color: '#004764' }}>{x.t}</p>
                  <p className="text-sm leading-relaxed mt-1 text-pretty" style={{ color: '#00648C' }}>{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mixed AI levels: advanced users as multipliers */}
          <div className="mt-6 rounded-2xl p-6 sm:p-8 bg-white" style={{ border: '1px solid #e4e8ea', borderLeft: '4px solid #0BB89B' }}>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#004764' }}><Phrases text={t.what.levels.heading} /></h3>
            <p className="text-sm leading-relaxed max-w-3xl text-pretty" style={{ color: '#00648C' }}>{t.what.levels.d}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
              {t.what.levels.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: '#004764' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#0BB89B' }}>✓</span>
                  {pt}
                </li>
              ))}
            </ul>
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
            {/* Before / after, kept to one line each: the detailed agenda stays off the site */}
            <div className="rounded-2xl p-7 flex flex-col justify-center gap-4" style={{ border: '1px dashed #c0ccd6' }}>
              {t.deroule.around.map((a) => (
                <div key={a.t}>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#238251' }}>{a.t}</p>
                  <p className="text-sm leading-relaxed mt-1 text-pretty" style={{ color: '#00648C' }}>{a.d}</p>
                </div>
              ))}
            </div>
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
              {lang === 'fr' ? `«${NBSP}${t.testimonial.quote}${NBSP}»` : `“${t.testimonial.quote}”`}
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
            <h2 className={`${H2} mb-3`}><Phrases text={t.form.title} /></h2>
            <p className="text-base leading-relaxed mb-3 text-pretty" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.form.lead}</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.form.sub}</p>
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
                  {t.form.qTools} <span className="font-normal whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>· {t.form.qToolsHint}</span>
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
