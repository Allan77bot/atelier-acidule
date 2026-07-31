# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du projet

Site vitrine du client **Atelier Acidulé** (crochet fait à la demande). Phase
**mise en production démarrée** : projet **Astro scaffoldé à la main** d'après
le brief validé. Pages livrées : accueil (**page vitrine longue « DA maquettes »**,
scroll classique : hero texte+CTA+visuel, bandeau valeurs, collection, avis, CTA —
calquée sur `Ref/_preview/AtelierAcidule_ref.jpeg`), mes créations (**expérience
immersive split-screen**, refonte type SANDQVIST — l'ancien accueil), éditions
spéciales (galerie), atelier/contact, commander (formulaire on-site placeholder,
paiement plus tard ; présélectionne le modèle via `?modele=<slug>`).
⚠️ La page **personnaliser** (configurateur) a été **retirée** le 2026-07-15 —
voir « Configurateur retiré » plus bas.

**Refonte DA vitrine (branche `feat/refonte-accueil`, commitée le 2026-07-03,
`848a8f5`)** : l'accueil **quitte** l'ancienne home « split éditorial » Immersif pour
une **vitrine longue** en nouvelle DA (police **Archivo** + Nunito, fonds pleins par
section, réf. maquettes `Ref/_preview`). `atelier`/`commander`/`editions-speciales`
passent en layout **`PageVoeu`** (header vert sombre). Le split-screen GSAP, lui,
**reste** à `/mes-creations` (Immersif). ⚠️ `main` est resté à l'**état initial**
(`6bed75d`, avant même la refonte split-screen) : rien n'y est mergé.

**Lot mobile (branche `fix/mobile`, commit `1620ec3`, déployé en prod le
2026-07-04)** : split-screen rendu vraiment responsive (<760 px : hauteurs des
panneaux animées par GSAP, swipe tactile, contrôles compacts — détail dans la
section split-screen) + **photos passées en WebP** (`_webp_mobile.cjs`, home
~9,7 Mo → ~0,6 Mo). ⚠️ Branche locale **non poussée** sur GitHub (seules
`main` et `feat/refonte-accueil` sont sur le remote).

**Retrait de la personnalisation (branche `feat/retrait-personnalisation`,
2026-07-15)** : la page `/personnaliser` et `Configurateur.astro` sont
**supprimés** (rendu jugé trop laid — Allan voulait déjà le refaire autrement).
Tous les CTA qui y menaient pointent vers **`/commander`**, qui présélectionne
le modèle via `?modele=<slug>`. Le code mort résultant (`Base.astro`, `Nav`,
`Footer`, `CarteModele`) a été supprimé dans la foulée (confirmation d'Alphim).
Fichiers récupérables dans l'historique git ; pistes de remplacement = les
branches configurateur 2.5d/3d ci-dessous.

**Vitrine mobile (branche `feat/mobile-vitrine`, 2026-07-15)** : refonte du
responsive de `index.astro` (DA inchangée) — hero réordonné en zones
`hero__head`/`hero__body` (titre → visuel **avec l'arche** → CTA au-dessus de la
ligne de flottaison), CTA « Commander » **permanent** dans le header mobile,
collection en **carrousel scroll-snap plein-bleed** ≤ 700 px (gouttière = var
`--px`), avis sans flèches mobiles + **points indicateurs** (`data-avis-dots`),
`:focus-visible` global dans `Vitrine.astro`, input newsletter 16 px
(anti-zoom iOS).

**Branches expérimentales** (non mergées, non poussées) :
`feat/configurateur-3d` (scaffold Three.js du configurateur) et
`feat/configurateur-2.5d` (moteur « Smart 2D » : plane + shader masque RGB +
normal map) — pistes de remplacement du configurateur PNG, en pause.
`feat/refonte-split-screen` = ancienne branche de travail, dépassée.

**Dépôt distant & mise en ligne (état 2026-07-04)** : GitHub
`AmarokRa/atelier-acidule` — **privé** (les assets cliente `Ref/` ne sont plus
exposés, mais restent dans l'historique git). Branche par défaut =
`feat/refonte-accueil`. Collaborateur : Allan (`Allan77bot`, admin — invitation
en attente d'acceptation). Site en ligne sur **Netlify** :
<https://atelier-acidule-498.netlify.app>, la prod reflète le build de
`fix/mobile` (2026-07-04), déployé **manuellement** via
`netlify deploy --prod --dir=dist` — **pas de CI git connectée** (pousser ne
déploie rien ; déployer = builder puis lancer cette commande, avec accord).

Le site n'a plus qu'**un bloc interactif majeur**, documenté ci-dessous : le
**split-screen** (`src/layouts/Immersif.astro` + `src/pages/mes-creations.astro`).
(Le **Configurateur** de `/personnaliser`, l'ancien second bloc, a été retiré.)

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
**Pas de lint/format non plus** (aucun ESLint/Prettier configuré) : `npm run
check` (`astro check`) est le **seul** contrôle statique — c'est lui qu'on lance
pour « prouver » avant d'affirmer.

⚠️ **Gotcha dev WSL** : `astro dev` met `public/` en cache au démarrage. Après
avoir ajouté/régénéré un asset (`accueil-*.webp`, `sim-*.png`…), **redémarrer** le
serveur sinon l'image reste introuvable. Tuer le process avec
`pkill -f "astro.js dev"` (et **pas** `"astro dev"`, qui ne matche pas le node).
Le FS `/mnt/e` (WSL) est lent : builds et `npm install` prennent leur temps.

Dépendances runtime : **`gsap`** (anime le split-screen de `/mes-creations`) et **`lenis`**
(smooth-scroll, prévu mais pas encore branché — voir commentaire dans `Immersif.astro`).

### Arborescence code

- `src/pages/` — une page par route (`index`, `mes-creations`, `editions-speciales`, `atelier`, `commander`). **3 layouts actifs** selon la page (voir plus bas). `index.astro` = la **vitrine longue** de l'accueil (nouvelle DA maquettes) : header + footer **inline** dans la page (pas les composants `Nav`/`Footer`) + CSS + **3 `<script>`** (burger, carrousel d'avis, reveal au scroll). `mes-creations.astro` = l'expérience split-screen GSAP (markup + CSS + script GSAP en un seul fichier) — c'est l'**ancien** accueil.
- **Qui utilise quel layout** : `index` → `Vitrine` (header/footer inline propres) · `atelier`/`commander`/`editions-speciales` → `PageVoeu` · `mes-creations` → `Immersif`.
- (`Base.astro` — l'ancien squelette « classique » — a été **supprimé** avec `Nav`/`Footer`/`CarteModele` : code mort depuis le retrait de `personnaliser`. Récupérables via git.)
- `src/layouts/Vitrine.astro` — **coquille des pages « vitrine » longues** (nouvelle DA maquettes) : `<head>` + polices **Archivo** (display, capitales) + **Nunito Sans**, `class="vitrine"` sur `<body>` (désactive la mosaïque, définit sa propre palette `--v-*` olive/jaune/crème). Ne fournit **ni Nav ni Footer** : chaque page rend les siens pour coller pixel-près à sa maquette. Expose des **primitives partagées** (`.display`, `.eyebrow`, `.btn-pill--jaune/ghost/sombre`, `.reveal`). Utilisé directement par `index`, et **enveloppé par `PageVoeu`**.
- `src/layouts/PageVoeu.astro` — layout des pages de contenu « DA voeu » (réf. `Ref/_preview/AtelierAcidule_voeu.jpeg`) : **enveloppe `Vitrine`** et y ajoute un **header vert sombre sticky** (logo + nav + burger + tiroir) et un **footer** communs, plus le `<script>` burger/scroll/reveal. Les pages ne fournissent que leurs `<section>`. Utilisé par `atelier`, `commander`, `editions-speciales`.
- `src/layouts/Immersif.astro` — coquille **plein écran sans scroll** (header minimal fixe `wordmark` + burger + tiroir menu, `overflow:hidden`, pas de mosaïque). Polices Playfair/Fraunces/Nunito (l'ancienne DA). **N'est plus utilisé que par `mes-creations` (split-screen).** C'est là qu'on branchera le loader d'intro + Lenis.
- `src/components/` — il ne reste que `Logo` (composant de marque, orphelin gardé exprès) et `IntroAnim` (intro animée scrollée : logo → citron coupé → jus → wordmark tricoté ; scroll-driven, RAF + lerp ; brief `briefs/intro-citron-scroll.md` ; orphelin gardé pour le futur loader d'intro — c'est lui qui porte les **57 erreurs `astro check` préexistantes**). `Nav`/`Footer`/`CarteModele`/`Configurateur` ont été **supprimés**.
- `src/data/modeles.ts` — catalogue (`Modele[]` : slug, nom, baseline, description, prix, anse, photo, personnalisable, **`couleur`** = couleur de fond du panneau dans le split-screen). Export dérivé `modelesPerso` = `modeles.filter(m => m.personnalisable)` — alimente désormais le **`<select>` du formulaire `commander`**. Les 4 modèles (dont éditions-spéciales) alimentent `/mes-creations`.
- `src/styles/global.css` — tokens couleur/typo + utilitaires ; `:root` définit toute la palette (`--creme`, `--sapin`, `--citron`, `--terracotta`…) et le fond décoratif mosaïque via `body::before`.
- `public/images/` — assets de prod. Depuis le lot `fix/mobile`, les **photos
  sont servies en WebP** (générées par `_webp_mobile.cjs` ; les `.png` d'origine
  restent à côté sur le disque mais ne sont **plus référencés** — sauf `logo.png`,
  recompressé, et les calques `sim-*`). **Trois familles d'images de sacs à ne
  pas confondre** :
  - **photos détourées** `<slug>.webp` (`petit-sac`, `pochette-livres`,
    `grand-sac`, `edition-speciale`) — fond transparent, pour cartes /
    éditions / autres pages (chemins déclarés dans `modeles.ts`).
  - **photos « accueil »** `accueil-<slug>.webp` — fond recolorisé = couleur du
    panneau, chargées par le split-screen `/mes-creations` (`src={/images/accueil-${m.slug}.webp}`).
    ⚠️ Nom = **slug exact** : `accueil-editions-speciales.webp` (pluriel), **≠** la
    base `edition-speciale.webp` (singulier). C'est le seul cas où les deux familles
    divergent — un mauvais nom = sac invisible sans erreur de build.
    ⚠️ Ces `accueil-<slug>.webp` **ne servent plus** à l'accueil depuis la refonte DA :
    la nouvelle vitrine `/index` affiche `hero-crochet.webp` (visuel du hero) + les 4
    photos **détourées** en collection ; la page atelier utilise `about-atelier.webp`.
    Les `accueil-<slug>.webp` restent chargés par le split-screen `/mes-creations`.
    (L'ancienne home Immersif utilisait `accueil-hero.png` + `accueil-mini-1/2/3.png` :
    **obsolètes**, plus référencés.)
  - Plus `logo.png`, `mosaique-citron.jpg` (copiés/renommés depuis `Ref/PhotoClient`).
    (Les calques `sim-*` du Configurateur ont été **supprimés** avec lui —
    récupérables dans l'historique git, régénérables via les scripts `_*.cjs`.)

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
- **La page de personnalisation était la feature centrale** du cadrage (sac
  recolorable au clic, jusqu'à 3 couleurs, réalisée en PNG masque + dégradé CSS).
  Elle a été **retirée le 2026-07-15** (rendu jugé trop laid). L'intention produit
  reste : la personnalisation passe par le **formulaire de commande** (choix
  modèle/couleurs/anse), et un configurateur mieux fait pourra revenir
  (branches `feat/configurateur-2.5d` / `feat/configurateur-3d`).

## Architecture du split-screen (`/mes-creations`)

> `src/pages/mes-creations.astro` (+ `src/layouts/Immersif.astro`) — à lire en entier
> avant d'y toucher. Refonte type SANDQVIST. C'est le **seul bloc interactif** restant.
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
  `/commander?modele=<slug>` (le formulaire présélectionne le modèle).
- **Responsive / mobile (lot `fix/mobile`)** : sous 760 px le split passe
  **horizontal** (couleur en haut, blanc en bas). ⚠️ Les styles inline posés par
  GSAP **écrasent le CSS mobile** : sous 760 px, `ouvrirDetail()`/`fermerDetail()`
  animent aussi les **hauteurs** des panneaux (avec `clearProps` à la fermeture,
  et reset propre au changement de breakpoint) — ne pas « corriger » ça en CSS
  seul. **Swipe vertical tactile** (pointerdown/up) = équivalent molette ;
  `touch-action` posé en conséquence. Contrôles compactés et fiche scrollable
  si trop haute.

## Configurateur retiré (2026-07-15)

L'ancienne « feature centrale » (`/personnaliser` + `Configurateur.astro` :
sac recolorable en PNG masque + dégradé CSS, jusqu'à 3 couleurs) a été
**supprimée** sur la branche `feat/retrait-personnalisation` — rendu jugé trop
laid ; Allan voulait déjà le refaire autrement. À savoir :

- **Récupération** : page, composant et calques `sim-*.png` sont dans
  l'historique git (dernier état complet = commit `2aa510f` et avant).
- **Remplacement pressenti** : branches `feat/configurateur-2.5d` (shader
  « Smart 2D ») et `feat/configurateur-3d` (Three.js), non mergées.
- **Le flux utilisateur** passe par `/commander` : le formulaire liste les
  modèles `modelesPerso` et présélectionne via `?modele=<slug>` (petit script
  en bas de `commander.astro`). Tous les anciens CTA « Personnaliser » ont été
  re-routés vers `/commander` (hero de l'accueil, cartes collection, fiche du
  split-screen, page atelier, navs et footers).
- Ne pas réintroduire de lien vers `/personnaliser` : la route n'existe plus.

## Contenu actuel

- `HISTORIQUE.md` — suivi de session (existe ; voir « Trace de session »). `CLAUDE.md` — ce fichier.
- ⚠️ `README.md` est **périmé** : il décrit l'ancien accueil (`index` = « hero + modèles + bloc perso ») et un configurateur « **sac SVG** recolorable ». Les deux sont faux aujourd'hui (accueil = vitrine longue nouvelle DA, configurateur en PNG masque + dégradé). En cas de contradiction, **ce `CLAUDE.md` fait foi**, pas le README (à réécrire un jour).
- `CONTEXTE-PROJET.md` — **document autonome** (quoi/pourquoi/comment du projet) à
  donner à une IA ou un nouveau collaborateur **sans le code sous les yeux**. Résume
  produit, modèle éco, identité ; complète `CLAUDE.md` (archi vivante) et `HISTORIQUE.md` (journal).
- `AUDIT_ACIDULE_ETAT.md` — **audit lecture seule du 2026-07-04** (état du site,
  construction, méthode, outils — chaque constat référencé `fichier:ligne`).
  Photo fiable de l'état à cette date, à recouper avec `HISTORIQUE.md` pour le présent.
- `audit-projet/` — sources du skill `audit-projet` (SKILL.md + exemple), pas du code du site.
- **Scripts racine `_*.cjs`** (`_assets.cjs`, `_crop.cjs`, `_prod_assets.cjs`,
  `_recolor_test.cjs`, `_webp_mobile.cjs` — ce dernier = conversion WebP des
  photos de prod…) — helpers **jetables** de génération/retouche des assets
  (dont les couples `sim-*` de l'ex-Configurateur). Hors build Astro, pas des
  modules du site. Ils `require("sharp")` : `sharp` n'est **pas** déclaré dans
  `package.json`, il n'est présent que **transitivement** (dépendance interne
  d'Astro). Lancer avec `node _prod_assets.cjs` ; si `sharp` manque après un
  réinstall, l'ajouter explicitement (`npm i -D sharp`).
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
- **Git** : le projet **est un dépôt git** (dernier travail en cours sur la
  branche `fix/mobile`). `main` reste stable, jamais coder directement dessus ;
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
