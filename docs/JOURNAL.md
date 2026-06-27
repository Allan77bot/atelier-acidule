# 📓 JOURNAL — Atelier Acidulé

> Historique **daté**, **append-only** (on ajoute en haut, on n'efface jamais). L'état « maintenant » = `ETAT.md`.
> Une entrée par session : ce qu'on a fait, **pourquoi**, ce qu'on a appris, ce qui reste.
> ⚠️ Ce journal **double `../HISTORIQUE.md`** (trace native du projet) : tenir les deux à jour ensemble.

---

## 2026-06-27 (refonte) — Vraie landing + /mes-creations en scroll + suppression perso

**Objectif du jour :** refonte complète demandée par Allan (trop d'erreurs sur l'ancienne version).

**Cadrage validé (3 questions) :** commande = **DM Instagram** ; périmètre = **home + mes-créations**
(reste juste nettoyé) ; créations = **1 sac / 1 section plein écran** au scroll.

**Fait (workflow ultracode : 3 lots disjoints en parallèle + revue adversariale, 3× « clean ») :**
- **`/index`** réécrit en **vraie landing** (layout Base, Nav + Footer, scroll) : hero sac flottant + halo,
  3 valeurs, aperçu catalogue (4 cartes), teaser atelier (cabas multicolore), teaser éditions, bandeau
  final. Tous les CTA « Commander » → Instagram.
- **`/mes-creations`** réécrit en **CSS scroll-snap** (conteneur `.reel`, 4 sections plein écran couleur),
  infos en **texte blanc lisible** + scrim léger (plus de rectangle blanc), indicateur « Défiler ↓ » qui
  s'efface, lien discret « Commander en DM ». **GSAP, flèches, bouton Découvrir et mode détail supprimés.**
- **Suppression perso** : `personnaliser.astro`, `Configurateur.astro`, `CarteModele.astro` (mort) + 9 calques
  `sim-*.png` retirés (git rm) ; liens « Personnaliser »/« SHOP TON SAC » → Instagram ; `/personnaliser` = 404.
- Build vert (5 pages), 0 erreur console, 0 débordement (390 + 1440), lisibilité OK sur les 4 couleurs.
- Redéployé en manuel → https://atelier-acidule.netlify.app (live vérifié).

**Décisions :** personnalisation abandonnée ; commande 100 % DM Instagram ; home en layout Base (règle
l'incohérence des 2 en-têtes) ; mes-creations en scroll-snap (Immersif `fixe` + conteneur interne).

**Appris / pièges :** après une réécriture massive + suppressions, le dev server garde un **overlay HMR
périmé** (« Unhandled rejection » alors que la console est vide et le build vert) → **redémarrer le dev
server** (tuer le PID du port 4321, pas tout node). Le test de scroll programmatique est faussé par
`scroll-behavior:smooth` → désactiver le smooth pour mesurer.

**Reste / next :** validation Allan ; désinstaller `gsap`/`lenis` (inutilisés) ; brancher l'auto-deploy
Netlify↔GitHub (Allan).

**Suite (même jour) :** corrigé la **lisibilité des liens du menu mobile** (héritaient du crème clair sur
panneau crème → forcés en `--sapin`) ; **`CLAUDE.md` actualisé** (refonte : landing, scroll, suppression
perso, déploiement Netlify, gotcha Windows) ; **commits poussés sur GitHub** (`origin/feat/refonte-accueil`) ;
**`gsap` + `lenis` désinstallés** (inutilisés depuis la refonte → seule dépendance : `astro`).

---

## 2026-06-27 (suite) — Passe qualité UI/UX (mobile-first, premium) — /goal autonome

**Objectif du jour :** audit du site puis refonte qualité en autonomie (mobile-first, premium), sans casser.

**Fait :**
- Audit Playwright (6 pages, 390 + 1440) → 5 priorités. Puis 5 correctifs implémentés :
  1. Home **scrollable sur mobile** : `overflow:hidden` rendu **conditionnel** via prop `fixe` d'`Immersif` (seul `/mes-creations` est `fixe`).
  2. Barre `/mes-creations` mobile en **colonne** (bouton dans le viewport, 0 débordement).
  3. **Sacs détourés** (`m.photo`) sur panneau coloré + `drop-shadow` CSS → fin de l'effet « rectangle ».
  4. Typo titres **resserrée** (`letter-spacing` h1/h2).
  5. Couche **`polish.css`** (halo de fond, liseré citron, ombre carte) + **photo bannière `/atelier`** + flèches 44px.
- **Home « sans bloc photo »** (demande Allan) : sac héros + 3 vignettes **détourés** (rembg `isnet-general-use` via API Python, le CLI ayant une dép. cassée) posés sur le crème continu + halo citron + ombre → plus aucun fond carré. Originaux `accueil-mini-1/2/3.png` + les 4 `accueil-<slug>.png` deviennent orphelins (`accueil-hero.png` reste pour `/atelier`).
- **Workflow multi-agents adversarial (ultracode)** : 5 lentilles (mobile, a11y, spécificité CSS, premium, assets) → 5 vrais correctifs supplémentaires appliqués + vérifiés.
- **Mise en ligne Netlify** (demande Allan) : vérif UX/UI finale OK (tiroir-menu, configurateur), site `atelier-acidule` créé via CLI + **deploy manuel du `dist/`** → **https://atelier-acidule.netlify.app** (live vérifié, 0 erreur console). Déploiement **non continu** (pas branché au git), travail **non commité/non poussé**.
- Build vert, 0 erreur console, 0 débordement horizontal sur toutes les pages. Captures `docs/audit-shots/`.

**Décisions :**
- `Immersif` plein écran **opt-in** (`fixe`), pas par défaut → corrige proprement le clipping mobile.
- Boutons gardés en **aplat de marque** (le dégradé polish était annulé sur la home par un style scopé → incohérence).
- **Configurateur non touché** (Allan le refait). **Rien commité** (validation Allan attendue).

**Appris / pièges (candidats kit PILOTE) :**
- **Les styles scopés Astro battent une couche `polish.css` globale** sur les classes page-spécifiques
  (`.atelier__contact`, `.btn--primaire` redéfini scopé) : un sélecteur scopé = `[data-astro-cid]` ⇒ spécificité supérieure.
  → polish doit éviter les collisions de classes scopées **ou** monter sa spécificité ; et une page ne doit pas
  redéclarer une prop en **raccourci** (`background:`) qui réinitialise ce que pose polish (`background-image`).
- Même piège pour `overflow` : `:global(body.immersif){overflow-y:auto}` (0,1,1) était battu par `.immersif{overflow:hidden}` scopé (0,2,0).

**Reste / next :**
- Validation visuelle Allan → puis supprimer 4 `accueil-*.png` orphelins + photo `/atelier` distincte (catalogue).
- Slogan/CTA « Shop ton sac », harmonisation des 2 en-têtes, Lenis + loader, configurateur (Allan).

---

## 2026-06-27 — Vraies photos produit, accueil plein couleur, logo

**Objectif du jour :** remplacer les captures Insta par les vraies photos studio + pousser l'accueil.

**Fait :**
- 4 captures Insta → photos studio du catalogue. Détourage rembg (`isnet-general-use`) → `<slug>.png` (cartes/éditions).
- 6 calques `sim-*` du configurateur régénérés depuis les photos (relief passe-haut auto-calibré par percentile ; 2 bugs réglés : quadrant dû au resize avant join, texture trop plate).
- Accueil passé plein couleur (panneau gauche couleur en hero → crème en fiche), logo pelote+citron ajouté, texte décalé + ombre (lisibilité).
- 2 commits : `be111ab` (photos + calques + `Ref/catalogue` désormais tracké), `218958b` (CLAUDE.md).

**Décisions :**
- Accueil = photos **non détourées à fond recolorisé par sac** (`accueil-<slug>.png`, fond crème→couleur), pour être raccord avec le fond de scène (option A, validée Allan).

**Appris / pièges :**
- `astro dev` met `public/` en cache au boot → **redémarrer** après ajout d'asset.
- `pkill` doit cibler `astro.js dev` (pas `astro dev`, qui ne matche pas le node). Processus fantômes squattant le port 4321.

**Reste / next :**
- Allan refait le configurateur « plus propre » (rendu « photo recolorée » refusé).
- Slogans citron + CTA « Shop ton sac » proposés, non intégrés.
- Lot `index.astro` + `Immersif.astro` + 4 `accueil-*.png` à valider/commiter.

---

## 2026-06-26 — Refonte split-screen (réf. SANDQVIST)

**Objectif du jour :** reproduire la structure du site SANDQVIST envoyée par Allan.

**Fait :**
- Analyse multimodale de l'enregistrement écran déléguée à Gemini (skill `regarder-video`, voie File API car fichier local). Décodage → `Pool/ref-sandqvist-structure.md`.
- git init + branche `feat/refonte-split-screen`, install GSAP/Lenis, `Immersif.astro` (coquille), `index.astro` (accueil split-screen animé GSAP), `modeles.ts` (+champ `couleur`).
- Photos détourées via rembg, originaux dans `Pool/orig-photos-opaque/`. Build OK (5 pages).

**Décisions :**
- Tout le site passe en expérience plein écran ; flèches = défilent les 4 modèles ; stack GSAP + Lenis ; parcours accueil → fiche → personnaliser → commander.

**Appris / pièges :**
- Le skill `regarder-video` ne gère que les URL → un fichier local passe par la voie File API.

**Reste / next :**
- Valider visuellement l'accueil split-screen.

---

## 2026-06-25 — Intro scrollée animée, header vert, redesign mobile premium

**Objectif du jour :** corrections Allan (intro animée) + rendre le site premium après retour associé (« mobile cheap, pas vendeur »).

**Fait :**
- `IntroAnim.astro` : logo → citron coupé → jus → texte tricoté « Atelier Acidulé » → zoom site. Vrai logo PNG, RAF + lerp, 5 phases scroll-driven, responsive, `prefers-reduced-motion` (intro sautée). Brief `briefs/intro-citron-scroll.md`.
- `Nav.astro` en vert sapin ; hero sans mosaïque.
- Redesign mobile complet (Nav burger→X + overlay flou, hero centré, cartes full-width, configurateur responsive, footer stack vertical). Build OK.
- Prompt Hieggfield (`Pool/hieggfield-prompt.md`) pour retoucher les 6 images produit (DA méditerranéenne, fond crème chaud, éclairage doré).
- Skills globalisés dans `~/.claude/skills/`.

**Décisions :**
- Tous les termes du brief-anim validés immédiatement par Allan.

**Appris / pièges :**
- Anim pilotée par scroll event direct = saccadée → RAF + lerp pour fluidifier.

**Reste / next :**
- Peaufiner vitesse/ressenti de l'intro après retour Allan ; intégrer les images retouchées une fois reçues.

---

## 2026-06-24 (quater) — Interview brief-anim (récit au scroll)

**Objectif du jour :** rendre la section « récit au scroll » plus dynamique.

**Fait :**
- Skill `brief-anim` lancé : quinconce (texte gauche↔droite), 3 images par phrase dans des cercles à contour vert, apparition au scroll. **Salve de termes envoyée** (structure / apparition / ressenti / zoom & cercle).

**Appris / pièges :**
- Session interrompue avant les réponses d'Allan → **aucun code anim écrit** (le brief n'est pas figé).

**Reste / next :**
- Répondre A→D → brief → `crea-anim`.

---

## 2026-06-24 (ter) — Itération design (retours Allan)

**Fait :**
- `Logo.astro` unique en cadre circulaire (Nav + Footer) : changer `public/images/logo.png` met à jour partout.
- Configurateur revu : sélecteur → grand aperçu, vraie maille tricot (motif SVG `maille-v`), palette jusqu'à 3 fils alternés en rangs, anse laine/laiton, conseils de mariage = trios.
- Hero en scrollytelling : titre en haut, description révélée phrase par phrase, image qui change dans la bulle (IntersectionObserver, bulle sticky).

**Appris / pièges :**
- Vérif complète : `npm install` OK, `npm run build` OK (5 pages), `npm run dev` → toutes routes 200.

---

## 2026-06-24 (bis) — Mise en production : scaffold Astro

**Objectif du jour :** GO production (« lance la production, on modifiera le moment venu »).

**Fait :**
- Scaffold Astro **manuel** (pas de CLI interactif) : config + design system + 5 pages + configurateur SVG recolorable + composants Nav/Footer/CarteModele + data modèles.

**Décisions :**
- Page perso unique avec sélecteur de modèle ; éditions = galerie de pièces uniques (choix par défaut assumés).

**Appris / pièges :**
- Le classifieur PowerShell de la plateforme était indisponible toute la session → copie photos + `npm install`/`dev` repoussés.

**Reste / next :**
- Copier les photos vers `public/images/`, lancer `npm install`/`npm run dev`.

---

## 2026-06-24 — Cadrage + maquettes

**Objectif du jour :** cadrer le projet et valider la direction produit.

**Fait :**
- Maquettes page perso interactive + homepage v2 livrées et validées.
- Mémoire projet + `CLAUDE.md` + `HISTORIQUE.md` posés.

**Décisions :**
- Stack Astro ; commerce hybride (vitrine maintenant, paiement plus tard, commande on-site, FAQ→DM).
- Identité Italie/Méditerranée, citron acidulé + sucré-doux ; palette vert/citron/terracotta sur crème ; typos Playfair + Fraunces + Nunito.
- Feature centrale = page perso recolorable (jusqu'à 3 couleurs, conseils de mariage) pour petit sac / pochette à livres / grand sac ; éditions spéciales = page à part. Saisons écartées au profit de l'angle couleurs/glamour.

**En suspens :**
- Validation finale homepage v2 ; structure éditions spéciales ; nb couleurs max ; logo SVG ; mapping photos↔modèles↔prix ; canal de commande.

---
