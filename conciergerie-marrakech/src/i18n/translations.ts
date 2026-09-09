export const languages = ["en", "fr"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export interface TranslationStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    services: string;
    contact: string;
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
  contact: {
    heading: string;
    subheading: string;
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
      services: "Services",
      contact: "Contact",
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
    gallery: {
      heading: "Marrakech, as it is",
      items: [
        { name: "The souk at dusk" },
        { name: "Medina, early morning" },
        { name: "A rooftop terrace, medina in view" },
        { name: "A riad patio at rest" },
        { name: "A quiet derb" },
        { name: "Craft, still made by hand" },
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
    contact: {
      heading: "Let's talk about your property",
      subheading:
        "Tell us a little about it, and we'll get back to you within one business day.",
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
      services: "Services",
      contact: "Contact",
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
    gallery: {
      heading: "Marrakech, telle qu'elle est",
      items: [
        { name: "Le souk à la tombée du jour" },
        { name: "La médina, tôt le matin" },
        { name: "Une terrasse sur les toits, vue sur la médina" },
        { name: "Un patio de riad au calme" },
        { name: "Un derb tranquille" },
        { name: "L'artisanat, encore fait à la main" },
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
    contact: {
      heading: "Parlons de votre bien",
      subheading:
        "Dites-nous en un peu plus, nous vous répondons sous un jour ouvré.",
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
