# Historique — Atelier Acidulé

> Fichier unique mis à jour **à chaque fin de session**.
> 1ʳᵉ partie = **état actuel** (réécrit à chaque fois). 2ᵉ partie = **log des sessions** (append-only, jamais réécrit).
> À lire au démarrage avec `CLAUDE.md`.

---

## 📌 État actuel (réécrit à chaque session)

**Phase :** **refonte complète terminée, déployée et poussée** sur la branche `feat/refonte-accueil` :
`/index` est une **vraie landing page** (layout Base, scroll), `/mes-creations` est une **expérience
scroll-snap** (1 sac = 1 section couleur, plus de GSAP/boutons/mode détail), et la **personnalisation
est supprimée** (commande = **DM Instagram**). En ligne : https://atelier-acidule.netlify.app.
`main` garde l'ancienne vitrine. **Archi à jour : `CLAUDE.md` (actualisé) + `docs/ETAT.md`.**
⚠️ Les notes d'architecture détaillées plus bas dans CE fichier (configurateur, split-screen GSAP,
ancienne home) sont **PÉRIMÉES** — se fier à `CLAUDE.md`.

### 🚧 Refonte split-screen (branche)
- **Fondation** : git initialisé, branche dédiée, GSAP 3.15 + Lenis 1.3 installés.
- `src/layouts/Immersif.astro` : coquille immersive (header minimal wordmark + burger
  + tiroir menu), sans Nav/Footer classiques. À enrichir : loader d'intro + Lenis.
- `src/pages/index.astro` : **accueil split-screen** complet (état 1 sélecteur 4
  modèles + état 2 fiche détail), animé GSAP (slide couleur, fondu-zoom du sac,
  textes masqués, split 50/50↔40/60, reveal en cascade). Molette/clavier/clic.
- `src/data/modeles.ts` : champ `couleur` ajouté par modèle (terracotta/olive/
  bordeaux/sapin).
- **Photos produit refaites** (session 06-27) : les 4 captures Instagram remplacées
  par les photos studio du catalogue. Mapping : `petit-sac`=16_cabas-marron,
  `pochette-livres`=01_pochette-livre-ecru, `grand-sac`=13_sac-bordeaux,
  `edition-speciale`=25_cabas-multicolore.
  - **Cartes / éditions / autres pages** : versions **détourées** (rembg `isnet-general-use`)
    `public/images/<slug>.png` (fond transparent).
  - **Accueil** : versions **fond recolorisé par sac** `public/images/accueil-<slug>.png`
    (fond crème → couleur du modèle, ombre de contact gardée, champ plat = couleur exacte
    pour être raccord avec le fond de scène). ⚠️ nom = **slug** (`accueil-editions-speciales.png`,
    pluriel, ≠ base `edition-speciale.png`).
  - **Configurateur** : 6 calques `sim-*` régénérés **depuis ces photos** (texture =
    relief passe-haut auto-calibré par sac via percentile ; masque = alpha silhouette).
    ⚠️ Allan **n'aime pas** le rendu « photo recolorée » du configurateur → il veut
    refaire plus propre lui-même (piste : revenir aux dessins au trait `Simulateur_*`).
- **Accueil plein couleur** : panneau gauche passe blanc→couleur (hero) puis →crème
  (fiche), logo (pelote+citron) ajouté en haut à gauche, titre décalé en haut /
  baseline en bas + ombre texte (lisibilité, demandé par Allan).
- **Build OK** (`npm run build`, 5 pages). ⚠️ FS `/mnt/e` lent.
- ⚠️ **Gotcha dev WSL** : `astro dev` met `public/` en cache au boot → après ajout
  d'un asset, **redémarrer** le serveur. Tuer avec `pkill -f "astro.js dev"` (PAS
  `"astro dev"`, qui ne matche pas le process node).
- Réf. d'analyse complète : `Pool/ref-sandqvist-structure.md`.

### 📥 Matériel catalogue (déposé 2026-06-26, partiellement exploité)
`Ref/catalogue/` — **27 photos produit** (désormais **suivies par git**) : beaucoup
de **variantes de couleur** et de **nouveaux modèles** au-delà des 4 actuels —
pochettes à livres (écru/kaki/fuchsia/rouge/prune/bleu), protège-livre, clutch vert
sapin, cabas (teal/marron/perles/crème-bois/beige/crème-doré/multicolore), sacs
(violet baguette & hobo, rouge tube, bordeaux, vert anis, bleu marine, marron choco,
rose, jaune, bleu ciel), pochette tél. **À trier/détourer/intégrer à la reprise** —
pourrait enrichir le catalogue (`modeles.ts`) et alimenter un défilé de coloris.

### ⚠️ Travail NON commité en fin de session 06-27 (branche)
Commité : `be111ab` (photos+calques+catalogue), `218958b` (CLAUDE.md).
**Pas encore commité** (à valider/commiter à la reprise) : `src/pages/index.astro`
+ `src/layouts/Immersif.astro` (logo, accueil plein couleur, fiche crème, décalage
texte) + 4 images `public/images/accueil-*.png` (non suivies). Dev server à relancer.

### ▶️ Next refonte
1. **Refaire le configurateur** « plus propre » (Allan s'en charge — rendu photo pas validé).
2. **Validation visuelle d'Allan** sur l'accueil (état fiche : sac vs panneau crème ;
   grand-sac ton sur ton ; écart du texte) + commiter le lot ci-dessus.
3. Brancher un **slogan citron + CTA « Shop ton sac »** (liste proposée en session)
   à la place de « Découvrir → » / « Personnaliser ce sac → ».
4. Exploiter le reste de `Ref/catalogue/` (coloris/nouveaux modèles → `modeles.ts`).
5. Ré-skin des autres pages dans le langage split-screen + loader intro + Lenis.
6. Polish mobile + `prefers-reduced-motion`.

---

### Historique pré-refonte (ancienne vitrine, sur `main`)

**Phase :** mise en production démarrée — projet Astro scaffoldé à la main.

### ✅ Fait
- **Scaffold Astro** : `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`.
- **Design system** `src/styles/global.css` : tokens palette (sauge/sapin/citron/terracotta/crème), typos (Playfair/Fraunces/Nunito), boutons, fond mosaïque citron 6%, `prefers-reduced-motion`, touch-friendly targets (min 44px).
- **Pages** : `index` (hero + valeurs + 4 modèles + bloc perso + teaser éditions), `personnaliser` (configurateur), `editions-speciales` (galerie), `atelier` (histoire + contact), `commander` (formulaire placeholder).
- **Configurateur** (`Configurateur.astro`) : 3 silhouettes SVG recolorables, pastilles citron, jusqu'à 3 couleurs combinées en rangs, anse laine/laiton, conseils de mariage, `?modele=` URL.
- **Composants** : `Nav` (sticky vert sapin, burger → X animé + overlay flou, menu slide+opacity), `Footer`, `CarteModele`, `Logo`.
- **Données** `src/data/modeles.ts` : 4 modèles, 35/40/45 €.
- **Redesign mobile complet** : Nav sapin + Hero centré (sans mosaïque) + récit vertical + valeurs empilées + cartes full-width + Configurateur responsive (< 400 px compat). Build OK.
- **Skills globalisés** : `~/.claude/skills/` avec brief-anim, crea-anim, DelBackground, organiser-une-session-claude-code, atelier-web, atelier-klar-design.
- **Prompt Hieggfield** créé dans `Pool/hieggfield-prompt.md` pour retouche des 6 images produits.
- **Intro animée scrollée** (`src/components/IntroAnim.astro`) : logo → citron coupé → jus → tricot "Atelier Acidulé" → zoom site. Utilise le vrai logo PNG, animation RAF + lerp fluidifiée, responsive desktop/mobile. Brief validé : `briefs/intro-citron-scroll.md`.

### ⏳ En cours / à valider
- **Images** : prompt transmis à l'associé pour retouche via Hieggfield — en attente retour.
- **Validation visuelle mobile + intro** : à checker par Allan sur téléphone réel et desktop.
- **Ajustements intro** : Allan veut peut-être peaufiner la vitesse/ressenti de l'anim — à voir au prochain retour.

### ▶️ Next
1. Peaufiner l'intro scrollée après retours visuels d'Allan.
2. Intégrer les images retouchées une fois reçues.
3. Plus tard : back-end de commande + paiement.

### ⚠️ À confirmer côté cliente (via Allan)
- Nombre de couleurs max (présumé 3).
- Structure éditions spéciales (galerie vs édition du moment).
- Logo en SVG si dispo.
- Mapping photo → modèle + prix.
- Moyen de commande exact + adresse.

---

## 🗓️ Log des sessions (append-only)

### 2026-06-27 (refonte) — Vraie landing + /mes-creations scroll + suppression perso
Refonte demandée par Allan (trop d'erreurs sur l'ancienne version). Cadrage validé : commande = **DM
Instagram**, périmètre **home + créations**, créations = **1 sac / 1 section plein écran** au scroll.
**Workflow ultracode** (3 lots disjoints en parallèle + revue adversariale → 3× « clean ») :
- `/index` réécrit en **vraie landing** (layout Base : hero sac flottant + halo, 3 valeurs, aperçu
  catalogue 4 cartes, teasers atelier/éditions, bandeau final ; CTA « Commander » → Instagram).
- `/mes-creations` réécrit en **CSS scroll-snap** (conteneur `.reel`, 4 sections couleur plein écran,
  texte blanc lisible + scrim, indicateur « Défiler ↓ », lien « Commander en DM ») — **GSAP, flèches,
  bouton Découvrir et mode détail SUPPRIMÉS** → règle le bug du rectangle blanc illisible.
- **Suppression perso** : `personnaliser.astro`, `Configurateur.astro`, `CarteModele.astro` (mort) + 9
  `sim-*.png` (git rm) ; liens « Personnaliser »/« SHOP TON SAC » → Instagram ; `/personnaliser` = 404.
Build vert (5 pages), 0 erreur console, 0 débordement (390 + 1440), lisibilité OK sur les 4 couleurs.
Redéployé en manuel → live OK. **Piège appris** : après réécriture massive + suppressions, **redémarrer
le dev server** (overlay HMR « Unhandled rejection » périmé alors que console vide + build vert) — tuer
le PID du port 4321, pas tout node. **Suite même jour** : lisibilité des liens du **menu mobile** corrigée
(vert sapin sur panneau crème) ; **`CLAUDE.md` actualisé** (refonte) ; **commits poussés sur GitHub**
(`origin/feat/refonte-accueil`). Auto-deploy Netlify↔GitHub à brancher par Allan plus tard.

### 2026-06-27 (suite) — Passe qualité UI/UX (mobile-first, premium), /goal autonome
Audit Playwright (6 pages, mobile + desktop) → 5 priorités, puis 5 correctifs : home **scrollable
mobile** (prop `fixe` sur `Immersif` ; le `overflow:hidden` n'est plus le défaut), barre
`/mes-creations` mobile **en colonne** (bouton dans le viewport), **sacs détourés** posés sur le
panneau coloré + ombre CSS (fin de l'effet « rectangle »), typo titres **resserrée**, couche
**`polish.css`** (halo de fond, liseré citron des sur-titres, ombre carte) + **photo bannière
`/atelier`** + flèches 44px. **Workflow multi-agents adversarial (ultracode)** : 5 lentilles
(mobile, a11y, spécificité CSS, premium, assets) → 5 correctifs de spécificité Astro appliqués et
revérifiés. Build vert, **0 erreur console, 0 débordement horizontal**. **Rien commité** (validation
Allan attendue). **Configurateur non touché** (Allan le refait). Assets devenus orphelins :
`accueil-{petit-sac,pochette-livres,grand-sac,editions-speciales}.png` (à supprimer après validation).
Piège appris (**candidat kit PILOTE**) : **les styles scopés Astro battent une couche `polish.css`
globale** sur les classes page-spécifiques (`[data-astro-cid]` ⇒ spécificité supérieure) ; ne pas
redéclarer une prop en raccourci qui réinitialise ce que pose polish. Captures : `docs/audit-shots/`.
**Suite (demande Allan « ne plus voir le fond carré des photos »)** : sac héros + 3 vignettes de
la home **détourés** (rembg `isnet-general-use`) et posés sur le crème continu (halo citron + ombre)
→ plus aucun bloc photo. Originaux `accueil-mini-1/2/3.png` + 4 `accueil-<slug>.png` devenus orphelins
(`accueil-hero.png` reste utilisé par la bannière `/atelier`, à détourer/remplacer plus tard).
**Vérif UX/UI finale OK** (tiroir-menu immersif, configurateur, états interactifs) puis **mise en
ligne Netlify** : site `atelier-acidule` créé via CLI, **deploy manuel du `dist/`** →
**https://atelier-acidule.netlify.app** (live vérifié, 0 erreur console). ⚠️ Déploiement **non
continu** (pas branché au git) et travail **non commité/non poussé** : à faire pour automatiser.

### 2026-06-27 — Vraies photos produit, accueil plein couleur, logo
**Hors projet (début de session)** : install d'**UltraCode-Shim** (outil, PAS un skill)
côté Windows (`%LOCALAPPDATA%\UltraCode-Shim`, lanceur `ultracode` sur le PATH) — le
`irm|iex` a été bloqué par la sécu, fait en manuel depuis le clone ; self-test OK.
Confirmé que le skill `organiser-une-session-claude-code` est déjà dans la racine
skills Windows. `/init` : `CLAUDE.md` actualisé (accueil split-screen, Immersif,
gsap/lenis, git).

**Projet — photos** : remplacé les 4 captures Insta par les photos studio du catalogue.
Détourage rembg (`isnet-general-use`) pour `<slug>.png` (cartes/éditions). Régénéré
les 6 calques `sim-*` du configurateur depuis les photos (relief passe-haut auto-calibré
par percentile ; 2 bugs réglés en route : quadrant dû au resize avant join, puis texture
trop plate). 2 commits : `be111ab` (photos+calques+`Ref/catalogue` désormais tracké),
`218958b` (CLAUDE.md). Identité git remise (`Atelier Acidule`).

**Projet — accueil (option A validée par Allan)** : photos **non détourées à fond
recolorisé** par sac (`accueil-<slug>.png`, fond crème→couleur, ombre gardée, champ plat
= couleur exacte). Accueil passé **plein couleur** (panneau gauche couleur en hero →
crème en fiche), **logo** pelote+citron ajouté en haut à gauche, **texte décalé**
(titre haut / baseline bas + ombre) pour la lisibilité (demande d'Allan). ⚠️ Ce lot
(`index.astro`, `Immersif.astro`, 4 `accueil-*.png`) **non commité**.

**Refusé/à refaire** : Allan n'aime pas le configurateur en « photo recolorée » → il
refait plus propre lui-même. **Slogans citron + CTA « Shop ton sac »** proposés (non
intégrés). **Galère** : process `astro dev` fantômes squattant le port 4321 (`pkill`
doit cibler `astro.js dev`) + `public/` mis en cache au boot.

### 2026-06-26 — Refonte split-screen (réf. SANDQVIST) : accueil
Allan envoie un enregistrement d'écran (`A:`) du site **SANDQVIST** : « je veux
exactement cette structure ». Analyse multimodale déléguée à Gemini via le skill
`regarder-video` (voie **File API**, car fichier local — le script ne gère que les
URL). Site décodé : expérience plein écran 2 états (sélecteur split 50/50 ↔ fiche
40/60), slide vertical de couleur, fondu-zoom produit, reveal masqué, loader split,
transition volets ; stack GSAP + Lenis. Sauvegardé dans `Pool/ref-sandqvist-structure.md`.

**Cadrage validé (3 questions)** : tout le site / les flèches défilent les 4 modèles
/ GSAP + Lenis OK. Parcours détail laissé « à mon jugement » → **accueil → fiche
détail → personnaliser → commander**.

**Construit** : git init + branche `feat/refonte-split-screen`, install GSAP/Lenis,
`Immersif.astro` (coquille), `index.astro` (accueil split-screen animé GSAP),
`modeles.ts` (+couleur). **Photos détourées** via skill `DelBackground` (rembg),
originaux dans `Pool/orig-photos-opaque/`. Build OK (5 pages). À valider visuellement.

**Aussi cette session** : skill `regarder-video` installé à `~/.claude/skills/`
(structure aplatie, chemin script corrigé Windows→`~/`), clé Gemini posée + validée
(modèle `gemini-3.5-flash`). `CLAUDE.md` mis à jour (Configurateur PNG, HISTORIQUE existe).


### 2026-06-25 (2ᵉ partie) — Intro scrollée animée + header vert
Suite de la session : corrections demandées par Allan — mosaïque retirée du hero, header en vert sapin, et surtout **intro animée scrollée** complète.

**Brief-anim complet :**
- Idée : logo qui apparaît → se coupe en deux → jus coule → se tricote en "Atelier Acidulé" → zoom dans le site
- Salve de termes envoyée, **tous validés immédiatement** par Allan
- Brief produit : `briefs/intro-citron-scroll.md`

**IntroAnim.astro créé :**
- Utilise le **vrai logo** (pelote + citron) au lieu de SVGs artisanaux
- Logo coupé via `clip-path` (moitiés s'écartent)
- Jus SVG avec path drawing + gouttes
- Texte "Atelier Acidulé" en Playfair Display, lettres qui pop une par une (stagger + easeOutBack)
- **Animation fluidifiée** : RAF + lerp (interpolation douce) au lieu de scroll event direct
- 5 phases scroll-driven, responsive desktop + mobile
- `prefers-reduced-motion` : intro sautée

**Autres modifs :**
- `Nav.astro` : fond vert sapin (`#2f4334`), texte et burger en crème/citron-clair
- `index.astro` : hero sans mosaïque (fond crème plein)
- Build OK (5 pages, 20s)
Allan a présenté le projet à un associé : les photos ne passent pas (« pas professionnel »), la version mobile est jugée « dégueulasse, pas vendeuse, trop cheap ». Objectif : rendre premium, chaleureux, vendeur — garder les couleurs.

**Prompt Hieggfield** créé (`Pool/hieggfield-prompt.md`) avec brief complet pour retouche des 6 images produit : direction artistique méditerranéenne (Jacquemus/Sézane), fond crème chaud, éclairage doré, détourage logo, amélioration mosaïque.

**Redesign mobile** fichiers modifiés :
- `src/styles/global.css` — gouttière resserrée, touch-friendly 44px, petit mobile
- `src/components/Nav.astro` — burger → X animé, overlay flou, menu slide+opacity, touch targets
- `src/pages/index.astro` — Hero centré, CTA colonne, pastilles repositionnées, récit vertical, valeurs empilées, perso ordre inversé
- `src/pages/editions-speciales.astro` — breakpoint 560px, hover lift
- `src/pages/atelier.astro` — centrage mobile, padding contact réduit
- `src/pages/commander.astro` — bouton full-width, font-size 16px (anti-zoom iOS)
- `src/components/CarteModele.astro` — CTA full-width, ratio 4:3, texte tassé
- `src/components/Footer.astro` — stack vertical centré
- `src/components/Configurateur.astro` — scene 340px, citrons 3 col, mariages 1 col
- Build OK — `npm run build` passe sans erreur.

**Skills globalisés** : copie de brief-anim, crea-anim, DelBackground, organiser-une-session-claude-code, atelier-web, atelier-klar-design dans `~/.claude/skills/`. Confirmé présents dans la session.
- Note : `copywriting`, `live-video-youtube`, `crea-skill`, `audit` n'ont pas été trouvés sous forme de SKILL.md.

**Brief-anim lancé** (cette session) sur les micro-animations mobile — salve de termes envoyée, attente validation.

### 2026-06-24 (quater) — Interview anim (brief-anim) — fin de session
Allan veut rendre la section « récit au scroll » plus dynamique : **quinconce** (texte gauche → droite → gauche), **3 images par phrase** dans des **cercles à contour vert**, apparition au scroll. Skill `brief-anim` lancé, lexique lu, **salve de termes envoyée** (A. structure / B. apparition / C. ressenti / D. zoom & cercle). **Session interrompue avant les réponses** d'Allan ("je dois aller bosser"). Serveur dev arrêté. **Reprise = répondre A→D → brief → crea-anim.** Aucun code anim écrit (le brief n'est pas figé).

### 2026-06-24 (ter) — Itération design (retours Allan)
- **Logo** : composant unique `Logo.astro` en **cadre circulaire**, utilisé dans Nav + Footer (remplacer `public/images/logo.png` met à jour partout).
- **Configurateur revu** : sélecteur de modèle → **grand aperçu** du modèle choisi ; surtout, vraie **maille tricot** visible (motif SVG `maille-v`) et **combinaison de couleurs dans la maille** = palette de **jusqu'à 3 fils** qui s'alternent en rangs. Anse laine/laiton conservée, conseils de mariage = trios.
- **Hero en scrollytelling** : titre en haut, puis au scroll la description se révèle **phrase par phrase** (3 rubriques), avec **image qui change dans la bulle** à chaque phrase (IntersectionObserver, bulle sticky).
- **Vérif** : `npm install` OK, `npm run build` OK (5 pages), `npm run dev` → toutes routes 200, images 200, aucun warning/erreur.

### 2026-06-24 (bis) — Mise en production : scaffold Astro
**GO production** d'Allan (« lance la production du site, on modifiera le moment venu »). Scaffold Astro **manuel** (pas de CLI interactif) : config + design system + 5 pages + configurateur SVG recolorable + composants Nav/Footer/CarteModele + data modèles. Choix par défaut assumés : page perso unique avec sélecteur de modèle ; éditions = galerie de pièces uniques. **Non terminé** : copie des photos vers `public/images/` et `npm install`/`npm run dev` — le classifieur PowerShell de la plateforme était indisponible toute la session. À reprendre dès que le shell répond.

### 2026-06-24 — Cadrage + maquettes
**Décisions.** Stack Astro ; commerce hybride (vitrine maintenant, paiement plus tard, commande on-site, FAQ→DM). Identité Italie/Méditerranée, citron acidulé + sucré-doux. Palette vert/citron/terracotta sur crème. Typos Playfair + Fraunces + Nunito. Feature centrale = page perso recolorable (jusqu'à 3 couleurs, conseils de mariage, citrons-couleurs) pour petit sac / pochette à livres / grand sac. Éditions spéciales = page à part. Option anse laine vs anneaux laiton. Saisons écartées au profit de l'angle couleurs/glamour.
**Produit.** Maquettes page perso interactive + homepage v2 livrées et validées. Mémoire projet + `CLAUDE.md` + `HISTORIQUE.md` posés.
**En suspens.** Validation finale homepage v2 ; structure éditions spéciales ; nb couleurs max ; logo SVG ; mapping photos↔modèles↔prix ; canal de commande.
**Prochaine session.** GO homepage → plan de build Astro → scaffold sur branche dédiée → 1ʳᵉ page perso recolorable.
