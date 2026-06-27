# 🗺️ ÉTAT DU PROJET — Atelier Acidulé

> Photo de l'instant. **Se réécrit** à chaque fin de session. Historique détaillé = `JOURNAL.md`.
> ⚠️ Ce fichier **double `../HISTORIQUE.md`** (section « 📌 État actuel ») : tenir les deux synchro.
> Dernière mise à jour : **2026-06-27**.

## 🟢 OÙ ON EN EST (en 3 lignes)

1. Site vitrine Astro en prod-démarrée ; **passe qualité mobile-first + premium** faite sur `feat/refonte-accueil`.
2. **En ligne : https://atelier-acidule.netlify.app** (deploy CLI manuel du `dist/`). Dev : `http://localhost:4321`.
3. Prochaine grande étape : **validation visuelle d'Allan** sur la passe qualité, puis nettoyage assets + configurateur (Allan).

## 👉 REPRISE IMMÉDIATE (à lire en premier)

**Phase = passe qualité terminée et vérifiée (branche `feat/refonte-accueil`), NON commitée.**
5 correctifs implémentés + revue adversariale 5 agents passée + revérifiés au navigateur (build vert,
0 erreur console, 0 débordement). Au prochain démarrage :
1. Faire **valider visuellement** la passe par Allan (home mobile, `/mes-creations`, `/atelier`).
2. Après validation : supprimer (via trash, avec accord) les **assets orphelins** : `accueil-{petit-sac,pochette-livres,grand-sac,editions-speciales}.png` + les **originaux à fond** `accueil-mini-1/2/3.png` (remplacés par leurs versions `-detoure`). ⚠️ `accueil-hero.png` reste utilisé (bannière `/atelier`).
3. Remplacer la photo `/atelier` (réutilise `accueil-hero.png` à fond = même visuel que la home) par une photo distincte de `Ref/catalogue/` (ou la détourer aussi).
4. Puis : configurateur (Allan), slogan/CTA « Shop ton sac », harmonisation des en-têtes.

## ✅ Fait (jalons — détail dans JOURNAL.md)

- Scaffold Astro (config + design system + pages + composants).
- **Configurateur PNG** (masque + dégradé, couleurs illimitées).
- **Split-screen** SANDQVIST-like (GSAP) sur `/mes-creations` ; **home « split éditorial »** sur `/index`.
- 3 familles d'images de sacs (détourées / accueil recolorisé / calques `sim-*`).
- **Passe qualité (27/06)** sur `feat/refonte-accueil` :
  - Home **scrollable sur mobile** (overflow `:hidden` rendu conditionnel via prop `fixe` d'`Immersif` ; seul `/mes-creations` est `fixe`).
  - Barre de contrôle `/mes-creations` **réparée en mobile** (colonne, bouton dans le viewport, 0 débordement).
  - **Fin de l'effet « rectangle »** : sacs **détourés** (`m.photo`) sur panneau coloré + ombre portée CSS (au lieu des `accueil-<slug>.png` recolorés).
  - Typo titres **resserrée** (`letter-spacing` négatif h1/h2).
  - Couche **`polish.css`** premium (halo de fond, liseré citron des sur-titres, ombre carte) + **photo bannière `/atelier`**.
  - **Home sans bloc photo** : sac héros + 3 vignettes **détourés** (rembg `isnet-general-use`), posés sur le crème continu (halo citron + ombre) → plus aucun fond carré.
  - Flèches `.arrow` passées à **44px** (cible tactile).
  - **Revue adversariale 5 agents** (mobile, a11y, spécificité CSS, premium, assets) → 5 vrais correctifs appliqués (pièges de spécificité Astro).

## 🔄 En cours / à venir

- **Validation visuelle d'Allan** sur la passe qualité.
- Nettoyage des 4 assets orphelins (après validation).
- Photo `/atelier` distincte (catalogue).
- Slogan citron + CTA « Shop ton sac » ; harmonisation des 2 en-têtes ; Lenis + loader intro ; exploiter `Ref/catalogue/`.

## 🚧 Blocages / en attente

- ⏳ **Configurateur** : Allan le refait lui-même (rendu « photo recolorée » non validé) — **non touché**.
- ⏳ **assets orphelins** (plus référencés) : `accueil-{petit-sac,pochette-livres,grand-sac,editions-speciales}.png` + `accueil-mini-1/2/3.png` (originaux) → à supprimer après validation.
- ⏳ Photo `/atelier` = redite de la home : à remplacer.
- ⏳ À confirmer cliente : nb couleurs max (présumé 3), structure éditions, logo SVG, mapping prix, canal de commande.
- ⏳ Paiement : plus tard.

## 🧱 Décisions verrouillées

- Stack **Astro** ; commerce **hybride** (vitrine, paiement plus tard, commande on-site).
- Identité Italie/Méditerranée ; palette sauge/sapin + citron + terracotta sur crème ; Playfair + Fraunces + Nunito.
- **Premium ≠ plat** : finition via couche `polish.css` chargée en dernier (réf. kit PILOTE).
- 2 blocs interactifs : split-screen (`/mes-creations`) + Configurateur (`personnaliser`).
- **`Immersif` plein écran sans scroll = opt-in** (prop `fixe`), pas le défaut.

## 👥 Qui fait quoi

| Personne | Rôle |
|---|---|
| **Allan** | Pilote le projet, le code et la relation cliente |
| **Cliente (Atelier Acidulé)** | Crée les sacs ; valide produit/identité ; compose les éditions |
| **Associé** | Retours qualité (premium, vendeur) |

## 🌿 Git / liens

- Repo : `github.com/Allan77bot/atelier-acidule` (origin) — branche **`feat/refonte-accueil`** (changements **non commités / non poussés**). `main` = ancienne vitrine.
- **En ligne : https://atelier-acidule.netlify.app** (Netlify, site `atelier-acidule`, deploy **CLI manuel** du `dist/` — pas encore de déploiement continu git).
- Serveur local : `npm run dev` → http://localhost:4321
- Captures avant/après : `docs/audit-shots/`

## 📄 Docs clés

`JOURNAL.md` · `../HISTORIQUE.md` · `../CLAUDE.md` · `../CONTEXTE-PROJET.md`
