# 🗺️ ÉTAT DU PROJET — Atelier Acidulé

> Photo de l'instant. **Se réécrit** à chaque fin de session. Historique détaillé = `JOURNAL.md`.
> ⚠️ Ce fichier **double `../HISTORIQUE.md`** (section « 📌 État actuel ») : tenir les deux synchro.
> Dernière mise à jour : **2026-06-27**.

## 🟢 OÙ ON EN EST (en 3 lignes)

1. **Refonte faite** : vraie landing page + `/mes-creations` en scroll + **personnalisation supprimée**.
2. **En ligne** : https://atelier-acidule.netlify.app · **code poussé sur GitHub** · `CLAUDE.md` à jour.
3. Prochaine étape : **validation visuelle d'Allan**, puis nettoyage (désinstaller `gsap`/`lenis`) + auto-deploy.

## 👉 REPRISE IMMÉDIATE (à lire en premier)

**Phase = refonte terminée, vérifiée, déployée et sauvegardée (branche `feat/refonte-accueil`, poussée).**
Au prochain démarrage :
1. **Valider visuellement** avec Allan (home, `/mes-creations` scroll, lisibilité) sur https://atelier-acidule.netlify.app.
2. Petit nettoyage : `npm uninstall gsap lenis` (plus utilisés depuis la refonte).
3. Quand Allan veut : brancher l'**auto-deploy Netlify↔GitHub** (`netlify.toml` déjà prêt) ; sinon, redéployer en manuel après chaque modif (`netlify deploy --prod --dir=dist`).
4. Plus tard : exploiter `Ref/catalogue/`, slogans/wording, paiement en ligne.

## ✅ Fait (jalons — détail dans JOURNAL.md)

- Scaffold Astro + design system (`global.css` + `polish.css`).
- **Landing `/index`** (layout Base, Nav verte + Footer) : hero sac flottant + halo, 3 valeurs, aperçu catalogue (4 cartes), teasers atelier & éditions, bandeau final. CTAs « Commander » → **DM Instagram**.
- **`/mes-creations`** refait en **scroll-snap plein écran** : 1 sac = 1 section couleur, infos en texte blanc lisible (**plus de rectangle blanc**), indicateur « Défiler ↓ », **plus de boutons/flèches/GSAP**, lien « Commander en DM ».
- **Personnalisation supprimée** : `/personnaliser`, `Configurateur`, `CarteModele`, 9 calques `sim-*.png` ; liens « Personnaliser »/« SHOP TON SAC » → Instagram.
- **Menu mobile** : liens repassés en vert sapin (lisibles sur le panneau crème).
- Sacs détourés (rembg) partout — plus aucun fond carré.
- **`CLAUDE.md` actualisé** (landing, scroll, suppression perso, déploiement Netlify, gotcha Windows).
- Build vert (5 pages), 0 erreur console, 0 débordement, vérifié au navigateur (390 + 1440).
- 2 workflows multi-agents (ultracode) : implémentation par lots disjoints + revue adversariale.

## 🔄 En cours / à venir

- **Validation visuelle d'Allan** sur la refonte.
- Désinstaller `gsap`/`lenis` (inutilisés) ; auto-deploy Netlify↔GitHub (Allan).
- Plus tard : exploiter `Ref/catalogue/`, slogans/wording, paiement en ligne.

## 🚧 Blocages / en attente

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

- Repo : `github.com/Allan77bot/atelier-acidule` (origin) — branche **`feat/refonte-accueil`** (**à jour, poussée**). `main` = ancienne vitrine.
- **En ligne : https://atelier-acidule.netlify.app** (Netlify, site `atelier-acidule`, deploy **CLI manuel** — pas d'auto-deploy git).
- Serveur local : `npm run dev` → http://localhost:4321 (⚠️ après grosses modifs/suppressions, **redémarrer** le serveur — overlay HMR périmé sinon).
- Captures : `docs/audit-shots/` (préfixes `refonte-*`).

## 📄 Docs clés

`JOURNAL.md` · `../HISTORIQUE.md` · `../CLAUDE.md` · `../CONTEXTE-PROJET.md`
