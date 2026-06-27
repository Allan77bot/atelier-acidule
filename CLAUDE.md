# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du projet

Site vitrine du client **Atelier Acidulé** (crochet fait à la demande). Phase
**en production (déployé)** : projet **Astro scaffoldé à la main**. **En ligne :
https://atelier-acidule.netlify.app** (déploiement **CLI manuel** du `dist/`, voir
« Déploiement (Netlify) »). Pages : accueil (**vraie landing page** qui scrolle),
mes créations (**expérience scroll plein écran** : 1 sac = 1 section couleur),
éditions spéciales (galerie), atelier/contact, commander (formulaire on-site
placeholder, paiement plus tard).

**Commande = DM Instagram** partout (`@atelier_acidule`) : tous les CTA « Commander /
Shop ton sac » pointent vers le DM. Paiement en ligne plus tard.

> ⚠️ **Refonte du 27/06** : la **personnalisation a été supprimée** (plus de
> configurateur ni de page `/personnaliser`) ; l'ancien **split-screen GSAP** de
> `/mes-creations` est devenu du **scroll-snap CSS** ; la home est passée d'un
> « split éditorial » à une **landing classique**. Le seul bloc interactif restant
> est l'expérience scroll de `/mes-creations` (documentée plus bas).

### Commandes

```bash
npm install        # installe les dépendances (Astro 5 + gsap + lenis)
npm run dev        # serveur de dev (http://localhost:4321)
npm run build      # build de production -> dist/ (déjà présent)
npm run preview    # sert le build de prod
npm run check      # vérif types/diagnostics Astro (astro check)
```

Pas encore de tests unitaires : aucun framework de test installé. Quand on en
ajoutera (Vitest pressenti), documenter ici comment lancer un seul test.

⚠️ **Gotcha dev (Windows)** : après une **grosse modif / suppression de fichiers**
(ou l'ajout d'un asset `public/`), **redémarrer le dev server** — sinon overlay HMR
Vite périmé (« Unhandled rejection » alors que la console est vide et le `build`
vert). Tuer **uniquement** le process du port 4321 (pas tout `node`), en PowerShell :
`Get-NetTCPConnection -LocalPort 4321 -State Listen | %{ Stop-Process -Id $_.OwningProcess -Force }`.

Dépendances : `gsap` et `lenis` sont **encore dans `package.json` mais plus utilisés**
(GSAP retiré de `/mes-creations` à la refonte ; Lenis jamais branché) → à désinstaller au prochain nettoyage.

### Arborescence code

- `src/pages/` — une page par route (`index`, `mes-creations`, `editions-speciales`, `atelier`, `commander`). `index.astro` = la **landing page** (layout `Base`, plusieurs sections qui scrollent : hero sac flottant, 3 valeurs, aperçu catalogue, teasers atelier/éditions, bandeau final). `mes-creations.astro` = l'**expérience scroll plein écran** (CSS scroll-snap, 1 section par modèle ; markup + CSS + petit script inline dans un seul fichier).
- `src/layouts/Base.astro` — squelette HTML « classique » + polices Google Fonts (Playfair/Fraunces/Nunito) + `Nav`/`Footer` ; props `titre`/`description`. Utilisé par **toutes les pages sauf `mes-creations`** (la home `index` est repassée sur `Base`). Importe `global.css` puis `polish.css`.
- `src/layouts/Immersif.astro` — coquille plein écran (header minimal fixe `wordmark` + burger + tiroir menu). Prop **`fixe`** : si passée, `body` en `overflow:hidden` hauteur `100dvh` (utilisé par `mes-creations`, dont un conteneur interne `.reel` gère le scroll-snap). Sans `fixe`, la page scrolle normalement. Importe aussi `polish.css`.
- `src/components/` — `Logo`, `Nav`, `Footer`, `IntroAnim` (intro animée scrollée, **non utilisée** par défaut). ⚠️ `Configurateur` et `CarteModele` ont été **supprimés** à la refonte.
- `src/data/modeles.ts` — catalogue (`Modele[]` : slug, nom, baseline, description, prix, anse, `photo` = **sac détouré transparent**, personnalisable, **`couleur`** = fond du panneau de `/mes-creations`). `modelesPerso` (filtre `personnalisable`) existe encore mais n'est plus utilisé que par le `<select>` de `/commander`. Les 4 modèles alimentent la landing + `/mes-creations`.
- `src/styles/global.css` — tokens couleur/typo + utilitaires ; `:root` = palette (`--creme`, `--sapin`, `--citron`, `--terracotta`…) + fond mosaïque via `body::before`. `src/styles/polish.css` — couche de **finition** chargée **après** `global` (halo de fond, liseré citron des sur-titres, ombres) ; ⚠️ ses règles peuvent être battues par un style **scopé Astro** (`[data-astro-cid]` = spécificité supérieure).
- `public/images/` — assets de prod :
  - **sacs détourés transparents** `<slug>.png` (`petit-sac.png`, `pochette-livres.png`,
    `grand-sac.png`, `edition-speciale.png`) — utilisés par les **cartes de la landing**,
    par **`/mes-creations`** (posés sur le panneau couleur) et **`/editions-speciales`**.
  - **landing** : `accueil-hero-detoure.png` (sac vert héros), `accueil-mini-1/2/3-detoure.png`
    (mini-galerie), `atelier-cabas.png` (cabas multicolore — teaser atelier & page atelier).
    Tous **détourés** (fond transparent), générés via **rembg** `isnet-general-use`.
  - Plus `logo.png`, `mosaique-citron.jpg`.
  - ⚠️ Les anciennes familles `accueil-<slug>.png` (fonds recolorisés) et `sim-*` (calques
    du configurateur) ont été **supprimées** — ne plus les référencer.

## Vision produit validée (big picture)

> Détail complet et durable : mémoire `atelieracidule-site-brief` + `HISTORIQUE.md`.

- **Stack cible : Astro** (vitrine premium, îlots interactifs là où il faut).
  **Commerce hybride** : vitrine d'abord, **paiement branché plus tard** ; la
  commande reste **sur le site**, FAQ/contact → DM Instagram.
- **Identité** : Italie / Méditerranée, citron **acidulé** + registre **sucré-doux**.
  Palette **vert sauge/sapin + jaune citron + terracotta** sur fond **crème**.
  Typos : **Playfair Display** (italien, wordmark/CTA) + **Fraunces** (titres) +
  **Nunito Sans** (corps). Fond décoratif = mosaïque citron faible opacité.
- **4 modèles** : petit sac (anneaux laiton), grand sac de plage (bandoulière + franges
  laine), pochette à livres (fermeture nouée), **éditions spéciales** (page à part).
- **Personnalisation : abandonnée** (le configurateur recolorable a été retiré le 27/06).
  La commande passe désormais **100 % par le DM Instagram** ; cartes et sections affichent
  les **vraies photos détourées**.

## Architecture de `/mes-creations` (expérience scroll)

> `src/pages/mes-creations.astro` (+ `src/layouts/Immersif.astro`) — à lire avant d'y toucher.
> C'est le bloc interactif du site. **Refonte 27/06 : plus de GSAP, plus de flèches ni de
> bouton « Découvrir », plus de mode « détail »** (ce mode causait un rectangle blanc illisible).

- **Layout** : `<Immersif titre="Mes créations" fixe>` → `body` figé (`overflow:hidden`, `100dvh`).
- **Scroll-snap CSS** : un conteneur `.reel` (`height:100dvh; overflow-y:auto;
  scroll-snap-type:y mandatory`) contient **4 `<section class="creation">`** (une par modèle,
  `height:100dvh; scroll-snap-align:start`).
- **Couleur du panneau** = `--c` posée en **style inline** depuis `m.couleur` (`background:var(--c)`).
- **Contenu de chaque section** : le sac **détouré** (`m.photo`) qui flotte (drop-shadow CSS) + un
  bloc texte **blanc** (nom Fraunces, baseline Playfair italique, prix, anse, description) avec
  `text-shadow` + un léger **scrim** radial → lisible sur la couleur, **jamais de rectangle blanc**.
  Lien discret **« Commander en DM »** → Instagram.
- **Indicateur « Défiler ↓ »** (1er écran) qui s'efface au 1er scroll (classe `is-hidden` via JS).
- **JS minimal** (inline) : masquage de l'indicateur au scroll + reveal léger (IntersectionObserver),
  le tout neutralisé sous `prefers-reduced-motion`. **Aucun GSAP.**
- **Responsive** : mobile empilé (sac puis texte, centré) ; ≥760 px en 2 colonnes alternées
  (sections paires inversées).

## Déploiement (Netlify)

- Site Netlify **`atelier-acidule`** (team `allan-morjon77`), **lié en local** via `.netlify/`
  (gitignoré). `netlify.toml` configure le build (`npm run build` → `dist`, Node 20).
- **Déploiement = CLI manuel** pour l'instant : `netlify deploy --prod --dir=dist`.
  L'auto-deploy GitHub↔Netlify (push → build) **n'est pas branché** (Allan le fera lui-même).
- URL prod : **https://atelier-acidule.netlify.app**. Repo : `github.com/Allan77bot/atelier-acidule`.

> _(L'ancienne section « Architecture du Configurateur » a été retirée : la feature de
> personnalisation n'existe plus.)_

## Contenu actuel

- `HISTORIQUE.md` — suivi de session (voir « Trace de session »). `CLAUDE.md` — ce fichier.
  `docs/ETAT.md` + `docs/JOURNAL.md` — trace au format kit PILOTE (miroir de `HISTORIQUE.md`) ;
  `docs/audit-shots/` — captures de vérif navigateur (gitignoré).
- `CONTEXTE-PROJET.md` — **document autonome** (quoi/pourquoi/comment du projet) à
  donner à une IA ou un nouveau collaborateur **sans le code sous les yeux**. Résume
  produit, modèle éco, identité ; complète `CLAUDE.md` (archi vivante) et `HISTORIQUE.md` (journal).
- **Scripts racine `_*.cjs`** — helpers **jetables** de génération/retouche d'assets (ont
  servi aux calques `sim-*` du configurateur, désormais supprimés). Le **détourage** des
  sacs se fait via **rembg `isnet-general-use`** (API Python : `from rembg import remove,
  new_session` ; le CLI a une dép. cassée). Hors build Astro, pas des modules du site.
- `Pool/` — brouillons et prompts de travail (ex. `hieggfield-prompt.md`).
  `briefs/` — briefs d'animation validés (ex. `intro-citron-scroll.md`).
- `Ref/PhotoClient/` — photos client + assets renommés exploitables :
  `PetitSac (1-3)`, `SacBandoulière (1-4)`, `CouvreLivre (1-6)`,
  `Logo_AtelierAcidule.png/.jpg` (logo pelote+citron), `Mosaique_citron.jpg`
  (motif de fond), `VintedPrice.png` (prix : base 35 €, 40 €, jusqu'à 45 €).
  Fichiers lourds — **références d'entrée**, pas des assets de prod ; ne pas les
  modifier sans accord.
- `Ref/VideoClient/` — vidéos client (`video.MP4`, `POST ATELIER ACIDULE.MP4`).
- `Ref/catalogue/` — **27 nouvelles photos** produit numérotées (pochettes, cabas,
  clutchs… en de nombreux coloris) à exploiter pour enrichir le catalogue/les galeries.
  Encore non triées/intégrées. `Ref/images/` + `Ref/_preview/` — autres entrées de travail.
- `audit.md` — **modèle de prompt d'audit** (lecture seule) pour un *autre*
  projet (thème Shopify « 9MM »). Gabarit réutilisable, pas lié à ce projet.
- `skillorganisation.md` — méthode de travail générale d'Allan
  (= skill `organiser-une-session-claude-code`). Référence de process.

## Trace de session

`HISTORIQUE.md` **existe** à la racine — fichier unique de suivi, à **lire au
démarrage** avec ce `CLAUDE.md`. Deux sections : « État actuel » (réécrite à chaque
session) et « Log des sessions » (append-only, jamais réécrit). En **fin de session**,
réécrire l'état actuel et ajouter une entrée datée dans le log.

## Méthode de travail (résumé de `skillorganisation.md`)

Ordre non négociable : **lire avant d'agir → valider avant de coder → prouver
avant d'affirmer → tracer avant de partir.**

- **Skills d'abord** : si un skill peut s'appliquer (même 1 % de chance),
  l'invoquer AVANT d'agir. Les skills de process (brainstorm, debug, plan)
  passent avant les skills d'implémentation.
- **Brainstorm avant de coder** : jamais scaffolder sans un design présenté et
  validé. Poser les questions manquantes **une à la fois**, recommander **UNE**
  option plutôt qu'un catalogue.
- **Preuve avant « c'est fait »** : ne jamais affirmer qu'un truc marche sans
  avoir lancé la commande de vérif et lu sa sortie. Si un test échoue, le dire.
- **Git** : le projet **est un dépôt git** (travail en cours sur la branche
  `feat/refonte-accueil`). `main` reste stable, jamais coder directement dessus ;
  une préoccupation = une branche (`feat/`, `fix/`, `chore/`, `docs/`) = une PR.
  **Jamais push / déployer / ouvrir une PR sans accord explicite.** Jamais supprimer
  de fichiers sans confirmation. Jamais commiter de secret. (Suppression : utiliser
  `trash`, pas `rm -rf`.)
- **Communication** : français, direct, on explique le *pourquoi* ; niveau
  débutant respecté (on lit le code pour l'utilisateur, pas de dump brut).

## Référence — Kit PILOTE (recettes site web réutilisables)

Carnet de bord transverse d'Allan (méthode + recettes apprises sur d'autres sites) :
`C:\Users\allan\Projects\PILOTE - Kit Site Web\`. Points d'entrée : son `README.md`
+ `CHECKLISTS.md`.

**Réflexe** : dès qu'on touche à l'un de ces sujets, ouvrir le fichier du kit
correspondant AVANT d'agir (ne pas réinventer ce qui y est déjà résolu) :

- **Contenu IA** (visuels/vidéos produit ; règle d'or « ne jamais cuire le texte de
  marque dans une génération IA ») → `02-CONTENU-IA/`
- **ffmpeg** (ré-encodage, vidéo qui défile au scroll = all-intra, posters) →
  `02-CONTENU-IA/recettes-ffmpeg.md`
- **Animations scroll** (scroll-stack, pin sticky, `prefers-reduced-motion`) →
  `03-DESIGN-ANIMATION/recettes-scroll.md`
- **Déploiement / preview** (Netlify, validation sur mobile réel) →
  `04-DEPLOIEMENT-PREVIEW/`
- **Handoff** (livraison à un dév/client, repo 0 trace IA) → `05-HANDOFF/`

Le kit est une **référence en lecture** (modèle A) : on copie/adapte ses recettes
ici, on ne code pas dedans. Trace de session au format kit : `docs/ETAT.md` +
`docs/JOURNAL.md` (en miroir de `HISTORIQUE.md`).

## Contrainte d'environnement critique

`E:\Git` est le **répertoire d'installation de Git pour Windows**, PAS un projet —
ne jamais y faire `git init` ni y écrire quoi que ce soit. **Ce projet vit sous
`C:\Users\allan\Projects\Clients\atelier-acidule`** (Windows natif).
