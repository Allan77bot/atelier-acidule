# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du projet

Site vitrine du client **Atelier Acidulé** (crochet fait à la demande). Phase
**mise en production démarrée** : projet **Astro scaffoldé à la main** d'après
le brief validé. Pages livrées : accueil (**home « split éditorial »** : accroche +
CTA à gauche, photo studio héros à droite), mes créations (**expérience immersive
split-screen**, refonte type SANDQVIST — l'ancien accueil), personnaliser
(configurateur PNG masque + dégradé recolorable), éditions spéciales (galerie),
atelier/contact, commander (formulaire on-site placeholder, paiement plus tard).

Le site a donc **deux blocs interactifs majeurs**, chacun documenté ci-dessous :
le **split-screen** (`src/layouts/Immersif.astro` + `src/pages/mes-creations.astro`)
et le **Configurateur** (`src/components/Configurateur.astro`).

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

⚠️ **Gotcha dev WSL** : `astro dev` met `public/` en cache au démarrage. Après
avoir ajouté/régénéré un asset (`accueil-*.png`, `sim-*.png`…), **redémarrer** le
serveur sinon l'image reste introuvable. Tuer le process avec
`pkill -f "astro.js dev"` (et **pas** `"astro dev"`, qui ne matche pas le node).
Le FS `/mnt/e` (WSL) est lent : builds et `npm install` prennent leur temps.

Dépendances runtime : **`gsap`** (anime le split-screen de `/mes-creations`) et **`lenis`**
(smooth-scroll, prévu mais pas encore branché — voir commentaire dans `Immersif.astro`).

### Arborescence code

- `src/pages/` — une page par route (`index`, `mes-creations`, `personnaliser`, `editions-speciales`, `atelier`, `commander`). `index.astro` = la home « split éditorial » (accroche + CTA à gauche, photo héros à droite ; markup + CSS en un fichier, **pas** de script). `mes-creations.astro` = l'expérience split-screen GSAP (markup + CSS + script GSAP en un seul fichier) — c'est l'**ancien** accueil.
- `src/layouts/Base.astro` — squelette HTML « classique » + polices Google Fonts (Playfair/Fraunces/Nunito) + `Nav`/`Footer` ; prend `titre` et `description` en props. Utilisé par toutes les pages **sauf** `index` et `mes-creations`.
- `src/layouts/Immersif.astro` — coquille **plein écran sans scroll** (header minimal fixe `wordmark` + burger + tiroir menu, `overflow:hidden`, pas de mosaïque). Mêmes polices que `Base`. Utilisé par **`index` (home éditoriale) ET `mes-creations` (split-screen)**. C'est là qu'on branchera le loader d'intro + Lenis.
- `src/components/` — `Logo`, `Nav`, `Footer`, `CarteModele`, `Configurateur`, `IntroAnim` (intro animée scrollée : logo → citron coupé → jus → wordmark tricoté ; scroll-driven, RAF + lerp ; brief `briefs/intro-citron-scroll.md`).
- `src/data/modeles.ts` — catalogue (`Modele[]` : slug, nom, baseline, description, prix, anse, photo, personnalisable, **`couleur`** = couleur de fond du panneau dans le split-screen). Export dérivé `modelesPerso` = `modeles.filter(m => m.personnalisable)`, **source de vérité** des modèles recolorables (utilisé par le Configurateur). Les 4 modèles (dont éditions-spéciales) alimentent `/mes-creations` ; les 3 `personnalisable` alimentent le Configurateur.
- `src/styles/global.css` — tokens couleur/typo + utilitaires ; `:root` définit toute la palette (`--creme`, `--sapin`, `--citron`, `--terracotta`…) et le fond décoratif mosaïque via `body::before`.
- `public/images/` — assets de prod, **trois familles d'images de sacs à ne pas confondre** :
  - **photos détourées** `<slug>.png` (`petit-sac.png`, `pochette-livres.png`,
    `grand-sac.png`, `edition-speciale.png`) — fond transparent, pour cartes /
    éditions / autres pages.
  - **photos « accueil »** `accueil-<slug>.png` — fond recolorisé = couleur du
    panneau, chargées par le split-screen `/mes-creations` (`src={/images/accueil-${m.slug}.png}`).
    ⚠️ Nom = **slug exact** : `accueil-editions-speciales.png` (pluriel), **≠** la
    base `edition-speciale.png` (singulier). C'est le seul cas où les deux familles
    divergent — un mauvais nom = sac invisible sans erreur de build.
    À part : la home `/index` utilise ses propres visuels **hors familles** —
    `accueil-hero.png` (photo studio héros, colonne droite) et `accueil-mini-1/2/3.png`
    (vignettes de la mini-galerie « + de créations »).
  - **calques recolorables du Configurateur** : par modèle perso, un couple
    `sim-<slug>-tex.png` (texture maille) + `sim-<slug>-mask.png` (silhouette qui
    masque la couleur). `sim-<slug>.png` = aperçu composite.
  - Plus `logo.png`, `mosaique-citron.jpg` (copiés/renommés depuis `Ref/PhotoClient`).

## Vision produit validée (big picture)

> Détail complet et durable : mémoire `atelieracidule-site-brief` + `HISTORIQUE.md`.

- **Stack cible : Astro** (vitrine premium, îlots interactifs là où il faut).
  **Commerce hybride** : vitrine d'abord, **paiement branché plus tard** ; la
  commande reste **sur le site**, FAQ/contact → DM Instagram.
- **Identité** : Italie / Méditerranée, citron **acidulé** + registre **sucré-doux**.
  Palette **vert sauge/sapin + jaune citron + terracotta** sur fond **crème**.
  Typos : **Playfair Display** (italien, wordmark/CTA) + **Fraunces** (titres) +
  **Nunito Sans** (corps). Fond décoratif = mosaïque citron faible opacité.
- **4 modèles** : petit sac (anses laiton), grand sac/bandoulière (franges laine),
  pochette à livres (fermeture nouée), **éditions spéciales** (page à part, pas de
  configurateur — la cliente compose).
- **Feature centrale = page de personnalisation** (façon dribbble color-transitions) :
  sac **vectoriel recolorable au clic, jusqu'à 3 couleurs**, citrons-couleurs,
  conseils de mariage. Pour les 3 modèles personnalisables. La cible « couleurs
  illimitées » est **réalisée en PNG masque + dégradé CSS** (et non en SVG comme
  envisagé au cadrage) ; les fiches/cartes affichent les **vraies photos**.

## Architecture du split-screen (`/mes-creations`)

> `src/pages/mes-creations.astro` (+ `src/layouts/Immersif.astro`) — à lire en entier
> avant d'y toucher. Refonte type SANDQVIST. C'est le **deuxième bloc interactif**.
> (C'était l'ancien accueil ; la home `/index` est désormais une simple page éditoriale.)

- **Deux états, une seule scène** : `<section data-scene data-mode>` bascule entre
  `mode="hero"` (le sélecteur de modèle) et `mode="detail"` (la fiche produit). Le
  `data-mode` pilote des variantes CSS (la nav modèles disparaît en détail, etc.).
- **Mise en page** : deux panneaux absolus (`.panel--left` blanc, `.panel--right`
  couleur), un `.stage` central qui empile les 4 photos de sacs (`.bag`, une seule
  visible via `hidden`), les titres état 1 (`.titles`), la fiche état 2 (`.detail`),
  et la barre de contrôle (`.controls` : flèches ↑↓ + compteur + bouton Découvrir/Retour).
- **Couleur du panneau** = `--c` sur la scène, posée depuis `m.couleur`. Le changement
  de modèle fait un **balayage vertical** (`.wipe`) de l'ancienne vers la nouvelle couleur.
- **Animations = GSAP** (`import gsap from 'gsap'` dans le `<script>`), pas de CSS
  scroll-driven ici (à ne pas confondre avec `IntroAnim`). Fonctions clés : `allerVers(dir)`
  (change de modèle : wipe couleur + fondu/zoom du sac + `maskSwap` des textes),
  `ouvrirDetail()` / `fermerDetail()` (élargit le panneau gauche à 40 %, révèle la fiche
  en stagger). Garde-fous : `busy` (verrou pendant une transition) et `wheelLock` (anti-spam molette).
- **Navigation** : molette, flèches ↑↓, clavier (↑↓ pour changer/fermer, Entrée pour
  ouvrir, Échap pour fermer). `prefers-reduced-motion` → multiplicateur de durée `D ≈ 0` (quasi instantané).
- **Couplage data ↔ script** : les modèles sont injectés en JSON via
  `<script type="application/json" data-models set:html={JSON.stringify(modeles)}>` et
  relus côté client — **pas** de modèles codés en double. Le CTA fiche pointe vers
  `/personnaliser?modele=<slug>` (entrée du Configurateur).
- **Responsive** : sous 760 px le split passe **horizontal** (couleur en haut, blanc en bas).

## Architecture du Configurateur (la feature centrale)

> `src/components/Configurateur.astro` — à lire en entier avant d'y toucher.
> Avec le split-screen de `/mes-creations`, c'est l'un des deux blocs vraiment interactifs du site.

- **Pas d'îlot Astro hydraté** : l'interactivité est un `<script>` inline classique
  (bundlé par Astro), sans directive `client:*` ni framework UI. Toute la logique
  vit dans ce script ; pas de state partagé entre composants.
- **Le sac n'est pas un SVG mais 2 calques PNG** : chaque modèle est un
  `<div class="sim" data-bag="<slug>">` qui empile deux images —
  `.sim__color` (la couleur) et `.sim__tex` (la texture maille). Un seul `.sim` est
  visible à la fois (`hidden` sur les autres). La recoloration se fait en CSS :
  `.sim__color` reçoit un `linear-gradient` (prop `--bands`) **masqué** par la
  silhouette `sim-<slug>-mask.png` (prop `--m`, `mask-mode: alpha`), et
  `.sim__tex` = `sim-<slug>-tex.png` posé par-dessus en `mix-blend-mode: multiply`
  pour le grain du crochet. Couleurs **illimitées** (c'est un dégradé, pas une forme).
- **Peinture** : `bandsCss(cols)` construit le dégradé — 1 fil = aplat uni,
  2-3 fils = **bandes horizontales nettes** (segments à `100/n %`). `peindre()` pose
  ce dégradé en `--bands` sur tous les `.sim`. (Pas de `ROWS`, pas de `<rect>`,
  pas de `<pattern>`, pas de `clipPath` : ces noms n'existent plus.)
- **État** : `palette: string[]` (1 à 3 hex, `MAX = 3`, défaut `['#f4cf3f','#8fa06a']`).
  Clic sur un citron = `ajouter(hex)` (toggle : ajoute si <3, retire si déjà présent
  en gardant ≥1 fil). `rendrePalette()` re-synchronise compteur, pastilles
  `[data-palette]`, état `.choisi` des citrons, attribut `data-plein`, puis rappelle
  `peindre()`.
- **Conseils de mariage** : remplacent toute la palette par un trio prédéfini.
- **Couplage data ↔ UI** : les vignettes de sélection ET les `.sim` sont générés
  depuis `modelesPerso` (via `apercus = modelesPerso.map(...)` en frontmatter). Mais
  les **assets PNG** des sacs sont codés en dur côté fichiers. Ajouter un modèle
  recolorable = (a) `modeles.ts` avec `personnalisable: true`, **et** (b) générer ses
  deux assets `public/images/sim-<slug>-tex.png` + `sim-<slug>-mask.png` (via les
  scripts de recoloration `_*.cjs` à la racine) — **pas** d'ajout de `<svg>`.
- **Lien entrant** : la page `personnaliser` (et les CTA des cartes) peuvent passer
  `?modele=<slug>` ; le script lit ce paramètre au démarrage pour préselectionner.

## Contenu actuel

- `HISTORIQUE.md` — suivi de session (existe ; voir « Trace de session »). `CLAUDE.md` — ce fichier.
- `CONTEXTE-PROJET.md` — **document autonome** (quoi/pourquoi/comment du projet) à
  donner à une IA ou un nouveau collaborateur **sans le code sous les yeux**. Résume
  produit, modèle éco, identité ; complète `CLAUDE.md` (archi vivante) et `HISTORIQUE.md` (journal).
- **Scripts racine `_*.cjs`** (`_assets.cjs`, `_crop.cjs`, `_prod_assets.cjs`,
  `_recolor_test.cjs`…) — helpers **jetables** de génération/retouche des assets
  (notamment les couples `sim-*` du Configurateur). Hors build Astro, pas des
  modules du site.
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

## Contrainte d'environnement critique

`E:\Git` est le **répertoire d'installation de Git pour Windows**, PAS un projet.
Ne jamais y faire `git init`, ni y écrire ou modifier quoi que ce soit. Les vrais
projets vivent sous `E:\Claude\Claude_Code\Projet_Pro\` — ce projet est
`AtelierAciduler`.
