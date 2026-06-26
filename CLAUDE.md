# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du projet

Site vitrine du client **Atelier Acidulé** (crochet fait à la demande). Phase
**mise en production démarrée** : projet **Astro scaffoldé à la main** d'après
le brief validé. Pages livrées : accueil, personnaliser (configurateur SVG
recolorable), éditions spéciales (galerie), atelier/contact, commander
(formulaire on-site placeholder, paiement plus tard).

### Commandes

```bash
npm install        # installe les dépendances (Astro 5)
npm run dev        # serveur de dev (http://localhost:4321)
npm run build      # build de production -> dist/ (déjà présent)
npm run preview    # sert le build de prod
npm run check      # vérif types/diagnostics Astro (astro check)
```

Pas encore de tests unitaires : aucun framework de test installé. Quand on en
ajoutera (Vitest pressenti), documenter ici comment lancer un seul test.

### Arborescence code

- `src/pages/` — une page par route (`index`, `personnaliser`, `editions-speciales`, `atelier`, `commander`).
- `src/layouts/Base.astro` — squelette HTML + polices Google Fonts (Playfair/Fraunces/Nunito) + `Nav`/`Footer` ; prend `titre` et `description` en props.
- `src/components/` — `Logo`, `Nav`, `Footer`, `CarteModele`, `Configurateur`, `IntroAnim` (intro animée scrollée : logo → citron coupé → jus → wordmark tricoté ; scroll-driven, RAF + lerp ; brief `briefs/intro-citron-scroll.md`).
- `src/data/modeles.ts` — catalogue (`Modele[]` : slug, nom, baseline, description, prix, anse, photo, personnalisable). Export dérivé `modelesPerso` = `modeles.filter(m => m.personnalisable)`, **source de vérité** des modèles recolorables (utilisé par le Configurateur).
- `src/styles/global.css` — tokens couleur/typo + utilitaires ; `:root` définit toute la palette (`--creme`, `--sapin`, `--citron`, `--terracotta`…) et le fond décoratif mosaïque via `body::before`.
- `public/images/` — assets de prod : `logo.png`, `mosaique-citron.jpg`,
  `petit-sac.png`, `pochette-livres.png`, `grand-sac.png`, `edition-speciale.png`
  (copiés/renommés depuis `Ref/PhotoClient`). Plus les **calques recolorables du
  Configurateur** : pour chaque modèle perso, un couple `sim-<slug>-tex.png`
  (texture maille) + `sim-<slug>-mask.png` (silhouette qui masque la couleur).

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

## Architecture du Configurateur (la feature centrale)

> `src/components/Configurateur.astro` — à lire en entier avant d'y toucher. C'est
> le seul bloc vraiment interactif du site.

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
- **Git** : ⚠️ le projet **n'est pas encore un dépôt git** (`.git` absent) — le
  workflow ci-dessous s'applique une fois `git init` fait (skill `github-init`
  dispo). `main` reste stable, jamais coder directement dessus ; une préoccupation
  = une branche (`feat/`, `fix/`, `chore/`, `docs/`) = une PR. **Jamais push /
  déployer / ouvrir une PR sans accord explicite.** Jamais supprimer de fichiers
  sans confirmation. Jamais commiter de secret.
- **Communication** : français, direct, on explique le *pourquoi* ; niveau
  débutant respecté (on lit le code pour l'utilisateur, pas de dump brut).

## Contrainte d'environnement critique

`E:\Git` est le **répertoire d'installation de Git pour Windows**, PAS un projet.
Ne jamais y faire `git init`, ni y écrire ou modifier quoi que ce soit. Les vrais
projets vivent sous `E:\Claude\Claude_Code\Projet_Pro\` — ce projet est
`AtelierAciduler`.
