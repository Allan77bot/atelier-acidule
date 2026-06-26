# Atelier Acidulé — site vitrine

Site vitrine **Astro** pour Atelier Acidulé : sacs et accessoires au crochet
faits main, **sur commande**, dans la couleur choisie par la cliente.
Commerce **hybride** : vitrine d'abord, paiement en ligne branché plus tard ;
la commande reste sur le site, le SAV/FAQ passe par les DM Instagram.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
```

Autres scripts : `npm run build` (prod → `dist/`), `npm run preview`,
`npm run check` (diagnostics Astro).

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/pages/index.astro` | Accueil (hero, modèles, bloc perso, teaser éditions) |
| `src/pages/personnaliser.astro` | Studio de personnalisation (configurateur) |
| `src/pages/editions-speciales.astro` | Galerie de pièces uniques |
| `src/pages/atelier.astro` | Histoire de la marque + contact/commande |
| `src/pages/commander.astro` | Formulaire de commande on-site (placeholder) |
| `src/components/Configurateur.astro` | Îlot interactif : sac SVG recolorable |
| `src/data/modeles.ts` | Catalogue (nom, prix, anse, photo) |
| `src/styles/global.css` | Tokens couleur/typo + utilitaires |
| `public/images/` | Photos de prod (copiées depuis `Ref/PhotoClient`) |

## Reste à faire (mise en route)

1. **Copier les photos** depuis `Ref/PhotoClient` vers `public/images/`
   (le code attend ces noms) :

   ```powershell
   $src = "Ref\PhotoClient"; $dst = "public\images"
   New-Item -ItemType Directory -Force $dst | Out-Null
   Copy-Item "$src\Logo_AtelierAcidule.png" "$dst\logo.png" -Force
   Copy-Item "$src\Mosaique_citron.jpg"     "$dst\mosaique-citron.jpg" -Force
   Copy-Item "$src\PetitSac (1).png"        "$dst\petit-sac.png" -Force
   Copy-Item "$src\CouvreLivre (1).png"     "$dst\pochette-livres.png" -Force
   Copy-Item "$src\SacBandoulière (1).png"  "$dst\grand-sac.png" -Force
   Copy-Item "$src\SacBandoulière (2).png"  "$dst\edition-speciale.png" -Force
   ```

2. `npm install` puis `npm run dev`, et vérifier le rendu.
3. Affiner le visuel d'après la maquette validée.
4. Plus tard : back-end commande + paiement (commerce hybride).

> `Ref/` = **références d'entrée** (photos/vidéos client), pas des assets de prod.
> Ne pas modifier `Ref/`. Et rappel : `E:\Git` = install Git, **interdit**.
