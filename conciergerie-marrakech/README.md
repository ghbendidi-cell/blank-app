# Conciergerie Marrakech — site vitrine

Site vitrine multi-pages (sans CMS ni base de données) pour une
conciergerie de gestion de riads et locations courte durée à Marrakech.
Cible : des propriétaires basés à l'étranger. Objectif : obtenir une prise
de contact (formulaire ou WhatsApp), avec un système de présélection de
services avant contact.

Bilingue **anglais (par défaut) / français**, bascule instantanée sans
rechargement de page, sur toutes les pages.

Stack : React + TypeScript + Vite + Tailwind CSS + React Router. Build
statique classique (`dist/`), déployé sur **GitHub Pages**
(`https://ghbendidi-cell.github.io/blank-app/`) via
`.github/workflows/deploy-conciergerie.yml` à chaque push sur `main`.

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

## Pages du site

| Route | Contenu |
|---|---|
| `/` | Page d'accueil complète (hero, promesse, aperçu des services, galerie, comment ça marche, qui je suis, formulaire de contact) |
| `/services` | Liste des 6 services, une carte cliquable par service |
| `/services/:slug` | Page dédiée par service (qui le réalise, comment on procède, pourquoi nous) — les 6 slugs sont dans `src/data/services.ts` |
| `/tarifs` | Commission vs abonnement, 2 formules (Essentiel / Complet), bascule mensuel/annuel |
| `/a-propos` | « Qui nous sommes », page dédiée (même contenu que la section de l'accueil, en page à part) |
| `/contact` | Formulaire de contact dédié, avec résumé de la sélection de services au-dessus |

Le menu (icône ☰ en haut à gauche) est un panneau plein écran accessible
depuis n'importe quelle page, avec les 5 liens ci-dessus (Accueil au lieu
de `/`) et le sélecteur de langue en bas.

### Sélection de services (« panier »)

Sur chaque page service et sur la page tarifs, un bouton permet d'ajouter
le service (ou tous les services d'une formule) à une présélection —
**ce n'est pas un panier d'achat**, aucun paiement n'est impliqué. La
sélection :

- est stockée dans `sessionStorage` (elle ne survit pas à la fermeture de
  l'onglet — c'est voulu, pas besoin de compte) ;
- s'affiche sous forme de compteur texte dans la barre du haut (« 3
  services sélectionnés »), à côté du menu ;
- apparaît en résumé au-dessus du formulaire de contact, avec possibilité
  de retirer un service directement là ;
- est incluse dans la soumission du formulaire (champ caché
  `selected_services`) et dans le message WhatsApp pré-rempli.

La logique vit dans `src/context/SelectionContext.tsx`
(`useSelection()`), et la liste des services dans
`src/data/services.ts`.

## Déposer vos vidéos et images

- **Vidéos** → `public/videos/`. La liste exacte des noms de fichiers
  attendus est dans `public/videos/README.md` (accueil + les 6 pages
  service, ex. `hero-riad-patio.mp4`, `service-menage-linge.mp4`...).
  Déposez un fichier avec le nom exact et il apparaît automatiquement,
  sans toucher au code.
- **Images / posters** → `public/images/`. Le site est livré avec des
  posters de remplacement (SVG) nommés clairement ; remplacez-les par vos
  photos en gardant le même nom de fichier (ou mettez à jour l'extension
  dans le composant concerné si vous changez de format). Détail dans
  `public/images/README.md`.
- Le site fonctionne même si une vidéo manque : il retombe simplement sur
  l'image poster correspondante.

## Modifier les textes (anglais / français)

Toutes les chaînes du site sont centralisées dans un seul fichier :

```
src/i18n/translations.ts
```

Chaque section a une clé `en` et une clé `fr` avec exactement la même
structure, y compris `servicesDetail` (contenu complet des 6 pages
service, clé = slug du service) et `pricing` (page tarifs). Modifiez le
texte directement dans ce fichier — aucune autre partie du code n'a
besoin d'être touchée, sauf si vous ajoutez ou retirez un service (voir
`src/data/services.ts`).

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

Le formulaire est câblé pour **Netlify Forms** (attribut `data-netlify`).
Le site actuel est déployé sur **GitHub Pages**, où Netlify Forms ne
fonctionne pas : si vous ne migrez pas vers Netlify, remplacez l'action
du formulaire dans `src/components/ContactSection.tsx` par un service
équivalent (par exemple [Formspree](https://formspree.io)) ou par votre
propre endpoint.

Le bouton WhatsApp (alternative mise en avant à côté du formulaire)
fonctionne indépendamment, dès que `WHATSAPP_NUMBER` est renseigné, et
inclut automatiquement les services présélectionnés dans le message
pré-rempli.

## Déploiement (GitHub Pages)

Le site se déploie automatiquement à chaque push sur `main` (workflow
`.github/workflows/deploy-conciergerie.yml`) vers
`https://ghbendidi-cell.github.io/blank-app/`.

Deux points techniques propres à ce mode d'hébergement, si vous touchez à
la config :

- **`base` absolu** — `vite.config.ts` fixe `base: "/blank-app/"` en
  production (relatif en dev). Toute référence à un fichier de
  `public/` dans le code doit passer par le helper
  `src/lib/asset.ts` (`asset("images/...")`) plutôt qu'un chemin en dur,
  sinon ça casse dès qu'on est sur une route imbriquée (ex.
  `/services/menage-linge`).
- **`404.html`** — copié depuis `index.html` après le build (étape du
  workflow), pour que GitHub Pages serve l'appli React sur un lien direct
  ou un rafraîchissement de page vers une route interne (ex.
  `/services/menage-linge`). C'est la technique standard pour faire
  fonctionner un routeur côté client (React Router) sur GitHub Pages.

## Accessibilité et performance déjà en place

- Focus clavier visible sur tous les éléments interactifs, y compris le
  panneau de menu (fermeture au clavier avec Échap) et les boutons de
  sélection.
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
  components/       Composants UI partagés (Header, MobileMenu, cartes...)
  pages/            Une page par route (Home, ServicesList, ServiceDetail...)
  layouts/          Layout global (Header + Footer + <Outlet/>) et scroll-to-top
  context/          SelectionContext (présélection de services, sessionStorage)
  data/             Liste des services et formules tarifaires (structurel)
  i18n/             Contexte de langue + fichier de traductions (en/fr)
  hooks/            Hooks utilitaires (lazy-load, prefers-reduced-motion...)
  lib/              Petits utilitaires (asset(), formatTemplate())
  config.ts         Constantes à éditer (WhatsApp, email, nom de marque)
public/
  videos/           Vos vidéos (voir README dans ce dossier)
  images/           Posters/placeholders (voir README dans ce dossier)
```
