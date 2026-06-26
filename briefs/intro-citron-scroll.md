# Brief anim — Intro scrollée « Citron → Pelote → Tricot → Atelier Acidulé »

- **Support :** web (Astro, CSS/JS vanilla)
- **Univers :** Atelier Acidulé — citron acidulé, Méditerranée chaleureuse, crochet fait main
- **Placement :** Pré-intro avant l'entrée du site. Déclenchée au premier scroll. Fond sapin (`#2f4334`).
- **Intention :** Raconter la métaphore de la marque en 3 actes (citron → fil → tricot du nom) pour atterrir sur le site. Premium, chaleureux, narratif.

## Termes validés

| Catégorie | Terme exact | Rôle dans la scène |
|-----------|-------------|--------------------|
| Structure | Reveal on scroll (par étape) | Chaque phase se déclenche quand la précédente est terminée + l'utilisateur continue à scroller |
| Transition | Wipe / Clip-path masking | Le citron se coupe en deux : clip-path du centre vers la gauche et la droite |
| Motion | Scroll-driven animation | L'avancée du scroll pilote la progression de toute la séquence |
| Transition | Crossfade | Le jus jaune s'estompe pendant que la pelote de laine apparaît |
| Transition | Match Cut | Le filet de jus se termine là où commence la pelote — raccord visuel |
| Motion | Kinetic Typography + Stagger | Le fil de laine « tricote » les lettres de « Atelier Acidulé » une par une |
| Transition | Scale (Zoom) + Match Cut | Le texte zoomé remplit l'écran et devient le header/hero du site |
| Ressenti | Easing sobre & doux | `cubic-bezier(0.25, 1, 0.5, 1)` — premium, méditerranéen posé |
| Technique | SVG inline + JS | Chaque élément (citron, pelote, texte) est du SVG inline stylé/anime en JS |

## Définitions de référence

> **Reveal on scroll (par étape)** — l'élément apparaît quand une condition de scroll/viewport est atteinte. Ici : chaque phase se déclenche successivement.
> **Wipe / Clip-path masking** — une forme géométrique qui s'ouvre pour révéler ou séparer un élément. Le citron : `clip-path: inset(0 50% 0 0)` et `clip-path: inset(0 0 0 50%)` qui s'animent.
> **Scroll-driven animation** — chaque frame de l'animation est liée à une position de scroll précise.
> **Crossfade** — deux éléments se fondent via l'opacité. Le jus → pelote : opacité 1→0 pendant que la pelote fait 0→1.
> **Match Cut** — raccord visuel entre deux éléments qui se ressemblent (le filet jaune du jus → le fil de laine de la pelote).
> **Kinetic Typography** — typographie animée avec mouvement. Chaque lettre tracée comme si le fil la dessinait.
> **Stagger** — apparition en cascade avec micro-délai entre chaque lettre.
> **Scale / Zoom** — l'élément grandit de sa taille normale jusqu'à remplir l'écran.
> **Easing sobre & doux** — `cubic-bezier(0.25, 1, 0.5, 1)` : ralentit en fin de course, sensation naturelle et premium.

## Hors-lexique / notes

- **Jus qui coule** (1C) : pas de terme exact. Rendu réalisé avec une animation CSS de goutte/trait jaune qui descend (SVG path + `stroke-dashoffset` ou particules limitées). Terme proche retenu : particules CSS / path drawing.
- **Tricotage des lettres** (1E) : rendu via `stroke-dasharray` + `stroke-dashoffset` sur des paths SVG des lettres, chaque lettre avec un stagger. Visuellement = le fil "dessine" la lettre.

## Déroulé de la scène (langage lexique)

**Phase 0 — État initial**
Fond sapin (`#2f4334`) plein écran. Un citron (même DA que le logo Atelier Acidulé) centré verticalement et horizontalement. Invisible au départ.

**Phase 1 — Apparition du citron (Reveal on scroll)**
L'utilisateur commence à scroller. Le citron apparaît via Reveal on scroll : opacité 0→1, scale 0.8→1. Easing sobre & doux. Le citron est maintenant visible, plein écran, seul sur fond sapin.

**Phase 2 — Le citron se coupe en deux (Wipe / Clip-path)**
L'utilisateur continue à scroller. Le citron se sépare en deux moitiés :
- Moitié gauche : `clip-path: inset(0 50% 0 0)` + translateX vers la gauche
- Moitié droite : `clip-path: inset(0 0 0 50%)` + translateX vers la droite
Les deux moitiés s'écartent lentement, révélant l'intérieur du citron (couleur citron `#f4cf3f`).

**Phase 3 — Le jus coule (Particules / SVG path)**
Pendant que les moitiés s'écartent, un filet de jus citron descend du centre. Rendu via un path SVG animé (`stroke-dashoffset`) qui descend verticalement.

**Phase 4 — Le jus devient pelote de laine (Crossfade + Match Cut)**
Quand le filet atteint le bas, Crossfade : le filet s'estompe pendant qu'une pelote de laine (aux couleurs sauge/citron) apparaît à la même position. Match Cut visuel : le jaune du jus est repris par le fil de la pelote.

**Phase 5 — Tricotage du nom (Kinetic Typography + Stagger)**
La pelote émet un fil qui commence à tracer les lettres de « Atelier Acidulé ». Chaque lettre est un path SVG qui se dessine via `stroke-dasharray`/`stroke-dashoffset`. Les lettres apparaissent en Stagger (de gauche à droite, micro-délai entre chaque). Easing sobre & doux.

**Phase 6 — Zoom dans le site (Scale + Match Cut)**
Une fois le nom entièrement tricoté, un Zoom avant (Scale) fait grandir le texte jusqu'à remplir l'écran. Match Cut : le texte zoomé atterrit sur la navbar/hero du site (fond crème, nav sapin). L'utilisateur est maintenant dans le site.

## Éléments SVG nécessaires

1. **Citron** — SVG du citron logo (forme ovale + feuille), découpable en deux moitiés
2. **Filet de jus** — path SVG vertical, couleur `#f4cf3f`
3. **Pelote de laine** — SVG circulaire avec texture de fil enroulé, couleurs sauge + citron
4. **Texte « Atelier Acidulé »** — chaque lettre en path SVG séparé (pour le stroke-dasharray individuel)

## Contraintes techniques

- Scroll-driven mais avec des seuils (pas de scrub continu) — chaque phase se déclenche quand on atteint un point de scroll, puis la phase suivante attend le scroll suivant
- Compatible mobile (touch)
- `prefers-reduced-motion` : tout l'intro est sauté, l'utilisateur arrive direct sur le site
- z-index : l'intro est au-dessus du site, puis se retire quand le zoom est terminé
