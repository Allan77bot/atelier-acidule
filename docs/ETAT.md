# 🗺️ ÉTAT DU PROJET — Atelier Acidulé

> Photo de l'instant. **Se réécrit** à chaque fin de session. Historique détaillé = `JOURNAL.md`.
> ⚠️ Ce fichier **double `../HISTORIQUE.md`** (section « 📌 État actuel ») : tenir les deux synchro.
> Dernière mise à jour : **2026-06-27** (fin de session, avant `/clear`).

## 🟢 OÙ ON EN EST (en 3 lignes)

1. **Refonte faite** : vraie landing page + `/mes-creations` en scroll + **personnalisation supprimée**.
2. **En ligne** : https://atelier-acidule.netlify.app · **code commité + poussé sur GitHub** · docs à jour.
3. Tout est **sauvegardé et synchronisé** — prêt pour une reprise à froid.

## 👉 REPRISE IMMÉDIATE (à lire en premier)

**Phase = refonte terminée, vérifiée, déployée, poussée. Rien en suspens côté code.**
Au prochain démarrage :
1. Lire `CLAUDE.md` (à jour) + ce fichier + `../HISTORIQUE.md`, puis **créer/choisir une branche dédiée** pour la nouvelle préoccupation.
2. Si Allan a des retours visuels après avoir regardé https://atelier-acidule.netlify.app → les traiter.
3. Déploiement = **manuel** : après toute modif validée, rebuild + `netlify deploy --prod --dir=dist`. (L'auto-deploy Netlify↔GitHub n'est pas branché — Allan le fera quand il voudra ; `netlify.toml` est prêt.)

## ✅ Fait (jalons — détail dans JOURNAL.md)

- Scaffold Astro + design system (`global.css` + `polish.css`).
- **Landing `/index`** (layout Base, Nav verte + Footer) : hero sac flottant + halo, 3 valeurs, aperçu catalogue (4 cartes), teasers atelier & éditions, bandeau final. CTAs « Commander » → **DM Instagram**.
- **`/mes-creations`** en **scroll-snap plein écran** : 1 sac = 1 section couleur, texte blanc lisible (**plus de rectangle blanc**), indicateur « Défiler ↓ », **plus de boutons/flèches/GSAP**, lien « Commander en DM ».
- **Personnalisation supprimée** : `/personnaliser`, `Configurateur`, `CarteModele`, 9 calques `sim-*.png` ; liens « Personnaliser »/« SHOP TON SAC » → Instagram.
- **Menu mobile** : liens en vert sapin (lisibles sur le panneau crème).
- Sacs détourés (rembg) partout — plus aucun fond carré.
- **`CLAUDE.md` actualisé** (landing, scroll, suppression perso, déploiement Netlify, gotcha Windows).
- **`gsap` + `lenis` désinstallés** (inutilisés) → seule dépendance : `astro`.
- Build vert (5 pages), 0 erreur console, 0 débordement (390 + 1440), vérifié au navigateur.
- 2 workflows multi-agents (ultracode) : implémentation par lots disjoints + revue adversariale.

## 🔄 En cours / à venir (idées, rien d'urgent)

- Validation visuelle d'Allan ; brancher l'auto-deploy Netlify↔GitHub (Allan).
- Exploiter `Ref/catalogue/` (27 photos) ; slogans/wording ; paiement en ligne (plus tard).
- Quand validé : merger `feat/refonte-accueil` → `main` et y pointer la prod Netlify.

## 🚧 Blocages / en attente

- ⏳ Auto-deploy non branché → déploiements **manuels** en attendant.
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

- Repo : `github.com/Allan77bot/atelier-acidule` (origin) — branche **`feat/refonte-accueil`** (**à jour, poussée, synchronisée**). `main` = ancienne vitrine.
- **En ligne : https://atelier-acidule.netlify.app** (Netlify, site `atelier-acidule`, deploy **CLI manuel**).
- Serveur local : `npm run dev` → http://localhost:4321 (⚠️ après grosses modifs/suppressions, **redémarrer** le serveur — overlay HMR périmé sinon).
- Captures : `docs/audit-shots/` (gitignoré).

## 📄 Docs clés

`JOURNAL.md` · `../HISTORIQUE.md` · `../CLAUDE.md` · `../CONTEXTE-PROJET.md`
