# Contexte projet — Atelier Acidulé

> **But de ce fichier** : document autonome à donner à une IA (ou à un nouveau
> collaborateur) pour qu'elle comprenne le projet sans avoir le code sous les yeux.
> Il résume *quoi*, *pourquoi* et *comment*. Pour le détail technique vivant, voir
> `CLAUDE.md` (architecture) et `HISTORIQUE.md` (journal de sessions).
>
> _Dernière mise à jour : 2026-06-27._

---

## 1. En une phrase

**Site vitrine premium** pour **Atelier Acidulé**, une créatrice de **sacs et
accessoires au crochet faits main, sur commande**, dans la couleur choisie par la
cliente. Univers **Italie / Méditerranée**, citron **acidulé**, registre
**sucré-doux**.

## 2. Le produit & le modèle économique

- **Commerce hybride** : le site est **d'abord une vitrine**. Le **paiement en ligne
  sera branché plus tard** ; pour l'instant la commande se fait **sur le site** (via
  formulaire placeholder), et le SAV / les questions passent par les **DM Instagram**.
- **4 modèles** au catalogue :
  1. **Le petit sac** — anneaux laiton, 35 € — *personnalisable*
  2. **La pochette à livres** — fermeture nouée laine, 40 € — *personnalisable*
  3. **Le grand sac de plage** — bandoulière + franges laine, 45 € — *personnalisable*
  4. **Éditions spéciales** — pièces uniques en série limitée, 45 € — *NON personnalisable*
     (page à part, la cliente compose elle-même).
- **Feature centrale = la personnalisation** : sur les 3 modèles personnalisables, la
  cliente recolore le sac **jusqu'à 3 couleurs** en direct (configurateur visuel,
  inspiration « color-transitions » Dribbble). Couleurs **illimitées**.

## 3. Stack technique

- **Framework : Astro 5** (`astro@^5.7`, build 5.18) — site statique premium avec
  quelques **îlots interactifs** ciblés.
- **Animation : GSAP 3.15** (`gsap`) — anime l'accueil split-screen.
- **Smooth-scroll : Lenis 1.3** (`lenis`) — **installé mais pas encore branché**.
- **Pas de framework UI** (React/Vue) : l'interactivité est du `<script>` inline
  classique bundlé par Astro, sans directive `client:*`.
- **Pas de tests** pour l'instant (Vitest pressenti).
- **TypeScript** uniquement pour les données (`src/data/modeles.ts`).

### Commandes

```bash
npm install        # dépendances (astro + gsap + lenis)
npm run dev        # serveur de dev → http://localhost:4321
npm run build      # build de prod → dist/
npm run preview    # sert le build de prod (http://localhost:4321)
npm run check      # diagnostics / types Astro (astro check)
```

## 4. Identité de marque (design system)

Tokens définis dans `src/styles/global.css` (`:root`).

**Palette** (fond crème, vert sapin/sauge, jaune citron, terracotta) :

| Token | Hex | Usage |
| --- | --- | --- |
| `--creme` | `#fbf5e9` | fond principal |
| `--sapin` | `#2f4334` | couleur primaire (vert foncé) |
| `--sauge` | `#8fa06a` | vert clair |
| `--citron` | `#f4cf3f` | surbrillance / accent jaune |
| `--terracotta` | `#c75c39` | accent chaud |
| `--olive` | `#6f7c3c` | secondaire |
| `--encre` | `#2a2620` | texte |

**Typographies (Google Fonts)** :
- **Playfair Display** (italique) → wordmark / CTA
- **Fraunces** → titres
- **Nunito Sans** → corps de texte

**Décor** : fond en **mosaïque citron** faible opacité (`body::before`).

## 5. Structure du code

```
src/
├── pages/                       # 1 fichier = 1 route
│   ├── index.astro              # ACCUEIL split-screen (bloc interactif n°1)
│   ├── personnaliser.astro      # studio de perso → <Configurateur />
│   ├── editions-speciales.astro # galerie de pièces uniques
│   ├── atelier.astro            # histoire de la marque + contact
│   └── commander.astro          # formulaire de commande on-site (placeholder)
├── layouts/
│   ├── Base.astro               # squelette classique + Nav/Footer (toutes pages SAUF accueil)
│   └── Immersif.astro           # coquille plein écran sans scroll (accueil uniquement)
├── components/
│   ├── Configurateur.astro      # bloc interactif n°2 (recoloration du sac)
│   ├── CarteModele.astro        # carte produit
│   ├── Nav.astro / Footer.astro / Logo.astro
│   └── IntroAnim.astro          # intro scrollée (logo→citron coupé→jus→wordmark) — pas branchée sur l'accueil actuel
├── data/
│   └── modeles.ts               # SOURCE DE VÉRITÉ du catalogue
└── styles/
    └── global.css               # tokens couleur/typo + utilitaires
public/images/                   # assets de prod (voir §8)
```

## 6. Le modèle de données (`src/data/modeles.ts`)

C'est **la source de vérité** ; les deux blocs interactifs lisent ces données (pas de
duplication).

```ts
interface Modele {
  slug: string;          // ex. 'petit-sac' — sert au nommage des images et aux liens
  nom: string;
  baseline: string;
  description: string;
  prix: number;          // 35 / 40 / 45
  anse: string;
  photo: string;         // '/images/<slug>.png' (photo détourée)
  personnalisable: boolean;
  couleur: string;       // hex = fond du panneau dans l'accueil split-screen
}

export const modeles: Modele[];                              // les 4 modèles
export const modelesPerso = modeles.filter(m => m.personnalisable); // les 3 perso
```

- Les **4 modèles** alimentent l'**accueil** split-screen.
- Les **3 `personnalisable`** (`modelesPerso`) alimentent le **Configurateur** et le
  `<select>` de la page commander.
- **Ajouter un modèle** = éditer ce fichier ; s'il est personnalisable, il faut **aussi**
  générer ses calques `sim-*` (voir §7.2).

## 7. Les deux blocs interactifs (le cœur du site)

### 7.1 Accueil split-screen (`src/pages/index.astro` + `layouts/Immersif.astro`)

Refonte inspirée du site **SANDQVIST**. **Une seule scène, deux états** :

- **État 1 « hero »** = sélecteur de modèle. **État 2 « detail »** = fiche produit.
  Le basculement se fait via l'attribut `data-mode` sur `<section data-scene>`.
- **Mise en page** : deux panneaux absolus (gauche blanc/crème, droite = couleur du
  modèle), une « stage » centrale qui empile les 4 photos de sacs (une seule visible).
- **Couleur du panneau** = champ `couleur` du modèle. Changer de modèle déclenche un
  **balayage vertical** de l'ancienne couleur vers la nouvelle (`.wipe`).
- **Animations = GSAP** (pas de CSS scroll-driven ici). Fonctions clés :
  `allerVers(dir)` (change de modèle), `ouvrirDetail()` / `fermerDetail()`.
  Garde-fous : `busy` (verrou pendant transition) + `wheelLock` (anti-spam molette).
- **Navigation** : molette, flèches ↑↓, clavier (↑↓ changer, Entrée ouvrir, Échap
  fermer). `prefers-reduced-motion` → animations quasi instantanées.
- **Couplage data ↔ script** : les modèles sont injectés en JSON dans la page et relus
  côté client (pas de double saisie). Le CTA de la fiche pointe vers
  `/personnaliser?modele=<slug>`.
- **Responsive** : sous 760 px, le split passe **horizontal** (couleur en haut, blanc
  en bas).
- `Immersif.astro` = coquille plein écran **sans scroll** (`overflow:hidden`), header
  minimal (logo + wordmark + burger + tiroir menu). C'est là qu'on branchera plus tard
  le **loader d'intro** et **Lenis**.

### 7.2 Configurateur (`src/components/Configurateur.astro`)

La feature de personnalisation. **Le sac n'est PAS un SVG** (contrairement au cadrage
initial) : c'est **2 calques PNG** par modèle + du CSS.

- Chaque modèle = un `<div class="sim" data-bag="<slug>">` qui empile :
  - `.sim__color` : reçoit un **`linear-gradient` CSS** (la/les couleurs), **masqué**
    par la silhouette `sim-<slug>-mask.png` (`mask-mode: alpha`).
  - `.sim__tex` : `sim-<slug>-tex.png` posé en `mix-blend-mode: multiply` pour le grain
    du crochet.
- **Recoloration** : `bandsCss(cols)` construit le dégradé — 1 fil = aplat uni, 2-3 fils
  = bandes horizontales nettes. Couleurs **illimitées** (c'est un dégradé, pas une
  forme vectorielle).
- **État** : `palette: string[]` (1 à 3 hex, `MAX = 3`). Clic sur un « citron-couleur »
  = ajoute/retire la couleur (toggle, toujours ≥1 fil).
- **Conseils de mariage** : boutons qui remplacent la palette par un trio prédéfini.
- **Lien entrant** : la page lit `?modele=<slug>` au démarrage pour présélectionner.
- **Ajouter un modèle recolorable** = (a) `personnalisable: true` dans `modeles.ts`
  **ET** (b) générer `public/images/sim-<slug>-tex.png` + `sim-<slug>-mask.png` via les
  scripts racine `_*.cjs`. **Pas de `<svg>`.**

## 8. Les assets images (`public/images/`) — 3 familles à ne pas confondre

| Famille | Nom de fichier | Fond | Utilisé par |
| --- | --- | --- | --- |
| Photos détourées | `<slug>.png` | transparent | cartes, éditions, autres pages |
| Photos « accueil » | `accueil-<slug>.png` | recolorisé (= couleur panneau) | accueil split-screen |
| Calques configurateur | `sim-<slug>-tex.png` + `sim-<slug>-mask.png` | — | Configurateur |

⚠️ **Piège de nommage** : l'accueil charge `accueil-<slug>.png` avec le **slug exact**.
Pour les éditions spéciales, le slug est **`editions-speciales`** (pluriel), donc le
fichier accueil est `accueil-editions-speciales.png` — **différent** de la photo de base
`edition-speciale.png` (singulier). Un mauvais nom = sac invisible **sans erreur de
build**.

> ⚠️ Allan **n'aime pas** le rendu « photo recolorée » actuel du configurateur et veut
> le refaire plus proprement lui-même (piste : revenir à des dessins au trait, voir
> `Ref/PhotoClient/Simulateur_*.png`).

## 9. État actuel & git

- **Branche active : `feat/refonte-split-screen`** — refonte de tout le site en
  expérience plein écran (inspirée SANDQVIST). `main` garde encore l'**ancienne vitrine
  multi-pages** classique.
- **Build OK** (5 pages).
- Travail récent (session 2026-06-27) : vraies photos produit (catalogue détouré), fond
  d'accueil recolorisé par sac, logo ajouté dans le header.
- Décision validée : **tout le site** passe en immersif, parcours
  **accueil → fiche détail → personnaliser → commander**, stack **GSAP + Lenis**.

### Règles de travail (importantes pour une IA qui agirait sur le repo)

- **Le projet est un dépôt git.** Une préoccupation = une branche (`feat/`, `fix/`,
  `chore/`, `docs/`) = une PR. Ne **jamais** coder directement sur `main`.
- **Jamais push / déployer / ouvrir une PR sans accord explicite.** Jamais supprimer de
  fichiers sans confirmation (utiliser `trash`, pas `rm -rf`).
- Méthode : **lire avant d'agir → valider avant de coder → prouver avant d'affirmer →
  tracer avant de partir.** Brainstormer avant de scaffolder.

### Gotchas environnement (WSL)

- `astro dev` **met `public/` en cache au démarrage** : après avoir ajouté/régénéré un
  asset, **redémarrer le serveur**. Le tuer avec `pkill -f "astro.js dev"` (**pas**
  `"astro dev"`, qui ne matche pas le process node).
- Le FS `/mnt/e` (WSL) est **lent** : builds et `npm install` prennent leur temps.
- `E:\Git` = **répertoire d'installation de Git pour Windows**, PAS un projet — ne
  jamais y toucher. Les projets vivent sous `E:\Claude\Claude_Code\Projet_Pro\`.

## 10. Reste à faire / pistes

- Brancher **Lenis** (smooth-scroll) et un **loader d'intro** sur l'accueil immersif.
- **Refaire le rendu du configurateur** plus proprement (cf. §8).
- **Exploiter `Ref/catalogue/`** : 27 nouvelles photos produit (variantes de couleur +
  nouveaux modèles : pochettes, cabas, clutchs…) à trier/détourer/intégrer — pourrait
  enrichir le catalogue et alimenter un défilé de coloris.
- Plus tard : **back-end commande + paiement** (commerce hybride).
- Finaliser le passage de **tout le site** en immersif, puis merger la branche.

## 11. Où trouver quoi (références)

- **`CLAUDE.md`** — architecture détaillée + consignes pour agent IA (à lire en entier
  avant de toucher l'accueil ou le configurateur).
- **`HISTORIQUE.md`** — journal : « État actuel » (réécrit chaque session) + « Log »
  (append-only). À lire au démarrage.
- **`Ref/PhotoClient/`** — photos & logo client d'origine (références d'entrée, **ne pas
  modifier**). Contient aussi les `Simulateur_*.png` (dessins au trait).
- **`Ref/catalogue/`** — 27 nouvelles photos produit numérotées (à exploiter).
- **`Ref/VideoClient/`** — vidéos client.
- **`Pool/`** — brouillons, prompts, `ref-sandqvist-structure.md` (analyse de la réf.).
- **`briefs/`** — briefs d'animation validés (ex. `intro-citron-scroll.md`).
- **Scripts racine `_*.cjs`** — helpers **jetables** de génération/retouche d'assets
  (notamment les calques `sim-*`). Hors build Astro.

---

### Modèle de question à poser à une IA avec ce fichier

> « Voici le contexte de mon projet Atelier Acidulé (fichier joint). [Ta question] »

Exemples : *« Comment ajouter un 4ᵉ modèle personnalisable ? »*, *« Pourquoi le
configurateur n'utilise pas de SVG ? »*, *« Comment fonctionne la navigation de
l'accueil ? »*, *« Que reste-t-il à faire avant de merger la refonte ? »*
