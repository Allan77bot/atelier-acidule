# 🗺️ ÉTAT DU PROJET — Atelier Acidulé

> Photo de l'instant. **Se réécrit** à chaque fin de session. Historique détaillé = `JOURNAL.md`.
> ⚠️ Ce fichier **double `../HISTORIQUE.md`** (section « 📌 État actuel ») : tenir les deux synchro.
> Dernière mise à jour : **2026-06-27**.

## 🟢 OÙ ON EN EST (en 3 lignes)

1. **Refonte faite** : vraie landing page + `/mes-creations` en scroll + **personnalisation supprimée**.
2. **En ligne** : https://atelier-acidule.netlify.app (déploiement CLI manuel du `dist/`).
3. Prochaine étape : **validation visuelle d'Allan**, puis mise à jour du `CLAUDE.md` (devenu périmé par la refonte).

## 👉 REPRISE IMMÉDIATE (à lire en premier)

**Phase = refonte complète terminée et vérifiée (branche `feat/refonte-accueil`), commitée en local NON poussée.**
Au prochain démarrage :
1. **Valider visuellement** la refonte avec Allan (home, `/mes-creations` scroll, lisibilité).
2. **Mettre à jour `CLAUDE.md`** : il décrit encore le configurateur (supprimé), l'ancienne home éditoriale et le split-screen GSAP avec mode détail (remplacé par du scroll-snap). → lancer `/init` ou une passe de mise à jour.
3. Brancher l'auto-deploy Netlify↔GitHub (qu'Allan fera lui-même) ; en attendant, redéployer en manuel après chaque modif (`netlify deploy --prod --dir=dist`).

## ✅ Fait (jalons — détail dans JOURNAL.md)

- Scaffold Astro + design system (`global.css` + `polish.css`).
- **Landing `/index`** (layout Base, Nav verte + Footer) : hero sac flottant + halo, 3 valeurs, aperçu catalogue (4 cartes), teasers atelier & éditions, bandeau final. CTAs « Commander » → **DM Instagram**.
- **`/mes-creations`** refait en **scroll-snap plein écran** : 1 sac = 1 section couleur, infos écrites dessus (texte blanc lisible, **plus de rectangle blanc**), indicateur « Défiler ↓ » qui s'efface, **plus de boutons/flèches/GSAP**, lien discret « Commander en DM ».
- **Personnalisation supprimée** : page `/personnaliser`, composant `Configurateur`, `CarteModele` (mort), 9 calques `sim-*.png` retirés ; liens « Personnaliser » + « SHOP TON SAC » repointés sur Instagram.
- Sacs détourés (rembg) partout (home, créations, atelier) — plus aucun fond carré.
- Build vert (5 pages), 0 erreur console, 0 débordement, vérifié au navigateur (390 + 1440).
- 2 workflows multi-agents (ultracode) : implémentation par lots disjoints + revue adversariale.

## 🔄 En cours / à venir

- **Validation visuelle d'Allan** sur la refonte.
- **Mise à jour `CLAUDE.md`** (périmé).
- Auto-deploy Netlify↔GitHub (Allan le branchera) + `netlify.toml` déjà en place.
- Plus tard : exploiter le reste de `Ref/catalogue/`, slogans/wording, paiement en ligne.

## 🚧 Blocages / en attente

- ⏳ `CLAUDE.md` périmé (à actualiser).
- ⏳ Auto-deploy non branché (Allan le fera) → déploiements **manuels** en attendant.
- ⏳ À confirmer cliente : structure éditions, logo SVG, mapping prix, modalités de commande/paiement.

## 🧱 Décisions verrouillées

- Stack **Astro** ; commerce **hybride**, **commande = DM Instagram** (`@atelier_acidule`), paiement plus tard.
- **Personnalisation abandonnée** (plus de configurateur).
- Identité Italie/Méditerranée ; palette sauge/sapin + citron + terracotta sur crème ; Playfair + Fraunces + Nunito.
- **Home = landing classique** (layout Base, scroll). **`/mes-creations` = scroll-snap** (layout Immersif `fixe`, conteneur interne `.reel`).
- Premium ≠ plat : couche `polish.css` en dernier.

## 👥 Qui fait quoi

| Personne | Rôle |
|---|---|
| **Allan** | Pilote le projet, le code et la relation cliente |
| **Cliente (Atelier Acidulé)** | Crée les sacs ; valide produit/identité ; compose les éditions |
| **Associé** | Retours qualité (premium, vendeur) |

## 🌿 Git / liens

- Repo : `github.com/Allan77bot/atelier-acidule` (origin) — branche **`feat/refonte-accueil`** (commits **locaux non poussés** depuis la refonte). `main` = ancienne vitrine.
- **En ligne : https://atelier-acidule.netlify.app** (Netlify, site `atelier-acidule`, deploy **CLI manuel** — pas d'auto-deploy git).
- Serveur local : `npm run dev` → http://localhost:4321 (⚠️ après grosses modifs/suppressions, **redémarrer** le serveur sinon overlay HMR périmé).
- Captures : `docs/audit-shots/` (préfixes `refonte-*` pour la refonte).

## 📄 Docs clés

`JOURNAL.md` · `../HISTORIQUE.md` · `../CLAUDE.md` (⚠️ périmé) · `../CONTEXTE-PROJET.md`
