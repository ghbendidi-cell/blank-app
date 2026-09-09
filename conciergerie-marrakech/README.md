# Conciergerie Marrakech — site vitrine

Site vitrine statique (un seul projet, sans CMS ni base de données) pour
une conciergerie de gestion de riads et locations courte durée à
Marrakech. Cible : des propriétaires basés à l'étranger. Objectif unique :
obtenir une prise de contact (formulaire ou WhatsApp).

Bilingue **anglais (par défaut) / français**, bascule instantanée sans
rechargement de page.

Stack : React + TypeScript + Vite + Tailwind CSS. Build statique classique
(`dist/`), déployable sur Vercel ou Netlify sans configuration serveur.

## Lancer en local

```bash
cd conciergerie-marrakech
npm install
npm run dev
```

Le site est alors sur `http://localhost:5173`.

```bash
npm run build    # build de production dans dist/
npm run preview  # sert le build de production en local
```

## Déposer vos vidéos et images

- **Vidéos** → `public/videos/`. La liste exacte des noms de fichiers
  attendus est dans `public/videos/README.md` (ex. `hero-riad-patio.mp4`,
  `gallery-souk.mp4`...). Déposez un fichier avec le nom exact et il
  apparaît automatiquement, sans toucher au code.
- **Images / posters** → `public/images/`. Le site est livré avec des
  posters de remplacement (SVG) nommés clairement ; remplacez-les par vos
  photos en gardant le même nom de fichier. Détail dans
  `public/images/README.md`.
- Le site fonctionne même si une vidéo manque : il retombe simplement sur
  l'image poster correspondante.

## Modifier les textes (anglais / français)

Toutes les chaînes du site sont centralisées dans un seul fichier :

```
src/i18n/translations.ts
```

Chaque section (`hero`, `promise`, `services`, `gallery`, `howItWorks`,
`about`, `contact`, `footer`) a une clé `en` et une clé `fr` avec exactement
la même structure. Modifiez le texte directement dans ce fichier — aucune
autre partie du code n'a besoin d'être touchée.

L'anglais est la langue par défaut (`defaultLanguage` dans ce même
fichier) ; le choix de langue du visiteur est mémorisé dans le navigateur
(`localStorage`) une fois qu'il a basculé manuellement.

## Coordonnées et marque

À éditer avant mise en ligne, dans `src/config.ts` :

- `WHATSAPP_NUMBER` — numéro WhatsApp au format international, chiffres
  uniquement (ex. `212600000000`).
- `CONTACT_EMAIL` — email affiché en pied de page.
- `BRAND_NAME` — actuellement `Dar Amana` (« maison de confiance » en
  arabe). Le nom de marque dans la barre de navigation (lettrage espacé)
  se modifie séparément dans `src/i18n/translations.ts` (`nav.brand`,
  pour chaque langue) si vous voulez un rendu différent de celui du pied
  de page. Il n'y a pas encore de logo — le mot-symbole texte fait office
  de logo en attendant.

## Formulaire de contact

Le formulaire est câblé pour **Netlify Forms** (attribut `data-netlify`) :
sur un déploiement Netlify, les soumissions arrivent directement dans le
tableau de bord Netlify, sans backend à héberger.

Si vous déployez ailleurs (Vercel, etc.), Netlify Forms ne fonctionnera
pas : remplacez l'action du formulaire dans
`src/components/ContactSection.tsx` par un service équivalent (par
exemple [Formspree](https://formspree.io)) ou par votre propre endpoint.

Le bouton WhatsApp (alternative mise en avant à côté du formulaire)
fonctionne indépendamment, dès que `WHATSAPP_NUMBER` est renseigné.

## Accessibilité et performance déjà en place

- Focus clavier visible sur tous les éléments interactifs.
- Vidéos : `autoplay`, `muted`, `loop`, `playsinline`,
  `preload="metadata"` ; désactivées automatiquement si l'utilisateur a
  activé « réduire les animations » (`prefers-reduced-motion`), avec
  poster affiché à la place.
- Vidéos hors écran chargées en différé (lazy, via
  `IntersectionObserver`) ; sur mobile, les vidéos secondaires de la
  galerie sont remplacées par une image fixe pour économiser la bande
  passante.
- Grille de galerie : 3 colonnes en desktop, 2 en tablette, 1 en mobile.

## Structure du projet

```
src/
  components/       Sections et composants UI de la page
  i18n/             Contexte de langue + fichier de traductions (en/fr)
  hooks/            Hooks utilitaires (lazy-load, prefers-reduced-motion...)
  config.ts         Constantes à éditer (WhatsApp, email, nom de marque)
public/
  videos/           Vos vidéos (voir README dans ce dossier)
  images/           Posters/placeholders (voir README dans ce dossier)
```

## Page "Nos services" détaillée (V2)

Non incluse dans cette V1 (site one-page). À ajouter plus tard comme une
route supplémentaire si le projet passe à un routeur (React Router ou
équivalent) — actuellement le site est volontairement une seule page.
