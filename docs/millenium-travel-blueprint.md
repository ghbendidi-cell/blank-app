# Millenium Travel — Blueprint Technique E-commerce
### Spécification produit & architecture — prête pour implémentation Figma Make

**Client** : Millenium Travel, agence de voyage — Maarif, Casablanca, Maroc
**Objectif business** : Site vitrine e-commerce orienté **lead generation** (pas de checkout en ligne). L'objectif de conversion n'est pas le paiement, mais le **contact agence** (téléphone, WhatsApp, demande de devis, visite en agence).
**Audience** : ~25 ans, bilingue FR/AR, mobile-first, forte utilisation de WhatsApp.
**Langue de référence** : Document rédigé en français ; les libellés produits doivent exister en FR et AR (RTL) dans le CMS dès le départ.

> **Note images** : Toutes les zones image du blueprint (packs, destinations, équipe, hero) sont des **placeholders explicites** — composant `<ImagePlaceholder>` avec ratio fixe et texte alternatif bilingue à renseigner. Aucune image n'est prescrite ici ; à remplacer par les visuels officiels de l'agence.

---

## 1. Architecture de l'information — Sitemap

Structure bilingue avec préfixe de langue à la racine (`/fr/...`, `/ar/...`), voir §9 pour la convention d'URL détaillée.

```
/ (redirection auto vers /fr ou /ar selon Accept-Language + géo-IP MA)
│
├── /fr  |  /ar                                  [Accueil]
│
├── /destinations                                 [Liste des destinations]
│   ├── /destinations/maroc
│   ├── /destinations/turquie
│   ├── /destinations/dubai-emirats
│   ├── /destinations/europe
│   ├── /destinations/asie
│   └── /destinations/[slug-destination]           [Fiche destination]
│
├── /packs                                         [Liste des packs — moteur de recherche + filtres]
│   ├── /packs?destination=&budget=&duree=&type=&dates=
│   └── /packs/[slug-pack]                          [Fiche pack — page de conversion clé]
│
├── /omra-hajj                                     [Section dédiée Omra/Hajj — forte spécificité marché MA]
│   ├── /omra-hajj/programmes
│   └── /omra-hajj/[slug-programme]
│
├── /voyages-groupes                               [Groupes, entreprises, EVJF, voyages organisés]
│
├── /avis                                          [Page Avis clients — notes + commentaires + agrégat]
│
├── /a-propos                                      [À propos]
│   ├── /a-propos/qui-sommes-nous
│   ├── /a-propos/notre-agence          (adresse Maarif, photos, horaires)
│   ├── /a-propos/notre-equipe          (cartes agents)
│   └── /a-propos/certifications        (IATA, ONMT, partenaires)
│
├── /blog                                          [Blog / Actus voyage — pilier SEO]
│   ├── /blog?categorie=
│   └── /blog/[slug-article]
│
├── /contact                                       [Contact — formulaire devis + WhatsApp + tel + carte]
│
├── /favoris                                       [Packs sauvegardés — localStorage, pas de compte requis]
│
├── /mentions-legales
├── /politique-confidentialite
├── /cgu
│
└── /admin                                         [Back-office — non indexé, robots: noindex]
    ├── /admin/login
    ├── /admin/packs
    ├── /admin/destinations
    ├── /admin/demandes           (leads reçus)
    ├── /admin/avis                (modération)
    ├── /admin/agents
    └── /admin/blog
```

**Regroupement logique de la nav principale (header)** :
`Destinations · Packs · Omra & Hajj · Groupes · Avis · Blog · À propos · Contact` + sélecteur FR/AR + CTA permanent "Appeler" / "WhatsApp".

---

## 2. User Journey Mapping — 3 parcours de conversion critiques

### Parcours A — Recherche par destination → Fiche pack → Demande de devis
1. **Arrivée** : SEO organique ("voyage Turquie pas cher Casablanca") ou nav → `/destinations/turquie`
2. **Fiche destination** : contexte (climat, visa, meilleure période) + packs associés en grille
3. **Filtrage** : affinage par budget/durée sur `/packs?destination=turquie`
4. **Fiche pack** (`/packs/istanbul-7-jours`) : galerie, itinéraire jour par jour, prix, inclus/exclus, avis liés
5. **Déclencheur de conversion** : CTA sticky mobile "Demander un devis" → `ContactRequestForm` pré-rempli avec le pack
6. **Confirmation** : écran de succès + rappel "Un conseiller vous rappelle sous 24h" + lien WhatsApp direct en fallback
7. **Point de friction évité** : aucun paywall, aucun compte requis avant contact

### Parcours B — Recherche par budget → Comparaison → Appel agence
1. **Arrivée** : Accueil, utilisation du `BudgetSlider` dans la barre de recherche hero
2. **Résultats** : `/packs?budget=5000-10000` — grille de `PackCard` triable (prix croissant/décroissant)
3. **Comparaison** : sélection de 2-3 packs via checkbox "Comparer" → `ComparisonDrawer` (tableau côte à côte : prix, durée, inclusions)
4. **Décision rapide** : profil jeune, forte propension à l'appel direct plutôt qu'au formulaire
5. **Déclencheur de conversion** : clic sur `ClickToCallButton` (numéro Maarif) — tracké en événement analytics `call_intent`
6. **Fallback** : si hors horaires d'agence, affichage automatique du bouton WhatsApp avec message pré-rempli contenant les packs comparés

### Parcours C — Lecture d'avis → Réservation en agence
1. **Arrivée** : réseaux sociaux / bouche-à-oreille → `/avis` directement, ou via bloc `TestimonialCarousel` en accueil
2. **Page Avis** : `RatingSummary` agrégé (note globale + répartition par destination/type de voyage) + filtre par destination
3. **Renforcement de confiance** : lecture de 3-5 avis vérifiés, badges "Client vérifié", éventuels avis Google synchronisés
4. **Exploration** : clic depuis un avis vers le pack concerné (`avis → pack associé`)
5. **Déclencheur de conversion** : CTA "Visitez-nous à Maarif" avec `AgencyLocationCard` (carte Google Maps + horaires + itinéraire)
6. **Conversion finale** : visite en agence physique (non trackable en ligne) — donc KPI proxy = clic "Itinéraire" / "Voir sur Maps"

**KPIs de conversion trackés (Analytics)** : `quote_request_submitted`, `whatsapp_click`, `call_click`, `maps_directions_click`, `pack_comparison_used`, `review_to_pack_click`.

---

## 3. Architecture des données

### 3.1 Diagramme relationnel (entités principales)

```
Destination 1───N Pack N───1 TripType (catégorie: Balnéaire, Culturel, Omra, Groupe...)
Destination 1───N Article (blog, contexte destination)

Pack 1───N PackImage (placeholder)
Pack 1───N ItineraryDay
Pack 1───N PriceVariant (ex: chambre double / single / enfant)
Pack 1───N Review
Pack 1───N ContactRequest (optionnel — demande liée à un pack précis)

Agent (conseiller) 1───N ContactRequest (assignation)
Agency (fiche unique Maarif, extensible multi-agence) 1───N Agent

Review N───1 Pack (optionnel, un avis peut être général agence)
Review 1───1 ReviewModerationStatus
```

### 3.2 Modèles de schéma (contenu dynamique — format Strapi/headless CMS)

```ts
// Destination
interface Destination {
  id: string
  slug: string                     // ex: "turquie" — identique FR/AR, ou slug_fr / slug_ar séparés
  name_fr: string
  name_ar: string
  country_code: string             // ISO 3166 (TR, AE, MA...)
  region: "maroc" | "international" | "moyen-orient" | "europe" | "asie"
  description_fr: RichText
  description_ar: RichText
  best_period_fr: string
  best_period_ar: string
  visa_info_fr?: string
  visa_info_ar?: string
  hero_image: ImagePlaceholder
  seo: SeoFields
  featured: boolean
  packs: Pack[]                    // relation inverse
}

// Pack (le pack voyage = entité "Product" au sens schema.org)
interface Pack {
  id: string
  slug: string
  title_fr: string
  title_ar: string
  destination_id: string           // FK -> Destination
  trip_type: "maroc" | "international" | "omra" | "hajj" | "groupe" | "sur-mesure"
  duration_days: number
  duration_nights: number
  price_from: number               // MAD, prix d'appel affiché en carte
  currency: "MAD"
  price_variants: PriceVariant[]
  departure_dates: DateRange[]
  inclusions_fr: string[]
  inclusions_ar: string[]
  exclusions_fr: string[]
  exclusions_ar: string[]
  itinerary: ItineraryDay[]
  images: ImagePlaceholder[]       // galerie, min 1 requis (placeholder par défaut)
  highlights_fr: string[]
  highlights_ar: string[]
  rating_avg: number               // dénormalisé, recalculé à chaque Review
  rating_count: number
  status: "publie" | "brouillon" | "archive"
  is_featured: boolean
  seo: SeoFields
  created_at: DateTime
  updated_at: DateTime
}

interface PriceVariant {
  label_fr: string                 // "Chambre double", "Single", "Enfant -12 ans"
  label_ar: string
  price: number
}

interface ItineraryDay {
  day_number: number
  title_fr: string
  title_ar: string
  description_fr: RichText
  description_ar: RichText
}

interface ImagePlaceholder {
  url: string | null               // null tant que non fourni par l'agence
  alt_fr: string
  alt_ar: string
  is_placeholder: boolean          // true par défaut -> affichage composant grisé
  aspect_ratio: "16:9" | "4:3" | "1:1"
}

// Review
interface Review {
  id: string
  pack_id?: string                 // null = avis général agence
  author_name: string
  author_initial_only: boolean     // option confidentialité (ex: "Sara M.")
  rating: 1 | 2 | 3 | 4 | 5
  comment_fr?: string
  comment_ar?: string
  source: "site" | "google" | "facebook"
  verified_client: boolean
  moderation_status: "en_attente" | "approuve" | "rejete"
  created_at: DateTime
}

// Agent (conseiller agence)
interface Agent {
  id: string
  full_name: string
  role_fr: string
  role_ar: string
  photo: ImagePlaceholder
  phone: string
  whatsapp: string
  email: string
  languages: ("fr" | "ar" | "en")[]
}

// Agency (fiche établissement — extensible multi-agence à terme)
interface Agency {
  id: string
  name: string                     // "Millenium Travel — Maarif"
  address_fr: string
  address_ar: string
  city: "Casablanca"
  neighborhood: "Maarif"
  geo: { lat: number; lng: number }
  phone: string
  whatsapp: string
  email: string
  opening_hours: OpeningHour[]
  google_place_id?: string         // pour sync Google Reviews
}

// ContactRequest (le "lead" — cœur du modèle métier)
interface ContactRequest {
  id: string
  type: "devis" | "rappel" | "info_generale"
  full_name: string
  phone: string
  email?: string
  preferred_contact: "telephone" | "whatsapp" | "email"
  pack_id?: string                 // FK optionnelle
  destination_id?: string
  message?: string
  budget_range?: string
  travel_dates_hint?: string
  assigned_agent_id?: string
  status: "nouveau" | "en_cours" | "traite" | "perdu"
  source_page: string              // tracking d'attribution
  locale: "fr" | "ar"
  created_at: DateTime
}
```

---

## 4. Surface API

Architecture **headless** : CMS back-office expose une API REST/GraphQL consommée par le frontend Next.js (SSR/ISR). Endpoints publics en lecture, endpoints d'écriture protégés ou rate-limités + anti-spam.

### 4.1 Endpoints publics (lecture, cache CDN agressif)

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/destinations` | Liste destinations, filtrable par `region` |
| GET | `/api/destinations/:slug` | Détail destination + packs liés |
| GET | `/api/packs` | Liste + filtres `?destination=&budget_min=&budget_max=&duration=&type=&date_from=&date_to=&sort=` |
| GET | `/api/packs/:slug` | Détail pack complet |
| GET | `/api/packs/:slug/similar` | Packs similaires (même destination/type) |
| GET | `/api/reviews?pack_id=&page=` | Avis paginés, filtrables par pack |
| GET | `/api/reviews/summary?pack_id=` | Agrégat note moyenne + distribution |
| GET | `/api/agents` | Équipe agence (page À propos) |
| GET | `/api/agency` | Fiche établissement (adresse, horaires, géo) |
| GET | `/api/blog` | Liste articles, filtrable par `categorie` |
| GET | `/api/blog/:slug` | Article complet |
| GET | `/api/sitemap.xml` | Sitemap dynamique bilingue |

### 4.2 Endpoints d'écriture (public, formulaires)

| Méthode | Endpoint | Description | Protection |
|---|---|---|---|
| POST | `/api/contact-requests` | Soumission formulaire devis/rappel | reCAPTCHA v3, rate-limit IP, honeypot |
| POST | `/api/reviews` | Soumission avis client (passe en modération) | reCAPTCHA v3, rate-limit |
| POST | `/api/newsletter` | Inscription newsletter | double opt-in email |

**Effet de bord `POST /api/contact-requests`** : déclenche en cascade —
1. Enregistrement en base (statut `nouveau`)
2. Notification email interne (agence) via Resend/SendGrid
3. Notification WhatsApp interne via WhatsApp Business API (template message vers numéro agence)
4. Email de confirmation au client (accusé de réception bilingue selon `locale`)

### 4.3 Endpoints back-office (protégés — JWT + RBAC)

| Méthode | Endpoint | Rôle requis |
|---|---|---|
| POST | `/api/admin/auth/login` | — |
| CRUD | `/api/admin/packs` | Editeur, Admin |
| CRUD | `/api/admin/destinations` | Editeur, Admin |
| CRUD | `/api/admin/blog` | Editeur, Admin |
| GET/PATCH | `/api/admin/contact-requests` | Editeur, Admin (assignation, changement statut) |
| PATCH | `/api/admin/reviews/:id/moderate` | Admin (approuver/rejeter) |
| CRUD | `/api/admin/agents` | Admin |
| GET | `/api/admin/analytics/leads` | Admin (dashboard conversions) |

**Rôles** : `Admin` (accès complet), `Editeur` (contenu packs/blog, pas de gestion utilisateurs), `Agent` (lecture leads assignés uniquement).
**Auth back-office** : JWT + refresh token (session 8h), 2FA optionnel recommandé pour rôle Admin. Pas d'authentification côté visiteur public (aucun compte client requis — cohérent avec absence de paiement en ligne).

### 4.4 Intégrations tierces

| Intégration | Usage | Implémentation |
|---|---|---|
| **WhatsApp Business API** | CTA contact direct + notifications internes de leads | MVP : liens `wa.me/212XXXXXXXXX?text=...` pré-remplis. V2 : WhatsApp Business Cloud API (Meta) via provider (360dialog/Twilio) pour réponses automatisées |
| **Téléphonie / Click-to-call** | CTA "Appeler" mobile | Simple lien `tel:+212...`, event de tracking au clic |
| **Google Places API** | Synchronisation avis Google Business Profile sur `/avis` | Job cron quotidien, cache 24h, fallback si quota dépassé |
| **Google Maps Embed** | Localisation agence Maarif | Embed statique + lien "Itinéraire" |
| **Email transactionnel** | Confirmation devis, notif interne | Resend ou SendGrid (templates FR/AR) |
| **reCAPTCHA v3 / Turnstile** | Anti-spam formulaires | Cloudflare Turnstile recommandé (perf + confidentialité) |
| **Analytics** | Tracking conversions | GA4 + Meta Pixel (retargeting Facebook/Instagram, forte pertinence audience 25 ans MA) |

---

## 5. Inventaire des composants UI (35 composants)

| # | Composant | Usage |
|---|---|---|
| 1 | `Header/Navbar` | Navigation principale, sticky au scroll |
| 2 | `LanguageSwitcher` | Toggle FR/AR, persiste le choix (cookie), bascule `dir="rtl"` |
| 3 | `MobileMenu` | Menu hamburger plein écran, mobile-first |
| 4 | `HeroBanner` | Accueil — accroche + recherche intégrée |
| 5 | `SearchBar` | Recherche destination avec autocomplete |
| 6 | `FilterPanel` | Budget (slider), durée, type de voyage, dates |
| 7 | `BudgetSlider` | Sélecteur de fourchette de prix |
| 8 | `DateRangePicker` | Sélection dates de départ (RTL-aware) |
| 9 | `PackCard` | Carte pack (grille résultats) — image, titre, prix dès, durée, note |
| 10 | `DestinationCard` | Carte destination — image, nom, nb de packs |
| 11 | `PackGrid` | Grille responsive de `PackCard` |
| 12 | `PackGallery` | Carrousel galerie fiche pack (placeholders) |
| 13 | `ItineraryTimeline` | Timeline jour par jour |
| 14 | `PriceTable` | Tableau des variantes de prix |
| 15 | `InclusionsList` | Liste inclus/exclus (icônes check/cross) |
| 16 | `StickyCTA` | Barre sticky mobile — "Devis" + "Appeler" |
| 17 | `WhatsAppButton` | Bouton flottant global, message pré-rempli contextuel |
| 18 | `ContactRequestForm` | Formulaire devis, pré-remplissable par pack |
| 19 | `ClickToCallButton` | Bouton tel: avec tracking |
| 20 | `AgencyLocationCard` | Adresse, horaires, carte, lien itinéraire |
| 21 | `MapEmbed` | Google Maps intégré |
| 22 | `ReviewCard` | Affichage d'un avis (note, texte, badge vérifié) |
| 23 | `ReviewList` | Liste paginée d'avis |
| 24 | `RatingSummary` | Note globale agrégée + répartition en étoiles |
| 25 | `ReviewForm` | Soumission d'un nouvel avis |
| 26 | `TestimonialCarousel` | Carrousel avis mis en avant (accueil) |
| 27 | `Breadcrumb` | Fil d'Ariane, RTL-aware (inversion flèches) |
| 28 | `Footer` | Liens, réseaux sociaux, mentions légales |
| 29 | `NewsletterForm` | Inscription email |
| 30 | `BlogCard` | Carte article blog |
| 31 | `FAQAccordion` | Questions fréquentes (fiche pack / contact) |
| 32 | `TrustBadges` | Certifications IATA/ONMT, partenaires |
| 33 | `AgentCard` | Fiche conseiller (page équipe) |
| 34 | `ImagePlaceholder` | Emplacement image générique, bordure pointillée + icône |
| 35 | `ComparisonDrawer` | Tiroir comparatif de 2-3 packs sélectionnés |
| 36 | `ToastNotification` | Confirmation d'action (devis envoyé, avis soumis) |
| 37 | `AdminLeadsTable` | Back-office — liste des demandes de contact |
| 38 | `AdminPackEditor` | Back-office — formulaire CRUD pack bilingue |
| 39 | `PriceBadge` | Formatage prix MAD localisé (FR: "8 500 MAD" / AR: "٨٥٠٠ درهم") |
| 40 | `LoadingSkeleton` | État de chargement pour `PackCard`/`PackGrid` |

---

## 6. Blueprints de pages (wireframes structurels)

### 6.1 Accueil (`/fr`, `/ar`)

```
┌─────────────────────────────────────────────┐
│ Header: Logo | Nav | LanguageSwitcher | Tel  │
├─────────────────────────────────────────────┤
│           HERO BANNER                        │
│   [ImagePlaceholder plein écran]              │
│   Accroche + SearchBar (destination/budget)   │
├─────────────────────────────────────────────┤
│  Destinations populaires (DestinationCard x4) │
├─────────────────────────────────────────────┤
│  Packs à la une (PackCard x6, PackGrid)       │
│  [Voir tous les packs →]                      │
├─────────────────────────────────────────────┤
│  Bloc Omra & Hajj (bannière dédiée + CTA)     │
├─────────────────────────────────────────────┤
│  Pourquoi Millenium Travel (TrustBadges)      │
├─────────────────────────────────────────────┤
│  TestimonialCarousel + RatingSummary résumé   │
├─────────────────────────────────────────────┤
│  Derniers articles blog (BlogCard x3)         │
├─────────────────────────────────────────────┤
│  AgencyLocationCard (Maarif) + CTA Contact     │
├─────────────────────────────────────────────┤
│ Footer                                        │
└─────────────────────────────────────────────┘
[WhatsAppButton flottant bas-droite/gauche selon RTL]
[StickyCTA mobile uniquement]
```

### 6.2 Liste des packs (`/packs`)

```
┌─────────────────────────────────────────────┐
│ Header                                        │
│ Breadcrumb: Accueil > Packs                   │
├──────────────┬────────────────────────────────┤
│ FilterPanel  │  Barre de tri (prix/popularité) │
│ (sticky,     │  Nb résultats                   │
│ collapsible  ├────────────────────────────────┤
│ sur mobile)  │  PackGrid (PackCard x N)         │
│              │  [checkbox "Comparer" par carte] │
│  - Destination│  Pagination / Load more          │
│  - Budget    │                                  │
│  - Durée     │                                  │
│  - Type      │                                  │
│  - Dates     │                                  │
└──────────────┴────────────────────────────────┘
[ComparisonDrawer si ≥2 packs sélectionnés]
[StickyCTA mobile]
Footer
```

### 6.3 Fiche pack (`/packs/[slug]`)

```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Destination > Pack titre│
├─────────────────────────────────────────────┤
│ PackGallery (carrousel ImagePlaceholder)      │
├───────────────────────┬───────────────────────┤
│ Titre + destination    │  PriceTable            │
│ RatingSummary (mini)   │  Dates de départ        │
│ Highlights (liste)     │  [CTA Demander un devis]│
│                        │  [CTA WhatsApp/Appeler] │
├───────────────────────┴───────────────────────┤
│ ItineraryTimeline (jour 1 → jour N)            │
├─────────────────────────────────────────────┤
│ InclusionsList (inclus / non-inclus, 2 col)    │
├─────────────────────────────────────────────┤
│ FAQAccordion (visa, bagages, annulation...)     │
├─────────────────────────────────────────────┤
│ ReviewList (avis liés à ce pack) + ReviewForm  │
├─────────────────────────────────────────────┤
│ Packs similaires (PackGrid, 3 cards)            │
├─────────────────────────────────────────────┤
│ ContactRequestForm (pré-rempli avec ce pack)    │
├─────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────┘
[StickyCTA mobile: "Devis" + "Appeler" — persiste au scroll]
```

### 6.4 Page Avis (`/avis`)

```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Avis                     │
├─────────────────────────────────────────────┤
│ RatingSummary (grand format — note globale,    │
│ nb avis, distribution 5→1 étoiles)              │
│ Badge "Avis vérifiés" + logo Google (si sync)  │
├─────────────────────────────────────────────┤
│ Filtres: destination / note / plus récents      │
├─────────────────────────────────────────────┤
│ ReviewList (ReviewCard x N, pagination)         │
│  - chaque carte: note, nom, date, texte,        │
│    pack lié (lien cliquable), badge vérifié     │
├─────────────────────────────────────────────┤
│ CTA "Laisser un avis" → ReviewForm (modal)      │
├─────────────────────────────────────────────┤
│ CTA final: AgencyLocationCard "Visitez-nous"    │
├─────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────┘
```

### 6.5 Page Contact (`/contact`)

```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Contact                  │
├───────────────────────┬───────────────────────┤
│ ContactRequestForm      │ AgencyLocationCard     │
│ (nom, tel, email,       │  - Adresse Maarif       │
│  type demande, message, │  - Horaires              │
│  pack lié optionnel)    │  - MapEmbed              │
│                          │  - ClickToCallButton    │
│                          │  - WhatsAppButton        │
├───────────────────────┴───────────────────────┤
│ Cartes agents (AgentCard x N) — "Notre équipe"  │
├─────────────────────────────────────────────┤
│ FAQAccordion (horaires, modes de paiement       │
│  en agence, délai de réponse...)                │
├─────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────┘
```

### 6.6 Page Destination (`/destinations/[slug]`)

```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Destinations > [Nom]     │
├─────────────────────────────────────────────┤
│ Hero destination (ImagePlaceholder large +      │
│ nom, meilleure période, info visa)              │
├─────────────────────────────────────────────┤
│ Description destination (RichText)              │
├─────────────────────────────────────────────┤
│ FilterPanel restreint (budget/durée) + tri       │
│ PackGrid — tous les packs de cette destination  │
├─────────────────────────────────────────────┤
│ Articles blog liés à la destination (BlogCard)  │
├─────────────────────────────────────────────┤
│ ReviewList filtré sur cette destination         │
├─────────────────────────────────────────────┤
│ ContactRequestForm (pré-rempli destination)      │
├─────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────┘
```

---

## 7. Recommandation de stack technique

| Couche | Choix recommandé | Justification |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) + TypeScript | SSR/ISR natif → SEO fort, i18n intégrée (`next-intl`), performance mobile |
| **Styling** | Tailwind CSS (avec plugin RTL / propriétés logiques `ms-`/`me-` au lieu de `ml-`/`mr-`) | Bascule RTL/LTR fiable via `dir` attribute sans dupliquer les styles |
| **i18n / RTL** | `next-intl` + `dir="rtl"` dynamique sur `<html>`, police arabe (ex. Noto Naskh Arabic / IBM Plex Sans Arabic) chargée conditionnellement | Gestion propre des routes `/fr` `/ar`, fallback de traduction |
| **CMS headless** | Strapi (self-hosted) — alternative : Directus | Open-source, RBAC natif pour back-office, champs bilingues via i18n plugin, hébergeable localement pour souveraineté des données MAROC/Europe |
| **Base de données** | PostgreSQL | Robuste, relations Pack/Destination/Review bien modélisées, compatible Strapi |
| **Recherche/filtres** | Meilisearch (self-hosted) | Recherche instantanée typo-tolerante, excellent support français/arabe, léger à héberger |
| **Médias** | Cloudflare Images ou Cloudinary | Optimisation automatique (WebP/AVIF), transformations à la volée, essentiel pour mobile 3G/4G au Maroc |
| **Hébergement frontend** | Vercel (région Paris `cdg1`) | Latence Casablanca-Paris ~25-35ms, edge caching, déploiement Git natif |
| **Hébergement CMS/API** | VPS Docker sur OVHcloud (Gravelines/Paris) ou DigitalOcean Amsterdam | Proximité réseau Maroc, conformité loi 09-08 (données perso) plus simple avec hébergeur europe/proche |
| **CDN** | Cloudflare (a un PoP à Casablanca) | Cache statique et images au plus près de l'audience marocaine |
| **Email transactionnel** | Resend (ou SendGrid) | Templates FR/AR, délivrabilité |
| **WhatsApp** | Liens `wa.me` en MVP → WhatsApp Business Cloud API (via 360dialog) en V2 | Coût maîtrisé au lancement, évolutif |
| **Analytics** | GA4 + Meta Pixel + Cloudflare Web Analytics (sans cookie, complément RGPD-friendly) | Attribution des leads, retargeting réseaux sociaux |
| **CI/CD** | GitHub Actions → build/test → déploiement Vercel (preview par PR) + déploiement Docker CMS via webhook | Cohérent avec repo GitHub existant |
| **Monitoring** | Sentry (erreurs front/back) + Uptime Kuma ou Better Uptime | Alertes en cas de panne formulaire de devis (critique business) |

---

## 8. Benchmarks de performance

Cibles définies pour réseau mobile marocain (mix 4G dominant / 3G résiduel, terminaux milieu de gamme).

| Métrique | Cible | Contexte |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 s (mobile 4G), < 4 s (3G) | Hero + première `PackCard` visible |
| **INP** (Interaction to Next Paint) | < 200 ms | Interactions FilterPanel, ouverture formulaire |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Réservation d'espace pour tous les `ImagePlaceholder` (dimensions fixes) |
| **TTFB** | < 600 ms | Pages ISR statiques servies via edge cache |
| **Lighthouse Mobile Performance** | ≥ 90 | Sur pages `/`, `/packs`, `/packs/[slug]` |
| **Poids page (fiche pack)** | < 1.2 Mo transféré (hors vidéos) | Images en WebP/AVIF, lazy-loading systématique sous le fold |
| **Time to Interactive** | < 3.5 s (4G) | JS minimal côté client, hydratation partielle (React Server Components) |
| **Disponibilité formulaire devis** | ≥ 99.9 % uptime | Point de conversion critique — monitoring dédié |

**Pratiques associées** : lazy-loading de toutes les images sous le fold, `next/image` avec `sizes` responsive, préchargement des polices arabes (`font-display: swap`), code-splitting par route, pas de librairies lourdes non essentielles (éviter jQuery/moment.js), pagination ou "load more" plutôt que rendu de listes complètes.

---

## 9. Framework SEO

### 9.1 Convention d'URL bilingue

- Préfixe de langue en racine : `/fr/...` et `/ar/...` (jamais de contenu dupliqué sans préfixe)
- Slugs traduits et non translitérés bêtement : `/fr/packs/istanbul-7-jours` / `/ar/packs/اسطنبول-7-ايام` (UTF-8 natif, les moteurs modernes l'indexent correctement)
- `hreflang` réciproque sur chaque paire de pages :
  ```html
  <link rel="alternate" hreflang="fr-MA" href="https://milleniumtravel.ma/fr/packs/istanbul-7-jours" />
  <link rel="alternate" hreflang="ar-MA" href="https://milleniumtravel.ma/ar/packs/اسطنبول-7-ايام" />
  <link rel="alternate" hreflang="x-default" href="https://milleniumtravel.ma/fr/packs/istanbul-7-jours" />
  ```
- Canonical toujours self-referencing par langue (pas de canonical croisé FR→AR)
- Pas de paramètres de filtre indexables par défaut (`/packs?budget=...` → `noindex,follow` ; seules les pages de destination/type dédiées type `/packs/omra` sont indexées)

### 9.2 Structure des balises meta (gabarit)

| Page | Title (FR, ~60 car.) | Meta description (~155 car.) |
|---|---|---|
| Fiche pack | `{Titre pack} – {durée} dès {prix} MAD \| Millenium Travel` | `{Titre pack} au départ de Casablanca. {highlight 1}, {highlight 2}. Devis gratuit sous 24h, agence à Maarif.` |
| Destination | `Voyage {Destination} pas cher au départ du Maroc \| Millenium Travel` | `Découvrez nos meilleurs packs voyage {Destination} : prix, durées, avis clients. Demandez votre devis avec notre agence à Casablanca.` |
| Accueil | `Millenium Travel – Agence de voyage à Casablanca (Maarif)` | `Packs voyage Maroc & international, Omra/Hajj, groupes. Devis gratuit, contact WhatsApp direct. Votre agence de confiance à Maarif.` |
| Blog article | `{Titre article} \| Blog Millenium Travel` | `{Extrait éditorial 150 car.}` |

Balise `og:*` et `twitter:card` systématiques (image = premier visuel du pack, fallback logo agence si placeholder).

### 9.3 Stratégie de balisage Schema.org

- **Fiche pack** → `Product` + extension `TouristTrip` (itinéraire, offre) :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Istanbul 7 jours",
    "touristType": "Culturel",
    "itinerary": { "@type": "ItemList", "itemListElement": ["..."] },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "MAD",
      "price": "8500",
      "availability": "https://schema.org/InStock",
      "url": "https://milleniumtravel.ma/fr/packs/istanbul-7-jours"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "32"
    }
  }
  ```
- **Fiche agence / page contact** → `TravelAgency` (sous-type de `LocalBusiness`) avec adresse Maarif structurée, `openingHoursSpecification`, `geo`, `sameAs` (réseaux sociaux)
- **Page Avis / avis individuels** → `Review` imbriqué dans `TravelAgency` ou `TouristTrip`, plus `AggregateRating` global sur la page `/avis`
- **Blog** → `Article` / `BlogPosting` avec `author`, `datePublished`
- **Toutes les pages de liste** → `BreadcrumbList`
- Validation continue via Google Rich Results Test + Search Console (rapport "Améliorations" avis/produits) intégrée au pipeline QA avant chaque déploiement de contenu majeur

### 9.4 Piliers de contenu SEO (blog)

Stratégie de mots-clés longue traîne alignée sur l'intention de recherche marocaine :
`"voyage {destination} pas cher {ville MA}"`, `"prix omra {année} depuis le Maroc"`, `"que voir à {destination} en {durée}"`, `"visa {pays} pour marocains"`. Chaque article de blog doit maillage interne vers au minimum 1 fiche destination + 2 fiches pack pertinentes.

---

## Prochaines étapes suggérées

1. Valider l'arborescence (§1) et les 3 parcours de conversion (§2) avec l'agence avant maquettage Figma
2. Prioriser le MVP : `Accueil`, `Liste packs`, `Fiche pack`, `Contact` — Omra/Hajj et Blog peuvent suivre en V1.1
3. Collecter les vrais visuels (packs, destinations, équipe, agence Maarif) pour remplacer les `ImagePlaceholder`
4. Définir les 10-15 premiers packs à charger dans le CMS pour peuplement initial avant le lancement
