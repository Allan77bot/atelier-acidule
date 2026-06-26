# Prompt Hieggfield — Retouche des photos produits Atelier Acidulé

## Contexte

Site vitrine de **Atelier Acidulé**, marque de sacs au crochet faits main.
Identité : **Italie / Méditerranée** — citron acidulé + registre sucré-doux.
La créatrice est une **instagrameuse** (compte @atelier_acidule) — le site doit
respirer le même univers chaleureux, artisanal et qualitatif que son feed.

Palette chromatique de la marque :
- Fond crème (`#fbf5e9`)
- Vert sauge/sapin (`#8fa06a` / `#2f4334`)
- Jaune citron (`#f4cf3f`)
- Terracotta (`#c75c39`)

---

## Images à retoucher

Toutes les images sont dans `Ref/PhotoClient/` — photos brutes prises à
l'iPhone 16 Pro. Les versions actuelles dans `public/images/` sont des copies
redimensionnées sans aucune retouche pro. Il faut les remplacer par des
versions retravaillées (mêmes noms de fichier, même résolution cible).

### 1. `petit-sac.png` → résolution cible : 1200×960 px
Source : `Ref/PhotoClient/PetitSac (1).png` (ou la meilleure des 3)

**Ce qui ne va pas :** Photo banale sur fond blanc, éclairage plat, le sac
n'est pas mis en valeur. L'image actuelle (781×625) est trop petite et a un
aspect "photo de vente Vinted".

**Objectif :**
- Fond \#fbf5e9 (crème) dégradé subtil, pas de fond blanc brut
- Éclairage chaud, doré, comme un soleil d'après-midi méditerranéen
- Le sac doit être mis en scène : porté sur un fond de tissu/texture naturelle
  (lin, rotin, bois clair) OU sur fond crème avec ombre portée élégante
- Mise au point nette sur la maille, bokeh léger pour détacher du fond
- Couleurs saturées justesse : le vert sauge doit être identifiable, la maille
  visible
- Le contraste doit faire ressortir la texture du crochet
- Retouche : enlever les peluches, fils qui dépasse, défauts de la photo brute

### 2. `grand-sac.png` → résolution cible : 1200×1800 px
Source : `Ref/PhotoClient/SacBaudouliere (1).png` (ou meilleure)

**Ce qui ne va pas :** Même problème — fond brut, photo plate, on ne voit pas
les franges en laine correctement.

**Objectif :**
- Même traitement que petit-sac : fond crème chaud, éclairage doré
- Le sac doit être photographié de manière à ce qu'on **voie bien les franges
  en laine** — c'est le détail signature du modèle
- Si possible : porté sur une épaule (même suggestion de silhouette) pour
  donner l'échelle
- Texture de la maille visible
- Atmosphère **bord de mer / vacances italiennes** — chaud, ensoleillé, dolce
  vita

### 3. `pochette-livres.png` → résolution cible : 1000×1600 px
Source : `Ref/PhotoClient/CouvreLivre (1).png` (ou meilleure)

**Ce qui ne va pas :** La pochette n'est pas identifiable comme "pochette à
livres" — on dirait juste une pochette quelconque.

**Objectif :**
- Même traitement que les autres
- Montrer la **fermeture nouée** (c'est la particularité du modèle)
- Suggestion : la pochette posée sur une table en bois avec un livre qui
  dépasse légèrement, pour qu'on comprenne l'usage
- Garder l'attention sur la maille et les couleurs

### 4. `edition-speciale.png` → résolution cible : 1200×1800 px
Source : `Ref/PhotoClient/SacBaudouliere (2).png`

**Ce qui ne va pas :** C'est la même photo que grand-sac réutilisée — ce n'est
pas une "édition spéciale" visuellement.

**Objectif :**
- Traitement plus artistique, plus editorial
- Fond plus foncé pour se différencier des autres photos (terracotta ou sapin
  foncé)
- Éclairage plus dramatique, presque "musée"
- Doit donner envie de collectionner

### 5. `logo.png` → résolution cible : 1024×1024 (garder)
Source : `Ref/PhotoClient/LogoPNG.png`

**Ce qui ne va pas :** Le logo actuel est un PNG brut sur fond blanc. Le
contour blanc autour de la pelote et du citron est visible, ça fait amateur.

**Objectif :**
- Détourage parfait (fond transparent)
- Nettoyage des artefacts de compression
- Légère retouche des couleurs pour qu'elles matchent la palette du site
- Option : recadrage plus serré

### 6. `mosaique-citron.jpg` → résolution cible : garder haute résolution
Source : `Ref/PhotoClient/Mosaique_citron.jpg`

**Ce qui ne va pas :** Le motif est très basse résolution, la mosaïque est
pixelisée quand elle est utilisée en grand.

**Objectif :**
- Améliorer la résolution / nettoyage
- Adoucir le rendu pour que l'opacité 6% soit élégante (pas de crénelage)
- Possibilité d'appliquer un flou très léger pour un rendu plus "toile de fond"

---

## Instructions stylistiques générales (applicables à toutes les images)

**Styles de référence :** Jacquemus, Sézane, Rouje — épure méditerranéenne,
chaleureuse mais premium.

**Traitement couleur :**
- Température chaude (+2000K par rapport à la balance des blancs neutre)
- Légère désaturation des tons verts pour qu'ils tirent vers le sauge
- Teinte globale : ajouter 5-8% de tons dorés dans les hautes lumières
- Courbe en S très légère (contraste doux mais présent)
- Vignettage très subtil des bords (pas plus de 5% d'assombrissement)

**Fond :**
- PAS de fond blanc pur — utiliser `#fbf5e9` ou un dégradé crème/sauge très
  doux
- Éviter les ombres portées dures — préférer des ombres douces, diffuses
- Optionnel : ajouter un accessoire de style (branche d'olivier, citron, lin
  froissé) pour renforcer l'univers

**Format :** PNG avec fond transparent ou JPG haute qualité (Q90+), RBG,
résolution minimum 1200px sur le grand côté.

---

## Livrables attendus

Pour chaque image, le fichier retouché dans `public/images/` :
- `petit-sac.png`
- `grand-sac.png`
- `pochette-livres.png`
- `edition-speciale.png`
- `logo.png`
- `mosaique-citron.jpg`

Les fichiers originaux sont dans `Ref/PhotoClient/`. Utilisez-les comme source
brute, pas les versions actuelles dans `public/images/`.
