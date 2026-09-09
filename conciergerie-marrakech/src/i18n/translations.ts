import type { ServiceSlug } from "../data/services";

export const languages = ["en", "fr"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export interface ServiceDetail {
  name: string;
  oneLiner: string;
  heroAlt: string;
  whoHeading: string;
  whoText: string;
  howHeading: string;
  howSteps: string[];
  whyHeading: string;
  whyText: string;
}

export interface TranslationStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    home: string;
    services: string;
    pricing: string;
    about: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
  };
  selection: {
    countOne: string;
    countOther: string;
    add: string;
    remove: string;
    removeAria: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  promise: {
    paragraph: string;
  };
  services: {
    heading: string;
    items: { title: string; description: string }[];
  };
  servicesPage: {
    heading: string;
    subheading: string;
    cta: string;
  };
  servicesDetail: Record<ServiceSlug, ServiceDetail>;
  gallery: {
    heading: string;
    items: { name: string }[];
  };
  howItWorks: {
    heading: string;
    steps: { title: string; description: string }[];
  };
  about: {
    heading: string;
    paragraphs: string[];
    photoAlt: string;
  };
  pricing: {
    heading: string;
    intro: string;
    waysHeading: string;
    commissionTitle: string;
    commissionText: string;
    subscriptionTitle: string;
    subscriptionText: string;
    billing: { monthly: string; annual: string; annualBadge: string };
    includesHeading: string;
    quoteCta: string;
    addTierToSelection: string;
    tiers: Record<"essential" | "complete", { name: string; tagline: string }>;
  };
  contact: {
    heading: string;
    subheading: string;
    selectionSummaryHeading: string;
    removeSelectionAria: string;
    form: {
      name: string;
      email: string;
      phone: string;
      propertyType: string;
      propertyTypeOptions: { value: string; label: string }[];
      neighbourhood: string;
      message: string;
      submit: string;
      success: string;
    };
    whatsapp: {
      label: string;
      message: string;
    };
    orDivider: string;
  };
  footer: {
    tagline: string;
    contactLabel: string;
    legalLinks: string[];
    rights: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    meta: {
      title: "Dar Amana — Riad & Property Concierge, Marrakech",
      description:
        "Full-service concierge for riad and short-term rental owners in Marrakech. On the ground, on your behalf.",
    },
    nav: {
      brand: "DAR AMANA",
      home: "Home",
      services: "Our services",
      pricing: "Pricing",
      about: "Who we are",
      contact: "Contact",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    selection: {
      countOne: "1 service selected",
      countOther: "{n} services selected",
      add: "Add to my selection",
      remove: "Remove from my selection",
      removeAria: "Remove {name} from my selection",
    },
    hero: {
      title: "Your riad, cared for as if you never left",
      subtitle:
        "Full-service property management for owners based abroad.",
      cta: "Let's talk about your property",
    },
    promise: {
      paragraph:
        "You live thousands of miles away, and your property deserves better than an approximate kind of care. A riad left in the hands of an occasional cleaner and a distant WhatsApp thread slowly loses what made you buy it in the first place. We live in Marrakech, we visit your property in person, and we treat it the way we would our own — because that is, in effect, exactly what we do.",
    },
    services: {
      heading: "What's included",
      items: [
        {
          title: "Housekeeping & linen, every stay",
          description:
            "Professional cleaning and fresh linen between every guest, checked in person before each new arrival.",
        },
        {
          title: "Detailed monthly reporting",
          description:
            "A clear statement of occupancy, revenue and expenses, sent in English or French — whichever you prefer.",
        },
        {
          title: "One point of contact, always reachable",
          description:
            "No call centre, no rotating staff. One person who knows your property and answers directly.",
        },
        {
          title: "Professional photography & video updates",
          description:
            "High-quality listing photography, plus regular video walk-throughs so you can see your property as it is today.",
        },
        {
          title: "Pricing adjusted continuously",
          description:
            "Rates reviewed against seasonality and demand, so your property is never underpriced or sitting empty.",
        },
        {
          title: "Airport transfers & local experiences",
          description:
            "Through our network, your guests are met on arrival and can access the medina, souks and excursions with ease.",
        },
      ],
    },
    servicesPage: {
      heading: "Our services",
      subheading:
        "Six services, each run by a named person or a partner we vouch for — not a platform ticket queue.",
      cta: "View this service",
    },
    servicesDetail: {
      "menage-linge": {
        name: "Housekeeping & linen, every stay",
        oneLiner:
          "Professional cleaning and fresh linen between every guest, checked in person before each new arrival.",
        heroAlt: "Fresh linen and a made bed in a riad room",
        whoHeading: "Who does this",
        whoText:
          "Our partner housekeeping team handles the turnover itself — the same small crew every time, not a rotating agency roster. I do the final walk-through in person before each new guest arrives, so nothing reaches your property unchecked.",
        howHeading: "How we proceed",
        howSteps: [
          "A guest checks out; the housekeeping team is notified automatically and scheduled the same day.",
          "Full clean, bed linen and towels replaced, and consumables (soap, coffee, water) restocked.",
          "I do a walk-through in person — appliances, plumbing, small wear and tear — before the next guest is confirmed.",
          "Any issue found gets fixed or flagged to you the same day, not buried in a monthly report.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "A platform ticket doesn't know your riad's plumbing quirks or which tile is already cracked. We do, because the same person checks it every time. That's the difference between a cleaning service booked through an app and someone who actually knows your property.",
      },
      reporting: {
        name: "Detailed monthly reporting",
        oneLiner:
          "A clear statement of occupancy, revenue and expenses, sent in English or French — whichever you prefer.",
        heroAlt: "A monthly statement being reviewed at a desk",
        whoHeading: "Who does this",
        whoText:
          "I prepare and send your report personally, in whichever language you're most comfortable in — no template auto-generated by a booking platform's dashboard.",
        howHeading: "How we proceed",
        howSteps: [
          "Every booking, cleaning cost and expense is logged as it happens through the month.",
          "On the 1st of each month, you receive a statement via a shared spreadsheet: occupancy rate, revenue, costs, net payout.",
          "Your payout is transferred within the following days, with the statement as backup.",
          "Questions about a line item get answered directly by me, not a support ticket.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "Big platforms show you a dashboard and leave you to make sense of it. We send you a document you can actually read in five minutes, from someone who can explain any line if you ask.",
      },
      "interlocuteur-unique": {
        name: "One point of contact, always reachable",
        oneLiner:
          "No call centre, no rotating staff. One person who knows your property and answers directly.",
        heroAlt: "A phone call being answered in a riad courtyard",
        whoHeading: "Who does this",
        whoText:
          "That person is me. Whether it's a maintenance question, a guest issue, or you just want an update, you reach me directly — not a ticket queue.",
        howHeading: "How we proceed",
        howSteps: [
          "You get a direct phone number and WhatsApp — the same one, always.",
          "For anything time-sensitive (a guest locked out, a leak), I'm reachable and on-site within the day.",
          "For everything else, expect a reply within a few hours, not a few days.",
          "If I'm ever unavailable, you're told in advance who's covering — never silence.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "With a large agency, you never know who picks up. With us, the person who knows your riad's history is the person who answers the phone.",
      },
      "photos-videos": {
        name: "Professional photography & video updates",
        oneLiner:
          "High-quality listing photography, plus regular video walk-throughs so you can see your property as it is today.",
        heroAlt: "A photographer framing a shot in a riad courtyard",
        whoHeading: "Who does this",
        whoText:
          "I organise the photo shoot myself, working with a local photographer for the initial listing set, and film the ongoing video updates in person.",
        howHeading: "How we proceed",
        howSteps: [
          "A full professional photo shoot when your property goes live, redone whenever a renovation or redecoration warrants it.",
          "A short video walk-through every quarter, so you can see the property as it actually looks — not as it looked when you last visited.",
          "Photos are optimised for each platform's listing requirements, not just dumped as one generic set.",
          "Ask for an update anytime and I'll film one within the week.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "Anyone can point a phone at a room. What matters is someone who knows what a listing photo needs to do, and who'll actually go back and reshoot when the space has changed — not once and forgotten.",
      },
      "tarification-dynamique": {
        name: "Pricing adjusted continuously",
        oneLiner:
          "Rates reviewed against seasonality and demand, so your property is never underpriced or sitting empty.",
        heroAlt: "A calendar of bookings and rates",
        whoHeading: "Who does this",
        whoText:
          "I review pricing myself, using local knowledge of Marrakech's seasons and events — not a black-box algorithm applied blindly.",
        howHeading: "How we proceed",
        howSteps: [
          "Rates are checked weekly against comparable properties, local events (festivals, trade fairs) and booking pace.",
          "Prices are adjusted upward during high-demand windows, and downward when a gap in the calendar risks sitting empty.",
          "You're notified of any significant strategy shift — a minimum-stay change, a seasonal repositioning — before it happens, not after.",
          "You can set a floor price you're never comfortable going under; we work within it.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "Automated pricing tools don't know that a local festival just got announced, or that your riad's fifth-floor terrace is worth a premium a generic tool would miss. Local knowledge plus a human reviewing it weekly beats a script running unattended.",
      },
      "transferts-experiences": {
        name: "Airport transfers & local experiences",
        oneLiner:
          "Through our network, your guests are met on arrival and can access the medina, souks and excursions with ease.",
        heroAlt: "A driver waiting at the airport arrivals hall",
        whoHeading: "Who does this",
        whoText:
          "Airport transfers and local experiences run through Travel Center, my family's travel agency in Casablanca — an established operator, not a freelance driver found last-minute.",
        howHeading: "How we proceed",
        howSteps: [
          "Guest flight details are collected before arrival and shared with the transfer team.",
          "A driver meets them at the airport with a name board, no waiting or confusion on arrival.",
          "On request, guests can book excursions (desert trips, cooking classes, guides) through the same trusted network.",
          "Any transfer or excursion issue is handled by Travel Center directly, with me as the point of escalation if needed.",
        ],
        whyHeading: "Why us, not another provider",
        whyText:
          "We route this through an agency that's been operating in Morocco for years, not a contact found on a forum. Your guests get the same standard of service you'd expect booking a tour yourself — because in effect, they are.",
      },
    },
    gallery: {
      heading: "Marrakech, as it is",
      items: [
        { name: "The souk at dusk" },
        { name: "Medina, early morning" },
        { name: "A rooftop terrace, medina in view" },
        { name: "A riad patio at rest" },
        { name: "A quiet derb" },
        { name: "Craft, still made by hand" },
        { name: "A gallery overlooking the courtyard" },
        { name: "A quiet sitting room" },
      ],
    },
    howItWorks: {
      heading: "How it works",
      steps: [
        {
          title: "A first conversation",
          description:
            "We talk about your property, your priorities, and what \"well managed\" means to you.",
        },
        {
          title: "Listing and photography",
          description:
            "We prepare your property, arrange professional photography, and get it live where it belongs.",
        },
        {
          title: "Management and monthly transfers",
          description:
            "We handle guests, maintenance and pricing day to day, and transfer your earnings to you every month.",
        },
      ],
    },
    about: {
      heading: "Who I am",
      paragraphs: [
        "I live in Marrakech year-round, which means your property is never more than a short drive away — not a promise made from another country.",
        "My family has worked in Moroccan tourism for years, running a travel agency in Casablanca, so hospitality and the standards guests expect are not new to me.",
        "I trained as a civil engineer, which turns out to matter more than you'd expect: I notice the small structural and maintenance issues in a riad before they become expensive ones.",
      ],
      photoAlt: "Portrait photo — to be added",
    },
    pricing: {
      heading: "Pricing",
      intro:
        "Most owners work with us on commission — a rate adjusted to your property, with nothing to pay upfront. If you'd rather have a predictable fixed cost, a subscription is available instead.",
      waysHeading: "Two ways to work with us",
      commissionTitle: "Commission on revenue",
      commissionText:
        "Our default arrangement: a percentage of what your property actually earns, adjusted to the property and the services you need. No fixed fee, no cost if the property sits empty.",
      subscriptionTitle: "Fixed monthly subscription",
      subscriptionText:
        "For owners who prefer a predictable cost regardless of occupancy. You choose which services are included; we quote a fixed monthly rate for your property.",
      billing: {
        monthly: "Monthly",
        annual: "Annual",
        annualBadge: "2 months free",
      },
      includesHeading: "Included services",
      quoteCta: "Request a personalised quote",
      addTierToSelection: "Add this plan to my selection",
      tiers: {
        essential: {
          name: "Essential",
          tagline: "The three services every owner needs from day one.",
        },
        complete: {
          name: "Complete",
          tagline: "Every service, fully managed, nothing left for you to do.",
        },
      },
    },
    contact: {
      heading: "Let's talk about your property",
      subheading:
        "Tell us a little about it, and we'll get back to you within one business day.",
      selectionSummaryHeading: "You're contacting us about:",
      removeSelectionAria: "Remove {name}",
      form: {
        name: "Full name",
        email: "Email address",
        phone: "Phone number",
        propertyType: "Property type",
        propertyTypeOptions: [
          { value: "riad", label: "Riad" },
          { value: "apartment", label: "Apartment" },
          { value: "villa", label: "Villa" },
        ],
        neighbourhood: "Neighbourhood / area",
        message: "Tell us about your property",
        submit: "Send message",
        success: "Thank you — we'll be in touch shortly.",
      },
      whatsapp: {
        label: "Prefer WhatsApp?",
        message:
          "Hello, I'd like to talk about the management of my property in Marrakech.",
      },
      orDivider: "or",
    },
    footer: {
      tagline: "Riad & property concierge, Marrakech",
      contactLabel: "Contact",
      legalLinks: ["Legal notice", "Privacy policy"],
      rights: "All rights reserved.",
    },
  },
  fr: {
    meta: {
      title: "Dar Amana — Conciergerie de riad et de biens, Marrakech",
      description:
        "Conciergerie complète pour propriétaires de riads et locations courte durée à Marrakech. Sur place, en votre nom.",
    },
    nav: {
      brand: "DAR AMANA",
      home: "Accueil",
      services: "Nos services",
      pricing: "Tarifs",
      about: "Qui nous sommes",
      contact: "Contact",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
    },
    selection: {
      countOne: "1 service sélectionné",
      countOther: "{n} services sélectionnés",
      add: "Ajouter à ma sélection",
      remove: "Retirer de ma sélection",
      removeAria: "Retirer {name} de ma sélection",
    },
    hero: {
      title: "Votre riad, entretenu comme si vous ne l'aviez jamais quitté",
      subtitle:
        "Gestion complète de votre bien, pour propriétaires basés à l'étranger.",
      cta: "Parlons de votre bien",
    },
    promise: {
      paragraph:
        "Vous vivez à des milliers de kilomètres, et votre bien mérite mieux qu'une gestion approximative. Un riad laissé aux mains d'une femme de ménage occasionnelle et d'un fil WhatsApp distant perd peu à peu ce qui vous a donné envie de l'acheter. Nous vivons à Marrakech, nous nous rendons sur place en personne, et nous traitons votre bien comme le nôtre — parce que c'est, en pratique, exactement ce que nous faisons.",
    },
    services: {
      heading: "Ce qui est inclus",
      items: [
        {
          title: "Ménage et linge, à chaque séjour",
          description:
            "Nettoyage professionnel et linge frais entre chaque voyageur, vérifiés en personne avant chaque arrivée.",
        },
        {
          title: "Reporting mensuel détaillé",
          description:
            "Un état clair de l'occupation, des revenus et des dépenses, envoyé en anglais ou en français, selon votre préférence.",
        },
        {
          title: "Un interlocuteur unique, toujours joignable",
          description:
            "Pas de centre d'appel, pas de personnel qui change. Une seule personne, qui connaît votre bien et répond directement.",
        },
        {
          title: "Photos professionnelles et vidéos régulières",
          description:
            "Des photos de qualité pour vos annonces, et des vidéos de mise à jour régulières pour voir votre bien tel qu'il est aujourd'hui.",
        },
        {
          title: "Tarification ajustée en continu",
          description:
            "Des prix révisés selon la saison et la demande, pour que votre bien ne soit jamais sous-évalué ni vide.",
        },
        {
          title: "Transfert aéroport et expériences locales",
          description:
            "Grâce à notre réseau, vos voyageurs sont accueillis à leur arrivée et accèdent facilement à la médina, aux souks et aux excursions.",
        },
      ],
    },
    servicesPage: {
      heading: "Nos services",
      subheading:
        "Six services, chacun assuré par une personne nommée ou un partenaire dont nous répondons — pas une file de tickets sur une plateforme.",
      cta: "Voir ce service",
    },
    servicesDetail: {
      "menage-linge": {
        name: "Ménage et linge, à chaque séjour",
        oneLiner:
          "Nettoyage professionnel et linge frais entre chaque voyageur, vérifiés en personne avant chaque arrivée.",
        heroAlt: "Linge frais et un lit fait dans une chambre de riad",
        whoHeading: "Qui réalise ce service",
        whoText:
          "Notre équipe de ménage partenaire s'occupe du turnover — la même petite équipe à chaque fois, pas un roulement d'agence. Je fais moi-même la vérification finale avant chaque nouvelle arrivée, pour que rien n'atteigne votre bien sans contrôle.",
        howHeading: "Comment on procède",
        howSteps: [
          "Le voyageur part ; l'équipe de ménage est prévenue automatiquement et intervient le jour même.",
          "Nettoyage complet, linge de lit et serviettes changés, consommables (savon, café, eau) réapprovisionnés.",
          "Je fais un passage en personne — électroménager, plomberie, petite usure — avant de confirmer le prochain voyageur.",
          "Tout problème constaté est réparé ou signalé le jour même, pas enterré dans un rapport mensuel.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "Un ticket de plateforme ne connaît pas les particularités de plomberie de votre riad, ni quel carreau est déjà fissuré. Nous, si — parce que c'est toujours la même personne qui vérifie. C'est la différence entre un service de ménage réservé via une appli et quelqu'un qui connaît vraiment votre bien.",
      },
      reporting: {
        name: "Reporting mensuel détaillé",
        oneLiner:
          "Un état clair de l'occupation, des revenus et des dépenses, envoyé en anglais ou en français, selon votre préférence.",
        heroAlt: "Un état mensuel consulté sur un bureau",
        whoHeading: "Qui réalise ce service",
        whoText:
          "Je prépare et vous envoie ce rapport personnellement, dans la langue qui vous convient — pas un modèle généré automatiquement par le tableau de bord d'une plateforme.",
        howHeading: "Comment on procède",
        howSteps: [
          "Chaque réservation, coût de ménage et dépense est enregistré au fil du mois.",
          "Le 1er de chaque mois, vous recevez un état via un tableau partagé : taux d'occupation, revenus, coûts, versement net.",
          "Votre versement est transféré dans les jours qui suivent, avec l'état en justificatif.",
          "Une question sur une ligne du rapport reçoit une réponse directe de ma part, pas un ticket support.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "Les grandes plateformes vous montrent un tableau de bord et vous laissent vous débrouiller. Nous vous envoyons un document que vous pouvez lire en cinq minutes, rédigé par quelqu'un capable d'expliquer chaque ligne si vous le demandez.",
      },
      "interlocuteur-unique": {
        name: "Un interlocuteur unique, toujours joignable",
        oneLiner:
          "Pas de centre d'appel, pas de personnel qui change. Une seule personne, qui connaît votre bien et répond directement.",
        heroAlt: "Un appel téléphonique pris dans un patio de riad",
        whoHeading: "Qui réalise ce service",
        whoText:
          "Cette personne, c'est moi. Question d'entretien, souci avec un voyageur, ou simplement une envie de nouvelles : vous me joignez directement, pas une file d'attente.",
        howHeading: "Comment on procède",
        howSteps: [
          "Vous avez un numéro de téléphone et un WhatsApp direct — toujours le même.",
          "Pour tout ce qui est urgent (voyageur bloqué dehors, fuite d'eau), je suis joignable et sur place dans la journée.",
          "Pour le reste, comptez une réponse en quelques heures, pas en quelques jours.",
          "Si je suis indisponible, vous êtes prévenu à l'avance de qui prend le relais — jamais de silence.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "Avec une grande agence, on ne sait jamais qui décroche. Avec nous, la personne qui connaît l'historique de votre riad est celle qui répond au téléphone.",
      },
      "photos-videos": {
        name: "Photos professionnelles et vidéos régulières",
        oneLiner:
          "Des photos de qualité pour vos annonces, et des vidéos de mise à jour régulières pour voir votre bien tel qu'il est aujourd'hui.",
        heroAlt: "Un photographe cadrant une prise de vue dans un patio de riad",
        whoHeading: "Qui réalise ce service",
        whoText:
          "J'organise moi-même la séance photo, avec un photographe local pour le jeu de photos initial, et je filme personnellement les vidéos de mise à jour.",
        howHeading: "Comment on procède",
        howSteps: [
          "Une séance photo professionnelle complète à la mise en ligne de votre bien, refaite dès qu'une rénovation ou un redécor le justifie.",
          "Une courte vidéo tous les trimestres, pour voir votre bien tel qu'il est réellement — pas tel qu'il était lors de votre dernière visite.",
          "Les photos sont optimisées selon les exigences de chaque plateforme, pas un jeu générique déposé partout à l'identique.",
          "Demandez une mise à jour à tout moment, je filme dans la semaine.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "N'importe qui peut pointer un téléphone dans une pièce. Ce qui compte, c'est quelqu'un qui sait ce qu'une photo d'annonce doit accomplir, et qui reviendra effectivement filmer quand l'espace a changé — pas une fois puis plus jamais.",
      },
      "tarification-dynamique": {
        name: "Tarification ajustée en continu",
        oneLiner:
          "Des prix révisés selon la saison et la demande, pour que votre bien ne soit jamais sous-évalué ni vide.",
        heroAlt: "Un calendrier de réservations et de tarifs",
        whoHeading: "Qui réalise ce service",
        whoText:
          "Je révise moi-même la tarification, avec une connaissance locale des saisons et événements de Marrakech — pas un algorithme boîte noire appliqué aveuglément.",
        howHeading: "Comment on procède",
        howSteps: [
          "Les prix sont vérifiés chaque semaine face aux biens comparables, aux événements locaux (festivals, salons) et au rythme des réservations.",
          "Les tarifs sont relevés lors des pics de demande, et ajustés à la baisse quand un creux du calendrier risque de laisser le bien vide.",
          "Vous êtes prévenu de tout changement de stratégie important — durée minimale de séjour, repositionnement saisonnier — avant qu'il n'ait lieu, pas après.",
          "Vous pouvez fixer un prix plancher que nous ne descendons jamais ; nous travaillons dans cette limite.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "Un outil de tarification automatisé ne sait pas qu'un festival local vient d'être annoncé, ni que la terrasse du cinquième étage de votre riad vaut une prime qu'un outil générique manquerait. La connaissance locale, doublée d'une révision humaine chaque semaine, l'emporte sur un script qui tourne seul.",
      },
      "transferts-experiences": {
        name: "Transfert aéroport et expériences locales",
        oneLiner:
          "Grâce à notre réseau, vos voyageurs sont accueillis à leur arrivée et accèdent facilement à la médina, aux souks et aux excursions.",
        heroAlt: "Un chauffeur qui attend dans le hall des arrivées de l'aéroport",
        whoHeading: "Qui réalise ce service",
        whoText:
          "Les transferts aéroport et expériences locales passent par Travel Center, l'agence de voyage familiale à Casablanca — un opérateur établi, pas un chauffeur freelance trouvé à la dernière minute.",
        howHeading: "Comment on procède",
        howSteps: [
          "Les informations de vol du voyageur sont collectées avant l'arrivée et transmises à l'équipe de transfert.",
          "Un chauffeur l'accueille à l'aéroport avec un panneau nominatif, sans attente ni confusion à l'arrivée.",
          "Sur demande, les voyageurs peuvent réserver des excursions (désert, cours de cuisine, guides) via ce même réseau de confiance.",
          "Tout incident de transfert ou d'excursion est géré directement par Travel Center, avec moi en recours si besoin.",
        ],
        whyHeading: "Pourquoi nous et pas un autre prestataire",
        whyText:
          "Nous passons par une agence qui opère au Maroc depuis des années, pas un contact trouvé sur un forum. Vos voyageurs reçoivent le même niveau de service que si vous réserviez un circuit vous-même — parce qu'en pratique, c'est exactement le cas.",
      },
    },
    gallery: {
      heading: "Marrakech, telle qu'elle est",
      items: [
        { name: "Le souk à la tombée du jour" },
        { name: "La médina, tôt le matin" },
        { name: "Une terrasse sur les toits, vue sur la médina" },
        { name: "Un patio de riad au calme" },
        { name: "Un derb tranquille" },
        { name: "L'artisanat, encore fait à la main" },
        { name: "Une galerie donnant sur le patio" },
        { name: "Un coin salon tranquille" },
      ],
    },
    howItWorks: {
      heading: "Comment ça marche",
      steps: [
        {
          title: "Un premier échange",
          description:
            "Nous discutons de votre bien, de vos priorités, et de ce que « bien géré » signifie pour vous.",
        },
        {
          title: "Mise en ligne et photos",
          description:
            "Nous préparons votre bien, organisons une séance photo professionnelle, et le mettons en ligne là où il doit être.",
        },
        {
          title: "Gestion et versements mensuels",
          description:
            "Nous gérons les voyageurs, l'entretien et la tarification au quotidien, et vous versons vos revenus chaque mois.",
        },
      ],
    },
    about: {
      heading: "Qui je suis",
      paragraphs: [
        "Je vis à Marrakech toute l'année, ce qui veut dire que votre bien n'est jamais qu'à quelques minutes de route — pas une promesse faite depuis un autre pays.",
        "Ma famille travaille dans le tourisme marocain depuis des années, avec une agence de voyage à Casablanca : l'accueil et les standards attendus par les voyageurs ne me sont pas étrangers.",
        "Je suis formé en génie civil, ce qui compte plus qu'on ne le pense : je repère les petits problèmes structurels et d'entretien d'un riad avant qu'ils ne deviennent coûteux.",
      ],
      photoAlt: "Photo portrait — à ajouter",
    },
    pricing: {
      heading: "Tarifs",
      intro:
        "La plupart des propriétaires travaillent avec nous à la commission — un taux ajusté à votre bien, sans rien à payer à l'avance. Si vous préférez un coût fixe et prévisible, un abonnement est aussi possible.",
      waysHeading: "Deux façons de travailler avec nous",
      commissionTitle: "Commission sur les revenus",
      commissionText:
        "Notre fonctionnement par défaut : un pourcentage de ce que votre bien rapporte réellement, ajusté au bien et aux services souhaités. Pas de forfait fixe, aucun coût si le bien reste vide.",
      subscriptionTitle: "Abonnement mensuel fixe",
      subscriptionText:
        "Pour les propriétaires qui préfèrent un coût prévisible, quelle que soit l'occupation. Vous choisissez les services inclus ; nous établissons un devis à tarif fixe mensuel pour votre bien.",
      billing: {
        monthly: "Mensuel",
        annual: "Annuel",
        annualBadge: "2 mois offerts",
      },
      includesHeading: "Services inclus",
      quoteCta: "Demander un devis personnalisé",
      addTierToSelection: "Ajouter cette formule à ma sélection",
      tiers: {
        essential: {
          name: "Essentiel",
          tagline: "Les trois services dont tout propriétaire a besoin dès le premier jour.",
        },
        complete: {
          name: "Complet",
          tagline: "Tous les services, gestion intégrale, plus rien à faire de votre côté.",
        },
      },
    },
    contact: {
      heading: "Parlons de votre bien",
      subheading:
        "Dites-nous en un peu plus, nous vous répondons sous un jour ouvré.",
      selectionSummaryHeading: "Vous nous contactez à propos de :",
      removeSelectionAria: "Retirer {name}",
      form: {
        name: "Nom complet",
        email: "Adresse email",
        phone: "Numéro de téléphone",
        propertyType: "Type de bien",
        propertyTypeOptions: [
          { value: "riad", label: "Riad" },
          { value: "apartment", label: "Appartement" },
          { value: "villa", label: "Villa" },
        ],
        neighbourhood: "Quartier / zone",
        message: "Parlez-nous de votre bien",
        submit: "Envoyer le message",
        success: "Merci — nous revenons vers vous très vite.",
      },
      whatsapp: {
        label: "Vous préférez WhatsApp ?",
        message:
          "Bonjour, je souhaite parler de la gestion de mon bien à Marrakech.",
      },
      orDivider: "ou",
    },
    footer: {
      tagline: "Conciergerie de riad et de biens, Marrakech",
      contactLabel: "Contact",
      legalLinks: ["Mentions légales", "Politique de confidentialité"],
      rights: "Tous droits réservés.",
    },
  },
};
