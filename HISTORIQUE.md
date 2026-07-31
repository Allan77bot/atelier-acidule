# Historique — Atelier Acidulé

> Fichier unique mis à jour **à chaque fin de session**.
> 1ʳᵉ partie = **état actuel** (réécrit à chaque fois). 2ᵉ partie = **log des sessions** (append-only, jamais réécrit).
> À lire au démarrage avec `CLAUDE.md`.

---

## 📌 État actuel (réécrit à chaque session)

> ⚠️ **Mise à jour du 2026-07-31** — voir l'entrée du 31/07 dans le log. En bref :
> le dépôt distant a été réaligné sur la version locale d'Allan, les **223 photos
> du Drive « Photo sac »** sont intégrées (WebP, rangées par famille), une
> **page `/catalogue`** les expose (179 photos produit, visionneuse), les
> **éditions spéciales** affichent enfin les 49 vraies photos au lieu de pièces
> inventées, et `/atelier` a une **boucle vidéo d'ambiance**. Branche de tête :
> **`claude/verifier-repo-a-jour-di8c7z`**, poussée sur `Allan77bot/atelier-acidule`.
> Le site est passé à **6 pages**. ⚠️ **Le site Netlify ne répond plus (404)** :
> il faut le remettre en ligne. Le reste de cette section date du 15/07.

**Phase : refonte accueil en cours** — état au **2026-07-15** (grosse session,
voir log) :

- **Branche de tête : `feat/mobile-vitrine`** (au-dessus de
  `feat/retrait-personnalisation`, elle-même au-dessus de `fix/mobile`), poussée
  sur GitHub et **déployée en prod** (accord explicite d'Alphim, vérifiée par
  captures Playwright mobile 390×844).
- **La personnalisation n'existe plus** : `/personnaliser` + `Configurateur.astro`
  + calques `sim-*` supprimés (rendu jugé « extrêmement laid »). Tous les CTA
  pointent vers **`/commander`**, qui présélectionne le modèle via `?modele=<slug>`.
  Le code mort résultant (`Base`/`Nav`/`Footer`/`CarteModele`) est supprimé aussi.
  Pistes de remplacement : branches `feat/configurateur-2.5d` / `-3d` (locales).
- **Vitrine mobile refaite** (validée par Alphim sur device + QA visuelle) :
  hero titre→arche→CTA au-dessus du pli, badge au sommet de l'arche, CTA
  « Commander » permanent dans le header, collection en carrousel snap plein-bleed,
  avis avec points indicateurs, `:focus-visible` global, newsletter 16 px.
- **DA vitrine** (rappel, `848a8f5` du 2026-07-03) : Archivo + Nunito Sans,
  maquettes `Ref/_preview` ; `index` → layout `Vitrine`,
  `atelier`/`commander`/`editions-speciales` → `PageVoeu`, `/mes-creations` →
  split-screen GSAP (Immersif). `main` garde toujours l'état initial pré-refonte.
- ⚠️ **Allan n'a toujours pas accepté l'invitation GitHub** (vérifié 2 fois le
  2026-07-15 via API). Deux mails envoyés/préparés (fil du 15/07) : retrait perso
  + mobile prêt, « modifie toi-même si ça ne convient pas ».

**Dépôt distant + mise en ligne (à jour 2026-07-15) :**
- GitHub **https://github.com/AmarokRa/atelier-acidule** — **PRIVÉ** (les assets
  cliente `Ref/` ne sont plus exposés mais restent dans l'historique git).
  Branche par défaut `feat/refonte-accueil`. Branches poussées : `main` (état
  initial), `feat/refonte-accueil`, `feat/retrait-personnalisation`,
  `feat/mobile-vitrine` (tête). Locales seulement : `fix/mobile`,
  `feat/configurateur-2.5d`, `feat/configurateur-3d`, `feat/refonte-split-screen`
  (dépassée).
- **Collaborateur** : Allan (**`Allan77bot`**) invité en **admin** — ⚠️ invitation
  **toujours en attente** (page `/invitations`) ; il ne voit rien tant qu'il
  n'accepte pas.
- **Site en ligne (Netlify)** : **https://atelier-acidule-498.netlify.app** — la
  prod reflète depuis le **2026-07-15** le build de **`feat/mobile-vitrine`**
  (commit `5791262`). Team `isaiah-blackcrow`, project id
  `c1d3c25a-9bc5-4954-aefc-bbccbf47ab39`. Déploiement **manuel via CLI**
  (`netlify deploy --prod --dir=dist`), **pas** de CI git connectée — pousser ne
  déploie rien, et chaque déploiement exige l'accord explicite d'Alphim.

### 🧱 Briques du site (état 2026-07-15)
- **5 pages** : `index` (vitrine longue, Vitrine), `mes-creations` (split-screen
  GSAP, Immersif — molette/clavier/**swipe tactile**), `editions-speciales`,
  `atelier`, `commander` (PageVoeu — formulaire placeholder qui n'envoie rien,
  présélection `?modele=`). L'archi détaillée vit dans `CLAUDE.md` (qui fait foi).
- **Images** : photos servies en **WebP** (lot `fix/mobile`) ; les PNG d'origine
  traînent encore dans `public/images/` (ménage possible, voir Next).
- **Orphelins gardés exprès** : `Logo.astro` (marque) et `IntroAnim.astro`
  (futur loader d'intro — porte les **57 erreurs `astro check` préexistantes**).
- ⚠️ **Gotcha dev WSL** : `astro dev` met `public/` en cache au boot → redémarrer
  après ajout d'asset (`pkill -f "astro.js dev"`). FS `/mnt/e` lent.
- 🆕 **QA visuelle possible sans sudo** : recette Playwright + libs locales en
  mémoire Claude (`wsl-verif-visuelle-navigateur`) — captures mobile 390×844,
  penser à `reduced_motion` à cause des `.reveal`.

### 📥 Matériel catalogue (déposé 2026-06-26, partiellement exploité)
`Ref/catalogue/` — **27 photos produit** (désormais **suivies par git**) : beaucoup
de **variantes de couleur** et de **nouveaux modèles** au-delà des 4 actuels —
pochettes à livres (écru/kaki/fuchsia/rouge/prune/bleu), protège-livre, clutch vert
sapin, cabas (teal/marron/perles/crème-bois/beige/crème-doré/multicolore), sacs
(violet baguette & hobo, rouge tube, bordeaux, vert anis, bleu marine, marron choco,
rose, jaune, bleu ciel), pochette tél. **À trier/détourer/intégrer à la reprise** —
pourrait enrichir le catalogue (`modeles.ts`) et alimenter un défilé de coloris.

### ▶️ Next (mis à jour le 2026-07-31)
0. **Remettre le site en ligne** — la priorité. `atelier-acidule-498.netlify.app`
   renvoie 404 partout. Deux voies : soit connecter le dépôt GitHub dans Netlify
   (« Add new site → Import an existing project »), `netlify.toml` fournit déjà
   `command = npm run build` et `publish = dist` — et chaque push déploiera tout
   seul ; soit fournir un `NETLIFY_AUTH_TOKEN` pour un déploiement en ligne de
   commande. ⚠️ Ne pas passer par GitHub Pages sans y réfléchir : le dépôt est
   privé et les photos brutes de la cliente sont dans l'historique git.
0b. **Les 10 vidéos du Drive** : une seule est utilisée (`/atelier`). `ffmpeg`
   est désormais disponible, les 6 `.MOV` sont donc exploitables si besoin.
0c. **Photos en réserve** : 36 photos « peut-être utile » + 4 visuels de home
   convertis mais non affichés. `homepage-02` (plan showroom avec toute la gamme)
   ferait un bien meilleur hero d'accueil que `hero-crochet.webp` — décision de DA
   laissée à Allan.

1. **Retour d'Allan** : qu'il accepte l'invitation GitHub, teste le mobile en prod
   et modifie lui-même ce qui ne lui convient pas (mail du 15/07). S'il refait un
   configurateur « propre », repartir des branches `feat/configurateur-2.5d`/`-3d`.
2. **Mettre de l'ordre dans les branches** : merger `feat/mobile-vitrine` (et sa
   lignée) dans `feat/refonte-accueil` (branche par défaut) — voire enfin dans
   `main`, resté à l'état initial.
3. Exploiter le reste de `Ref/catalogue/` (27 photos : coloris/nouveaux modèles
   → `modeles.ts`).
4. Loader d'intro (`IntroAnim`) + Lenis dans `Immersif` — et corriger au passage
   les 57 erreurs `astro check` d'`IntroAnim`.
5. Ménage à valider : PNG lourds devenus inutiles (`hero-crochet.png` 4,7 Mo,
   `about-atelier.png`, `accueil-*.png`, photos collection `.png`).
   Suppression via `trash` uniquement, avec accord nominatif.
6. Plus tard : brancher l'envoi réel du formulaire commander + paiement.

---

### ⚠️ À confirmer côté cliente (via Allan)
- Nombre de couleurs max (présumé 3).
- Structure éditions spéciales (galerie vs édition du moment).
- Logo en SVG si dispo.
- Mapping photo → modèle + prix.
- Moyen de commande exact + adresse.

---

## 🗓️ Log des sessions (append-only)

### 2026-07-31 — sync du dépôt + intégration des 223 photos du Drive + page /catalogue + vidéo atelier

Branche : `claude/verifier-repo-a-jour-di8c7z` (poussée sur `Allan77bot/atelier-acidule`).

1. **Dépôt remis à jour** (`f5e82ee`) : l'état du 27/06 sur le remote a été
   remplacé par la version locale d'Allan, plus avancée de trois lots (refonte DA
   vitrine 03/07, lot mobile 04/07, vitrine mobile 15/07).
2. **223 photos récupérées du Drive** « Photo sac » (`1a11512`). Le dossier n'est
   listable qu'en JavaScript : crawler des pages publiques → 233 fichiers, puis
   téléchargement parallèle (223 images, 0 échec). **74 étaient en HEIC** : le
   libvips embarqué par `sharp` lit le conteneur HEIF mais n'a pas le décodeur
   HEVC compilé — passé par `pillow-heif`. Converties en WebP (1600 px, q78),
   orientation EXIF respectée : **229 Mo → 23 Mo**.
   Catégories = dossiers de la cliente (basics anse bois/crochetée/dorée, sacs de
   plage, porte-verres, pochettes livre/portable, éditions spéciales, visuels
   home, réserve, logos). Index généré dans `src/data/catalogue.ts`.
3. **Recadrage** (`71015eb`) : vérification sur les 223 photos via une planche
   contact des bandeaux supérieurs → **une seule** capture d'écran (barre d'état
   iPhone), recadrée par mesure de luminance. Le recadrage vit dans le script.
4. **Vidéo d'ambiance sur `/atelier`** (`d975ece`). Constat : **aucune des 10
   vidéos ne montre de mains en train de crocheter** (30 images extraites +
   mesure du mouvement par scene score). Retenu : le travelling sur la coupe de
   citrons avec les cartes `#SHOPTONSAC`, qui illustre littéralement le texte de
   la page. Clip de 1,75 s monté en **boucle aller-retour de 3,5 s** (sinon
   coupure sèche), 720×1280 : MP4 179 Ko + WebM 76 Ko + poster 23 Ko. Dérive
   colorimétrique HLG/BT.2020 → BT.709 mesurée à 1 %. Muette, `playsinline`,
   et **arrêtée sous `prefers-reduced-motion`** (poster seul).
5. **Page `/catalogue`** (`fa3d84b`) : les photos étaient commitées mais
   orphelines. 179 photos produit, 8 familles, barre de familles sticky,
   **vignettes 480 px** générées exprès pour la grille (+4 Mo) et pleine
   résolution réservée à la visionneuse `<dialog>` (Échap + piège à focus natifs,
   flèches, retour du focus sur la vignette d'origine).
   **`/editions-speciales`** : les 3 pièces inventées (« Limonade d'été »,
   « Pochette Provence »…) et leurs dispos fictives remplacées par les 49 vraies
   photos, sans leur inventer de nom ni de statut — réservation en DM.
   « Catalogue » ajouté aux deux navs et au footer.

**Outillage débloqué dans le conteneur** : `pillow-heif` (décodage HEIC) et
`imageio-ffmpeg` (ffmpeg 7.0.2, donc les `.MOV` ne sont plus un obstacle).
QA visuelle Playwright avec le Chromium préinstallé
(`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) — la version npm ne
correspond pas au binaire présent, il faut passer `executablePath`.

⚠️ **Le site Netlify `atelier-acidule-498.netlify.app` ne répond plus** (404 sur
toutes les routes, vérifié le 31/07) : il a été supprimé ou dépublié. Aucun jeton
Netlify dans ce conteneur → remise en ligne à faire (voir « Next »).

### 2026-07-15 — /init (sync CLAUDE.md) + retrait de la personnalisation + push + message Allan

1. **`/init`** : `CLAUDE.md` re-vérifié contre le dépôt — mises à jour : lot
   `fix/mobile` documenté (WebP, swipe, déploiement 04/07), `main` = état initial,
   branches expérimentales `feat/configurateur-2.5d`/`-3d`, `AUDIT_ACIDULE_ETAT.md`,
   `_webp_mobile.cjs`. Commité en `docs:` sur `fix/mobile` (`2aa510f`).
2. **Retrait de la personnalisation** (décision : « extrêmement laid ») — branche
   **`feat/retrait-personnalisation`** depuis `fix/mobile` :
   - Supprimés : `src/pages/personnaliser.astro`, `src/components/Configurateur.astro`,
     les 9 calques `public/images/sim-*.png` (récupérables via git).
   - Re-routage de **tous** les CTA/liens vers `/commander` : hero accueil
     (« Commander mon sac »), 3 cartes collection (`?modele=<slug>`), fiche
     split-screen (« Commander ce sac → »), CTA atelier (+ texte réécrit), navs
     (`index`, `PageVoeu`, `Immersif`, `Nav`), footer accueil, `CarteModele`.
   - `commander.astro` : **présélection du modèle** depuis `?modele=<slug>`
     (3 lignes de script). `modeles.ts` intact (`modelesPerso` sert au `<select>`).
   - Docs synchronisées : `CLAUDE.md` (section « Configurateur retiré »), HISTORIQUE.
   - **Ménage (2ᵉ commit, après confirmation explicite d'Alphim)** : suppression du
     code mort `Base.astro` + `Nav`/`Footer`/`CarteModele` (`Logo` et `IntroAnim`
     gardés exprès : marque + futur loader d'intro).
3. **Preuves** : `grep personnaliser src/` = 0 ; `astro check` = 57 erreurs, toutes
   préexistantes dans l'orphelin `IntroAnim.astro` (baseline inchangée) ; build 5
   pages OK ; plus de `/personnaliser` dans `dist/`.
4. **Push** : branche `feat/retrait-personnalisation` poussée sur GitHub (avec
   l'historique `fix/mobile` qu'elle contient). **Pas de déploiement Netlify** :
   la prod garde le lot `fix/mobile`.
5. **Allan** (`morjonallan@gmail.com`) : invitation GitHub toujours **en attente**
   (vérifiée via API) → brouillon Gmail préparé (lien d'invitation + lien de la
   branche), envoi à valider par Alphim.
6. **Ménage code mort** (accord explicite d'Alphim, commit `51b32ec`) : voir §2.
7. **Vitrine mobile** (« un format mobile qui garde la DA mais plus fonctionnel
   et attractif ») — branche **`feat/mobile-vitrine`**, audit `design-ui` 5 points
   validé puis implémenté :
   - hero mobile : titre d'abord, **arche du panneau conservée** (l'override
     40 px supprimé), visuel compact entre titre et CTA (zones `hero__head`/`hero__body`) ;
   - CTA « Commander » permanent dans le header mobile (`.head-cta` n'est plus
     masqué, pointe sur `/commander`, tap ≥ 44 px, burger 44 px) ;
   - collection ≤ 700 px : **carrousel scroll-snap** plein-bleed (cartes 72 %,
     aperçu de la suivante), prix en gras encre ;
   - avis mobiles : flèches masquées (hack `-68px` supprimé), cartes 88 % avec
     peek, **points indicateurs** synchronisés au scroll (`data-avis-dots`) ;
   - craft : `:focus-visible` global (Vitrine), newsletter 16 px anti-zoom iOS.
   Preuves : check 57 erreurs préexistantes (IntroAnim), build 5 pages, markup
   vérifié dans `dist/` + preview. ⚠️ Vérif visuelle sur device à faire par
   Alphim (pas de navigateur headless dispo dans l'environnement WSL).
8. **Déploiement prod Netlify** (confirmation explicite d'Alphim) : build
   `feat/mobile-vitrine` → smoke tests OK (`/` 200 + nouveau markup,
   `/personnaliser` 404, `/commander` 301→200). La prod saute donc de
   `fix/mobile` à retrait+ménage+mobile d'un coup.
9. **Captures Playwright débloquées SANS sudo** : `sudo` interdit (permissions +
   pas de TTY pour `!`) → libs manquantes (`libnspr4`, `libnss3`, `libasound2t64`)
   récupérées via `apt-get download` + `dpkg -x` + `LD_LIBRARY_PATH` (recette en
   mémoire Claude). ⚠️ capturer avec `reduced_motion` sinon les sections `.reveal`
   paraissent vides en full-page. QA visuelle 390×844 → 2 finitions
   (commit `5791262`) : titre hero 8.4vw (le CTA repasse au-dessus du pli),
   badge « Pièces uniques » centré au sommet de l'arche (il était rogné par la
   courbe). **Redéployé en prod** (accord Alphim) et vérifié par capture.
10. **Mobile validé par Alphim** (« c'est bon pour moi ») + **2ᵉ mail à Allan**
   (brouillon en réponse au fil du matin, le 1ᵉʳ mail a bien été envoyé) :
   mobile prêt/déployé, « modifie toi-même si ça ne convient pas », rappel
   invitation GitHub **toujours pas acceptée** + pas de CI (déploiement manuel).

### 2026-07-04 — Skill audit-projet + audit + QA mobile Firecrawl + lot `fix/mobile` déployé en prod

Session en 4 temps :

1. **`/init`** : `CLAUDE.md` re-vérifié contre le code — 2 mises à jour (la refonte
   DA n'était plus « non commitée » ; ajout du bloc **dépôt distant & Netlify** :
   dépôt privé, pas de CI, déploiement = acte manuel avec accord).
2. **Skill `audit-projet`** créé (généralisation du gabarit `audit.md` 9MM) :
   version fonctionnelle projet `.claude/skills/audit-projet/`, **globale WSL**
   `~/.claude/skills/audit-projet/` (tous projets), copie Windows
   `C:\Users\33648\.claude\skills\`, copie **visible** à la racine `audit-projet/`
   (les dossiers `.claude` sont cachés dans l'explorateur — demande d'Allan).
   Exécuté → **`AUDIT_ACIDULE_ETAT.md`** (constats notables : `IntroAnim`/`CarteModele`
   **orphelins**, formulaire commander qui n'envoie rien — `commander.astro:74-78`,
   images lourdes). Copie déposée dans `E:\Claude\Claude_Code\Audit_Resum\`.
3. **QA mobile Firecrawl** (« la version mobile est une catastrophe ») : navigateur
   piloté en 390×844 sur les 6 pages du site en ligne (captures avant/après scroll,
   mesures DOM, poids réseau). **Causes racines identifiées** :
   - C-1 : fiche détail `/mes-creations` cassée — `ouvrirDetail()` posait des
     **largeurs desktop en inline** (40 %/60 %, `xPercent:24`) qui écrasaient la
     media query ≤ 760 px (`mes-creations.astro:375-377`) ; `fermerDetail()`
     laissait du 50 % inline → hero mobile cassé après un aller-retour.
   - C-2 : **~9,7 Mo** d'images PNG sur la home (hero 4,7 Mo affiché ~330 px).
   - C-3 : **aucun contrôle tactile** sur le split-screen (molette/clavier/clic).
   - M-1 : bouton « Découvrir → » coupé (right 409 px / écran 390) ; M-2 titres
     collés aux contrôles. Pages personnaliser/commander/atelier/éditions : OK.
4. **Lot `fix/mobile`** (branche dédiée, commit `1620ec3`) :
   - `mes-creations` : détail mobile animé en **hauteurs** (photo zone couleur en
     haut, fiche crème pleine largeur en bas), `clearProps` à la fermeture, reset
     propre au changement de breakpoint, **swipe vertical** (`pointerdown/up`,
     seuil 48 px, `touch-action`), contrôles compactés sous 760 px, fiche
     scrollable si trop haute.
   - **Images WebP** via `_webp_mobile.cjs` (sharp) : hero 4 684→**54 Ko**, about
     2 420→151 Ko, logo 435→18 Ko (160 px), collection + `accueil-*` converties ;
     réfs màj dans `index`/`editions-speciales`/`mes-creations`/`modeles.ts`.
     **Home : ~9,7 Mo → 564 Ko mesurés.** (PNG d'origine conservés, ménage à valider.)

**Preuves** : `astro check` (les 57 erreurs restantes = préexistantes, toutes dans
l'orphelin `IntroAnim.astro`), build 6 pages, preview + curl 200 sur les 10 WebP,
**déploiement draft Netlify** re-testé par la même batterie Firecrawl (bouton dans
l'écran, plus de chevauchement, panneau crème pleine largeur, inline nettoyé,
swipe synthétique compteur 1→2), puis **`netlify deploy --prod`** + smoke-check.

**À savoir pour la reprise** : `fix/mobile` **non poussée** sur GitHub ;
`AUDIT_ACIDULE_ETAT.md`, `CLAUDE.md` modifié et `.claude/`+`audit-projet/` encore
**non commités** ; sur téléphone la molette n'existe pas → navigation split-screen
= swipe + flèches ; le sandbox `firecrawl interact` est **async** (Python `await`,
pas de top-level await en Node).

### 2026-07-03 — Dépôt privé + collaborateur Allan (admin) + mise en ligne Netlify + commit du lot vitrine
Demande d'Allan : « crée/push un git privé, donne l'accès à mon associé Allan
(morjonallan@gmail.com), puis push le site sur Netlify ». Démarrage `/init` en amont :
le `CLAUDE.md` avait dérivé (il décrivait encore l'accueil comme « home split
éditorial » Immersif et `Base` pour toutes les pages sauf index/mes-creations) →
actualisé pour les **4 layouts réels** (`Vitrine`/`PageVoeu`/`Immersif`/`Base`) et le
mapping page→layout, + note visuels d'accueil (`hero-crochet.png` etc.).

**Fait (dans l'ordre, avec preuve) :**
1. **Constat** : un dépôt GitHub **existait déjà** et était **PUBLIC**
   (`AmarokRa/atelier-acidule`), exposant les assets cliente. Choix validé par Allan :
   **rendre l'existant privé** (plutôt qu'un nouveau dépôt qui aurait laissé l'ancien exposé).
2. **Passage en privé** via `gh api -X PATCH /repos/AmarokRa/atelier-acidule -f visibility=private`
   (le flag `--accept-visibility-change-consequences` n'existe pas sur `gh` 2.45). Vérifié `private: true`.
3. **Commit + push** du lot DA « vitrine » (`848a8f5`, refonte layouts + sync docs) sur `feat/refonte-accueil`.
4. **Collaborateur Allan** : ⚠️ en CLI, GitHub invite par **pseudo**, pas par email
   (`morjonallan@gmail.com` inutilisable tel quel). Allan a fourni le pseudo **`Allan77bot`**
   → `gh api -X PUT …/collaborators/Allan77bot -f permission=admin` (droit **admin**, « tout
   faire »). Invitation confirmée **en attente** (à accepter par Allan).
5. **Netlify** : CLI authentifié (`isaiah.blackcrow@gmail.com`, team `isaiah-blackcrow`).
   `npm run build` OK (6 pages) → `netlify sites:create --name atelier-acidule` (pris →
   `atelier-acidule-498`) → `netlify deploy --prod --dir=dist`. Vérifié : **HTTP 200**,
   `<title>Accueil · Atelier Acidulé</title>`. **URL : https://atelier-acidule-498.netlify.app**.
6. **Fin de session** : `.netlify` (ajouté au `.gitignore` par Netlify) commité avec cette trace.

**À savoir pour la reprise :** dépôt **privé** ; Allan admin **dès qu'il accepte** l'invit ;
site en ligne sur Netlify en **déploiement manuel CLI** (re-déployer = `netlify deploy --prod --dir=dist`
après `npm run build`) ; pas de CI git connectée.

### 2026-07-02 — Preview + trace (nouvelle DA « vitrine » d'après les maquettes)
Session ouverte sur un `/clear` avec un **gros lot non commité** déjà en place ;
contexte effacé → trace **reconstituée d'après le diff** (pas de journal en mémoire
de ce qui a été fait ce jour-là). Demande d'Allan : « lance la preview et mets à
jour l'historique ».

**Constat via lecture code/diff** — une **nouvelle direction artistique « vitrine »**
(scroll classique, police **Archivo** display capitales + Nunito corps) est apparue,
calquée sur les maquettes `Ref/_preview/AtelierAcidule_ref.jpeg` (référence) et
`AtelierAcidule_voeu.jpeg` (DA « voeu »). Deux **nouveaux layouts** :
- `src/layouts/Vitrine.astro` — coquille des pages vitrine longues (head + polices
  Archivo/Nunito + primitives `.btn-pill`/`.eyebrow`/`.display`) ; **chaque page rend
  son propre header/footer** pour coller pixel-près à sa maquette (pas de Nav/Footer partagés).
- `src/layouts/PageVoeu.astro` — enveloppe `Vitrine`, ajoute header vert sombre +
  footer nav commun (DA « voeu »).

**Recâblage des pages** : `index.astro` **quitte `Immersif` pour `Vitrine`** (retour à
une page vitrine longue : `hero` texte+CTA+atouts+panneau visuel, puis `cta-band` ;
+644/-… lignes). `atelier`, `commander`, `editions-speciales` **passent de `Base` à
`PageVoeu`**. Inchangés : `mes-creations` (toujours `Immersif` split-screen GSAP),
`personnaliser` (toujours `Base`). Nouveaux visuels `public/images/hero-crochet.png`
+ `about-atelier.png` ; `logo.png` remplacé (627 Ko → 445 Ko). `.gitignore` +
`.firecrawl/`. `CLAUDE.md` retouché (note README périmé, `sharp` transitif, pas de lint).

**Fait cette session** : `npm run build` **OK (6 pages, ~6 s)**. Preview lancée —
`npm run preview` sur **http://localhost:4321/**, les **6 routes répondent 200**
(`/`, `/mes-creations`, `/personnaliser`, `/atelier`, `/commander`, `/editions-speciales`).
⚠️ Gotcha : le serveur meurt si lancé « en background » via `&` (tué au retour de tâche) ;
il faut le **détacher** (`setsid nohup npm run preview &`) pour qu'il survive entre les tours.

**⚠️ Toujours NON commité** — le lot « vitrine » entier reste dans le working tree
(pas de commit ce jour) : `index/atelier/commander/editions-speciales.astro`,
`Vitrine.astro`, `PageVoeu.astro`, `hero-crochet.png`, `about-atelier.png`, `logo.png`,
`.gitignore`, `CLAUDE.md`. À valider visuellement par Allan puis commiter.

### 2026-06-27 (bis) — /init (sync CLAUDE.md) + mise en ligne GitHub publique
**`/init`** : le `CLAUDE.md` avait dérivé. Constat via lecture du code : le commit
`1ae2197` a **déplacé le split-screen de `index.astro` vers `mes-creations.astro`** et
créé une **home éditoriale** dans `index.astro` ; nouvelle branche `feat/refonte-accueil`
(≠ `feat/refonte-split-screen` du doc) ; nouveaux visuels `accueil-hero.png` +
`accueil-mini-1/2/3.png` ; nouveau `CONTEXTE-PROJET.md`. CLAUDE.md actualisé en
conséquence (pages, layouts, familles d'images, section archi renommée « split-screen
(/mes-creations) », branche git). Commit `1a482ce`.

**Mise en ligne GitHub** : repo **inexistant** (aucun remote). Allan demande « pousse
le guide, mets en public, envoie le lien ». ⚠️ Signalé que public = exposition des
assets cliente (`Ref/PhotoClient`, `Ref/VideoClient`). Allan confirme « tout en public »
→ tentative `gh repo create --public` **bloquée en dur par le classifieur auto-mode**
(exfiltration de données sensibles, non levable par l'autorisation conversationnelle).
Allan choisit alors l'**option privée** : `gh repo create atelier-acidule --private`
créé + push de `feat/refonte-accueil` (défaut) et `main`. Puis Allan **passe lui-même
en public** via `! gh repo edit … --visibility public` (le flag `--accept-visibility-…`
n'existe pas sur sa version de `gh`). Vérifié : **visibilité = PUBLIC**.
URL : https://github.com/AmarokRa/atelier-acidule
Diligence faite avant push : `.gitignore` couvre `node_modules`/`dist`/`.env`, aucun
fichier tracké ≥ 50 Mo, vidéos = 1-2 Mo (pas de souci de limite GitHub).

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
