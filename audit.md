# Prompt d'audit — à copier-coller dans la session Claude Code d'Alphim

> Mode d'emploi : Alphim ouvre Claude Code **à la racine de son projet 9MM** (le dépôt qui contient le thème Shopify + le travail d'animation), puis copie-colle **tout le bloc ci-dessous** dans le chat. Le rapport sera généré dans un fichier `AUDIT_9MM_ETAT.md`.

---

Tu es un auditeur technique senior (Shopify / Liquid / front-end / animation web). Tu travailles **en lecture seule** : tu n'as le droit de créer qu'**un seul** fichier, `AUDIT_9MM_ETAT.md`, à la racine. Tu ne modifies, ne déplaces, ni ne supprimes aucun autre fichier, et tu ne fais aucun commit ni push.

## Contexte

Ce dépôt est le travail d'un développeur (Alphim) sur le site Shopify de la marque de boissons **9MM** (canettes **MIND** et **BODY**). Il a notamment créé une **animation de la/les canette(s) pilotée au scroll** (vidéo découpée en séquence d'images qui défilent au défilement de la page) et a commencé l'intégration dans un **thème Shopify sur mesure (Liquid)**.

Une autre personne va **reprendre / poursuivre l'intégration Shopify**. Cet audit doit lui donner le **maximum d'informations exploitables** pour continuer sans avoir à tout redécouvrir. Sois **factuel et précis** : appuie chaque constat sur un **chemin de fichier + numéro de ligne** réel. Si une information est introuvable dans le dépôt, écris-le explicitement dans une section « Zones d'ombre » au lieu de supposer.

## Ce que tu dois investiguer et documenter

### 1. Cartographie générale
- Arborescence réelle (`layout/`, `sections/`, `snippets/`, `blocks/`, `templates/`, `assets/`, `config/`, `locales/`, et tout dossier hors-Shopify : `src/`, `scripts/`, `node_modules`, etc.).
- Le thème est-il **Online Store 2.0** (templates JSON, sections everywhere) ou legacy ? Preuve à l'appui.
- Stack et outillage présents : y a-t-il un `package.json`, un bundler (Vite/Webpack/esbuild), Shopify CLI (`shopify.theme.toml`, `.shopifyignore`), `theme-check`, CI (`.github/`) ? Liste les dépendances clés.
- Liste de toutes les sections avec, pour chacune : rôle en une ligne + a-t-elle un `{% schema %}` + a-t-elle des `presets`.

### 2. ⭐ L'animation au scroll (LE point central — détaille-la au maximum)
- **Où** est le code de l'animation ? (fichier JS dans `assets/`, section Liquid dédiée, snippet ?) Donne les chemins exacts.
- **Comment** elle fonctionne : technique exacte (canvas vs `<img>` swap), mapping position de scroll → numéro d'image, usage de `requestAnimationFrame`, `IntersectionObserver`, pinning/sticky.
- **Les images / frames** : combien y en a-t-il, quel format (JPG/WebP/AVIF), quelle résolution, quel poids total ? **Où sont-elles hébergées** : dans `assets/` du thème, sur **Shopify Files (cdn.shopify.com)**, ou sur un service externe ? (point critique pour la suite)
- **Lazy loading / préchargement** : quelle stratégie (préchargement par lots, `decode()`, destruction des frames hors viewport) ?
- **Mobile** : comportement spécifique, fallback, réduction du nombre de frames, respect de `prefers-reduced-motion` ?
- Y a-t-il **une ou deux** animations (MIND et BODY séparées) ? Comment sont-elles déclenchées / différenciées ?
- Liste précisément ce qui est **terminé** vs **en cours / TODO / commenté / cassé** dans cette partie.

### 3. Intégration Shopify
- Où l'animation est-elle censée s'insérer (page d'accueil ? `templates/index.json` ? section précise) ? Est-ce **déjà branché** dans un template, ou juste un module isolé pas encore posé ?
- Les contenus sont-ils **éditables depuis l'admin Shopify** (textes, images, couleurs via `{% schema %}` / `settings_schema.json`) ou codés en dur ?
- Données produit : usage de `metafields`, gestion des **variantes/coloris** par canette, scalabilité pour de futures saveurs.
- Y a-t-il des dépendances à des **apps Shopify** ou des **services externes** (Firebase, pixels, API tierces) visibles dans le code ?

### 4. Qualité, risques et conflits techniques
- Librairies front présentes (GSAP, Three.js, Lottie, jQuery… ?) et où elles sont chargées.
- Risques d'intégration : variables/fonctions **globales** (`window.*`), monkey-patch (`window.fetch` réassigné ?), multiples écouteurs `scroll`/`resize` non mutualisés, hijack des liens d'ancre — tout ce qui pourrait entrer en conflit avec d'autres sections.
- Performance : poids JS/CSS, scripts render-blocking, `defer`/`async`, images responsive (`image_url` + `srcset`), impact probable sur le LCP.
- Accessibilité de base : `alt`, sémantique, `prefers-reduced-motion`.
- Hygiène dépôt : `.gitignore` présent ? Fichiers qui ne devraient pas être versionnés (logs, `.env`, clés, exports lourds) ? **Secrets/identifiants exposés** dans le code ou les fichiers de debug ?

### 5. État Git
- Branche courante, branches existantes, nombre de commits, derniers messages de commit, auteurs. Y a-t-il du travail non commité (`git status`) ?

## Format de sortie attendu (dans `AUDIT_9MM_ETAT.md`, en français)

1. **Synthèse (10 lignes max)** : état d'avancement global, ce qui marche, ce qui reste, niveau de risque pour reprendre l'intégration.
2. **Cartographie** : arborescence + tableau des sections (rôle / schema / presets).
3. **Fiche détaillée de l'animation au scroll** : section dédiée et complète (technique, frames, hébergement, lazy loading, mobile, état terminé/TODO) — c'est la partie la plus importante.
4. **État de l'intégration Shopify** : ce qui est branché vs isolé, éditabilité admin, scalabilité catalogue.
5. **Forces / Faiblesses / Risques** avec références `fichier:ligne`.
6. **Reste à faire pour finaliser l'intégration Shopify** : check-list ordonnée et concrète des prochaines étapes.
7. **Prérequis & accès à récupérer** (assets, accès Shopify/GitHub, identifiants, environnement de preview).
8. **Zones d'ombre — à clarifier avec Alphim** : tout ce qui n'est pas déductible du seul dépôt.

Commence par explorer le dépôt (arborescence, `layout/theme.liquid`, `config/settings_schema.json`, les templates JSON, puis le code de l'animation) avant de rédiger. Termine en écrivant le rapport complet dans `AUDIT_9MM_ETAT.md`.
