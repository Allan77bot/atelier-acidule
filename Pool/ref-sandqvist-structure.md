# Référence structure — site SANDQVIST (vidéo du 2026-06-26)

> Source : enregistrement d'écran fourni par Allan
> (`.../Enregistrement de l'écran 2026-06-26 155951.mp4`, 4,7 Mo).
> Analyse multimodale déléguée à Gemini via le skill `regarder-video` (File API,
> car fichier local). Objectif d'Allan : **reproduire exactement cette structure**
> pour le site Atelier Acidulé, en réinjectant les photos client de `Ref/PhotoClient`.
> Statut : **référence d'analyse — design non encore validé, rien codé.**

---

## 1. Structure globale
- Pas une vitrine à scroll vertical classique : **expérience type SPA, 2 états plein écran** (`100vh`/`100vw`), sans scrollbar visible.
- **État 1 (Hero / sélecteur)** : split-screen **50vw / 50vw**. Gauche blanc `#FFFFFF`, droite = couleur du produit sélectionné.
- **État 2 (fiche produit)** : grille asymétrique **~40vw (gauche) / 60vw (droite)**. Gauche fond gris très clair `#F4F4F4` (vignettes + texte), droite garde la couleur du modèle.
- Passage d'un état à l'autre = transition d'écran globale (clic ou scroll), pas de défilement fluide traditionnel.

## 2. Navigation / UI fixe (z-index élevé)
- **Header** : logo "SANDQVIST" noir, sans-serif fin, capitales, fort letter-spacing (gauche) ; burger 3 lignes blanches (droite).
- **Footer** : module "NEXT COLOUR" (2 flèches haut/bas dans un cercle fin + label capitales) à gauche ; bouton "MORE DETAILS" plein (couleur assortie, texte blanc) à droite — disparaît en État 2.

## 3. Sections (états)
- **État 1 Hero (00:00–00:06)** : sac centré pile sur la ligne de séparation. Gauche = nom produit "MARIUS" noir, énorme, condensé, capitales. Droite = nom de la couleur (MAROON/BLUE/BELUGA) même style en blanc. Couleurs droite : bordeaux `#5E1924` → marine `#1F2D3D` → olive/beluga `#4A4E3A`.
- **État 2 Fiche (00:07–00:09)** : gauche (40vw) gris clair — galerie verticale de 3 vignettes + bloc texte aligné gauche (surtitre "100% ORGANIC COTTON", titre "MARIUS BELUGA", prix "199.00 GBP", description 4 lignes, bouton noir "BUY NOW"). Droite (60vw) garde la couleur, sac présenté à 3/4 plus grand, glissé à droite.

## 4. Animations & interactions (le cœur)
- **Changement de couleur (00:00–00:05)** : déclenché par flèches "NEXT COLOUR" ou scroll. Fond droit = **balayage vertical** (slide up/down) de la nouvelle couleur, ~0.6s, easing `power3.out`. Texte couleur glisse en sens inverse dans un masque (overflow hidden). Sac : léger **scale (zoom/dézoom) + crossfade** rapide, pas un simple fade.
- **Vers État 2 "More Details" (00:06–00:09)** : (1) la ligne de séparation se décale 50/50 → 40/60 ; (2) le sac de face slide à droite, le sac 3/4 arrive depuis la droite ; (3) textes gauche en **reveal par le bas, ligne par ligne (stagger)** ; (4) vignettes glissent depuis l'extérieur gauche avec amorti.
- **Transition "slice/shutter" (00:18)** : volets horizontaux noir/blanc balayant l'écran (masque cinétique, côté défilé de mode).
- **Intro / loader (00:21)** : écran gris, logo "SANDQVIST" centré, puis **split reveal** : les deux pans (blanc + couleur) se déploient du centre vers les bords pendant que le logo s'efface.

## 5. Ressenti
Premium, minimaliste, éditorial. Dynamisme = **contraste** (blanc pur vs couleurs sourdes denses ; sac stable au centre pendant que tout glisse autour). Transitions rapides mais douces, easing « physique » (poids réel).

## 6. Stack recommandée par l'analyse
- **GSAP** (indispensable) : `Flip` pour la transition des éléments qui changent de taille/place (la ligne 50/50 → 40/60), `ScrollTrigger` si on lie au scroll.
- **Lenis** (Studio Freight) : capter le scroll et le transformer en transitions fluides, sans scrollbar.
- Transition shutter (00:18) : `clip-path` animé par GSAP, ou `<canvas>`/shader WebGL.
- Images : **même ratio, détourées au pixel près (WebP transparent)** pour éviter tout décalage lors des scale/crossfade. → skill `DelBackground` dispo.
