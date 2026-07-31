# AUDIT — Atelier Acidulé · état du site, construction, méthodologie & outils

> Audit en lecture seule réalisé le 2026-07-04 sur la branche `feat/refonte-accueil`.
> Destinataire : une instance Claude Code (ou un développeur) qui doit comprendre
> **comment le site est construit, avec quelle méthode et quels outils**, pour
> reprendre ou poursuivre le travail. Chaque constat référence `fichier:ligne`.

---

## 1. Synthèse

Site vitrine **Astro 5** (statique, zéro framework UI) pour Atelier Acidulé,
créatrice de sacs au crochet sur commande. **6 pages livrées et buildables**,
dont deux blocs interactifs majeurs : un **split-screen animé GSAP**
(`/mes-creations`) et un **configurateur de couleurs** en PNG masqué + dégradé
CSS (`/personnaliser`). Refonte de direction artistique **commitée** le
2026-07-03 (`848a8f5`) : accueil « vitrine longue » (Archivo/Nunito) — mais
**pas mergée dans `main`**, qui garde l'ancienne version. Le site est en ligne
(Netlify, déploiement manuel CLI). Tout le contenu est **codé en dur** (pas de
CMS) ; le formulaire de commande est un **placeholder qui n'envoie rien**
(`src/pages/commander.astro:74-78`). Méthodologie très documentée (CLAUDE.md +
HISTORIQUE.md + CONTEXTE-PROJET.md), projet mené en « vibe coding » avec Claude
Code. Risque de reprise : **faible** — la doc interne est fiable et le code
localisé ; les points durs sont le poids des images (~24 Mo) et les 235 Mo
d'assets client versionnés.

## 2. Cartographie

### Stack & outillage (les outils de construction)

| Outil | Preuve | Rôle |
|---|---|---|
| **Astro ^5.7.0** | `package.json:13` | Générateur statique ; pages `.astro`, aucun îlot hydraté (`client:*` absent du code) |
| **GSAP ^3.15.0** | `package.json:14`, importé une seule fois `src/pages/mes-creations.astro:268` | Animations du split-screen |
| **Lenis ^1.3.25** | `package.json:15` | Smooth-scroll — **installé mais jamais branché** (`src/layouts/Immersif.astro:4`, commentaire d'intention) |
| **TypeScript** | `tsconfig.json`, scripts `<script>` typés (ex. `mes-creations.astro:275`) | Typage léger, vérifié par `astro check` |
| **sharp** (transitif) | `_prod_assets.cjs:1` (`require("sharp")`) — absent de `package.json` | Génération des assets (voir plus bas) |
| **rembg** (externe, modèle `isnet-general-use`) | `HISTORIQUE.md` (session 06-27) | Détourage des photos produit |
| **Netlify CLI** | `HISTORIQUE.md` (état 2026-07-03) ; `.netlify` ignoré `.gitignore:20` | Mise en ligne manuelle `netlify deploy --prod --dir=dist` |

Commandes : `npm run dev / build / preview / check` (`package.json:6-11`).
**Aucun test, aucun lint/format** : `astro check` est le seul contrôle statique.
Pas de CI (`.github/` absent). Config Astro minimale : site cible
`https://atelier-acidule.fr`, devToolbar désactivée (`astro.config.mjs:5-8`).

### Pages ↔ layouts (la construction du site)

| Route | Fichier (lignes) | Layout | Rôle |
|---|---|---|---|
| `/` | `src/pages/index.astro` (508) | `Vitrine` | Accueil vitrine longue nouvelle DA : hero, valeurs, collection, à-propos, avis, CTA. Header/footer **inline** dans la page |
| `/mes-creations` | `src/pages/mes-creations.astro` (429) | `Immersif` | ⭐ Split-screen GSAP (ancien accueil) |
| `/personnaliser` | `src/pages/personnaliser.astro` (29) | `Base` | Monte le ⭐ Configurateur (`personnaliser.astro:21`) |
| `/editions-speciales`, `/atelier`, `/commander` | 67 / 61 / 79 lignes | `PageVoeu` | Pages de contenu « DA voeu » (header vert sombre) |

**4 layouts en couches** :
- `Vitrine.astro` (87 l.) — coquille de la nouvelle DA : polices **Archivo +
  Nunito Sans** (`Vitrine.astro:32`), primitives partagées `.display`,
  `.eyebrow`, `.btn-pill` (`Vitrine.astro:60-74`). Ni Nav ni Footer : chaque
  page rend les siens pour coller aux maquettes `Ref/_preview`.
- `PageVoeu.astro` (134 l.) — **enveloppe `Vitrine`** et ajoute header sticky
  vert sombre + footer + script burger/reveal (`PageVoeu.astro:110`).
- `Immersif.astro` (165 l.) — plein écran sans scroll pour le split-screen ;
  polices Playfair/Fraunces/Nunito (`Immersif.astro:37`).
- `Base.astro` (41 l.) — ancienne coquille avec composants `<Nav/>`/`<Footer/>`
  (`Base.astro:35,39`) ; **ne sert plus qu'à `/personnaliser`**.

### Données

`src/data/modeles.ts` (69 l.) — **source de vérité unique** du catalogue :
interface `Modele` (`modeles.ts:4-15`, dont `couleur` = fond du panneau
split-screen, l.14), 4 modèles, dérivé `modelesPerso` (les personnalisables)
consommé par le Configurateur. Prix : 35-45 € (réf. `Ref/PhotoClient/VintedPrice.png`).

### Composants orphelins (code mort)

- `src/components/IntroAnim.astro` (471 l., script `l.290`) — intro animée
  scrollée (brief `briefs/intro-citron-scroll.md`) : **importée nulle part**.
- `src/components/CarteModele.astro` (113 l.) — **importé nulle part**.
- `Nav.astro`/`Footer.astro`/`Logo.astro` ne vivent plus que via `Base` (donc
  une seule page).

### Assets (`public/images/`, 24 Mo — 3 familles à ne pas confondre)

1. **Photos détourées** `<slug>.png` (fond transparent) — cartes/galeries.
2. **Photos « accueil »** `accueil-<slug>.png` (fond recolorisé) — chargées
   **uniquement** par le split-screen (`mes-creations.astro`, `src=/images/accueil-${m.slug}.png`).
   ⚠️ piège de nommage : `accueil-editions-speciales.png` (pluriel) ≠ base
   `edition-speciale.png` (singulier).
3. **Calques du Configurateur** : couples `sim-<slug>-tex.png` (texture) +
   `sim-<slug>-mask.png` (silhouette), générés par les scripts racine.

**12 scripts jetables `_*.cjs`** à la racine (`_prod_assets.cjs`, `_assets.cjs`,
`_crop.cjs`…) : pipeline sharp maison (morphologie dilate/érode, seuil d'encre,
`_prod_assets.cjs:4-11`) qui fabrique les calques `sim-*` depuis les dessins
client `Ref/PhotoClient/Simulateur_*.png`. Hors build Astro.

## 3. ⭐ Fiche détaillée des deux features centrales

### A. Split-screen `/mes-creations` (`src/pages/mes-creations.astro`, tout-en-un : markup + CSS + script)

- **Principe** : une seule scène `<section data-scene data-mode>` à deux états
  — `hero` (sélecteur des 4 modèles) et `detail` (fiche produit) —
  (`mes-creations.astro:9`). Le CSS varie selon `data-mode` (l.243-259).
- **Couplage data→client sans duplication** : les modèles sont injectés en JSON
  `<script type="application/json" data-models set:html={JSON.stringify(modeles)}>`
  (l.52) et relus côté client (l.278).
- **Animations GSAP** (import l.268) : `maskSwap` (textes masqués, l.318),
  `allerVers(dir)` (changement de modèle : balayage couleur + fondu/zoom du sac,
  l.329-365), `ouvrirDetail`/`fermerDetail` (timeline, split 50/50→40/60,
  l.367-403). Couleur de panneau = variable CSS `--c` posée depuis
  `m.couleur` (l.9).
- **Garde-fous** : verrou `busy` (l.307) + anti-spam molette `wheelLock` 720 ms
  (l.410-415). **Entrées** : clic flèches (l.405-407), molette (l.411-419),
  clavier ↑↓/Entrée/Échap (l.422-426).
- **Accessibilité/perf** : `prefers-reduced-motion` → durées quasi nulles
  (CSS l.262 + JS l.302). **Responsive** : bascule verticale sous 760 px (l.249).
- **Sortie** : le CTA fiche pointe vers `/personnaliser?modele=<slug>` (entrée
  du Configurateur). **État : terminé et fonctionnel** ; reste à brancher
  Lenis + loader d'intro (intention documentée `Immersif.astro:4`).

### B. Configurateur `/personnaliser` (`src/components/Configurateur.astro`, 434 l.)

- **Technique** (c'est LA feature produit) : pas de SVG, pas d'îlot hydraté —
  un `<script>` inline classique (l.336). Chaque sac = 2 calques PNG empilés
  (`.sim__color` + `.sim__tex`, l.69-70). La recoloration est **100 % CSS** :
  `.sim__color` reçoit un `linear-gradient` via la variable `--bands`
  (l.218) **masqué** par la silhouette `sim-<slug>-mask.png` (`--m`,
  `mask-mode: alpha`, l.219-221) ; la texture maille est posée par-dessus en
  `mix-blend-mode: multiply` (l.226). Couleurs **illimitées** (dégradé, pas de forme).
- **Logique** : état `palette: string[]` (1 à 3 hex, `MAX = 3` l.339, défaut
  l.340) ; `bandsCss()` construit le dégradé à bandes nettes (l.351) ;
  `peindre()` l'applique à tous les `.sim` (l.361-364) ; `ajouter(hex)` fait
  le toggle en gardant ≥ 1 fil (l.387-393) ; `rendrePalette()` resynchronise
  toute l'UI (l.366-384, avec `aria-live` l.106).
- **Couplage data** : vignettes et `.sim` générés depuis `modelesPerso`
  (chemins mask/tex construits par slug, l.35-36, 65). Ajouter un modèle
  recolorable = entrée dans `modeles.ts` **+** génération des 2 PNG via les
  scripts `_*.cjs`.
- **Lien entrant** : lit `?modele=<slug>` au démarrage (l.426).
- **État : terminé et fonctionnel**, mais le rendu « photo recolorée » ne
  satisfait pas Allan (noté `HISTORIQUE.md`, piste : repartir des dessins au
  trait `Simulateur_*`). Deux branches d'exploration existent
  (`feat/configurateur-2.5d`, `feat/configurateur-3d`, locales uniquement).

## 4. État de l'intégration

- **Tout est branché** : les 6 pages se lient entre elles (hero → `/personnaliser`
  et `/mes-creations`, `index.astro:99-100` ; fiche split-screen → configurateur ;
  configurateur → `/commander`, `Configurateur.astro:124`).
- **Contenus codés en dur** : textes, avis clients (`index.astro:41`), prix —
  aucun CMS/admin. Modifier le contenu = éditer les fichiers.
- **Commande = placeholder assumé** : le formulaire fait `preventDefault()`,
  affiche un remerciement et reset — **aucune donnée transmise nulle part**
  (`commander.astro:74-78`). Idem newsletter, stub vide (`index.astro:506-508`).
  C'est le modèle « commerce hybride » documenté : vitrine d'abord, paiement
  plus tard, SAV par DM Instagram.
- **Dépendances externes au runtime** : uniquement Google Fonts
  (`Vitrine.astro:29-32`, `Base.astro:27-30`, `Immersif.astro:34-37`). Aucune
  API, aucun tracking, aucun secret dans le code (grep api_key/secret/token :
  néant ; pas de `.env`).

## 5. Méthodologie de travail (à connaître pour reprendre)

- **Docs pilotes** — c'est la vraie méthode du projet : `CLAUDE.md`
  (architecture vivante, **fait foi**), `HISTORIQUE.md` (« État actuel »
  réécrit + log de sessions append-only), `CONTEXTE-PROJET.md` (brief autonome
  sans le code), `skillorganisation.md` (méthode : lire avant d'agir → valider
  avant de coder → prouver avant d'affirmer → tracer avant de partir).
  ⚠️ `README.md` est **périmé** (décrit un configurateur « SVG » et l'ancien
  accueil) — ne pas s'y fier.
- **Projet mené avec Claude Code** (vibe coding) : sessions tracées dans
  `HISTORIQUE.md`, brainstorm avant scaffold, brief d'animation validé avant
  code (`briefs/intro-citron-scroll.md`).
- **Git** : une préoccupation = une branche `feat/*` ; `main` stable ; jamais
  de push/déploiement sans accord explicite.
- **Preuve** : `npm run check` + `npm run build` avant d'affirmer.
- **Environnement WSL** (`/mnt/e`, lent) — gotcha connu : `astro dev` met
  `public/` en cache au boot → redémarrer après ajout d'asset
  (`pkill -f "astro.js dev"`).

## 6. Forces / Faiblesses / Risques

**Forces**
- Doc interne exceptionnelle et à jour (`CLAUDE.md`, `HISTORIQUE.md`) — la
  reprise peut s'appuyer dessus les yeux fermés.
- Zéro duplication de données : catalogue unique (`modeles.ts`) consommé par
  split-screen (JSON injecté, `mes-creations.astro:52`) et configurateur.
- Interactivité sans framework ni hydratation : léger, robuste, sans dette.
- Garde-fous d'animation (`busy`, `wheelLock`) et `prefers-reduced-motion`
  gérés (`mes-creations.astro:262,302`).

**Faiblesses**
- **Images lourdes non optimisées** : `hero-crochet.png` **4,8 Mo** chargé en
  `fetchpriority="high"` sur l'accueil (`index.astro:111`), `about-atelier.png`
  2,5 Mo. Aucun `srcset`/WebP/AVIF ; LCP probablement dégradé.
- **~11,4 Mo d'images obsolètes** encore dans `public/images/`
  (`accueil-hero.png`, `accueil-mini-1/2/3.png` — plus référencées) + 2
  composants morts (`IntroAnim.astro`, `CarteModele.astro`).
- `sharp` requis par les scripts assets mais non déclaré dans `package.json`
  (dépendance transitive fragile, `_prod_assets.cjs:1`).
- CSS dupliqué entre header inline d'`index.astro` et celui de `PageVoeu.astro`
  (choix assumé « pixel-près maquette », mais double maintenance).

**Risques**
- `Ref/` = **235 Mo** de photos/vidéos client **suivis par git** (dont
  historique) ; dépôt GitHub repassé privé le 2026-07-03 justement pour ça.
  Toute republication du dépôt réexposerait ces fichiers.
- `main` ne reflète plus le site réel (refonte non mergée) : ne jamais
  repartir de `main` sans le savoir.
- Déploiement **manuel** sans CI : pousser sur GitHub ne met rien en ligne ;
  risque de divergence dépôt ↔ site en ligne.

## 7. Reste à faire (check-list ordonnée)

1. Décider du sort de la refonte : merger `feat/refonte-accueil` → `main` (ou
   acter que la branche de travail est la référence).
2. Optimiser les images de la vitrine (redimensionner/convertir
   `hero-crochet.png`, `about-atelier.png` ; ajouter `srcset`) — plus gros gain
   perf immédiat.
3. Purger le code mort (avec accord) : `accueil-hero/mini-*.png`,
   `IntroAnim.astro`, `CarteModele.astro` — ou brancher `IntroAnim` si
   toujours voulu.
4. Refaire le rendu du Configurateur (retour d'Allan) — piste : dessins au
   trait `Ref/PhotoClient/Simulateur_*`.
5. Brancher Lenis + loader d'intro dans `Immersif.astro` (intention l.4).
6. Brancher réellement le formulaire de commande (backend/service) puis le
   paiement ; réécrire `README.md`.
7. Exploiter `Ref/catalogue/` (27 photos produit non triées) pour enrichir
   galeries/catalogue.
8. Déclarer `sharp` en devDependency si les scripts assets doivent resservir.

## 8. Prérequis, accès & zones d'ombre

**Accès à récupérer**
- GitHub `AmarokRa/atelier-acidule` (**privé** ; collaborateur `Allan77bot`
  invité admin, invitation en attente au 2026-07-03).
- Netlify : site `atelier-acidule-498.netlify.app`, team `isaiah-blackcrow`
  (déploiement : `netlify deploy --prod --dir=dist` après `npm run build`).
- Matière première client : `Ref/PhotoClient`, `Ref/VideoClient`,
  `Ref/catalogue` (dans le dépôt), compte Instagram de la cliente (canal SAV).

**Zones d'ombre — non déductibles du dépôt**
- Solution de paiement cible : non choisie (aucune trace).
- Destination prévue des données du formulaire de commande (email ? service
  tiers ? DM ?) : non documentée.
- Domaine `atelier-acidule.fr` (déclaré `astro.config.mjs:6`) : acheté ou
  simple intention ? Rien dans le dépôt.
- Les avis clients d'`index.astro:41` : réels ou fictifs ?
- Sort d'`IntroAnim` (471 lignes orphelines) : abandonné ou à rebrancher ?
- Branches locales `feat/configurateur-2.5d` / `-3d` : état d'avancement non
  audité (hors branche courante), non poussées.

**État git au moment de l'audit** : branche `feat/refonte-accueil` (= défaut du
remote), 12 commits du 2026-06-26 au 2026-07-03, auteur unique
« Atelier Acidule ». Non commité : `CLAUDE.md` modifié + dossier `.claude/`
(skill `audit-projet`) non suivi.
