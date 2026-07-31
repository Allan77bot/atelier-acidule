// Les familles de créations réellement fabriquées par Marine, telles qu'elle
// range elle-même ses photos (dossiers du Drive « Photo sac »).
//
// Source unique volontaire : le catalogue s'en sert pour ses boutons
// « Personnaliser… », et le formulaire de commande construit sa liste
// déroulante à partir d'elle. Sans ça, un bouton pourrait pointer vers un
// modèle que le formulaire ne connaît pas, et la présélection échouerait en
// silence.
//
// Pas de prix ici : on n'en connaît que pour les 3 modèles historiques
// (`modeles.ts`), et il n'est pas question d'en inventer pour les
// porte-verres ou les pochettes.

export interface Famille {
  /** slug de la catégorie photo (voir catalogue.ts) */
  categorie: string;
  /** valeur passée à /commander?modele=… et attendue par le <select> */
  slug: string;
  /** libellé dans la liste déroulante du formulaire */
  nom: string;
  /** libellé du bouton sur le catalogue */
  cta: string;
}

export const familles: Famille[] = [
  {
    categorie: 'basics/anse-bois',
    slug: 'sac-anse-bois',
    nom: 'Sac — anse bois',
    cta: 'Personnaliser mon sac',
  },
  {
    categorie: 'basics/anse-crochet',
    slug: 'sac-anse-crochet',
    nom: 'Sac — anse crochetée',
    cta: 'Personnaliser mon sac',
  },
  {
    categorie: 'basics/anse-doree',
    slug: 'sac-anse-doree',
    nom: 'Sac — anse dorée',
    cta: 'Personnaliser mon sac',
  },
  {
    categorie: 'sacs-de-plage',
    slug: 'sac-de-plage',
    nom: 'Sac de plage',
    cta: 'Personnaliser mon sac de plage',
  },
  {
    categorie: 'porte-verres',
    slug: 'porte-verres',
    nom: 'Porte-verres',
    cta: 'Personnaliser mon porte-verres',
  },
  {
    categorie: 'pochettes/livre',
    slug: 'pochette-livre',
    nom: 'Pochette à livre',
    cta: 'Personnaliser ma pochette à livre',
  },
  {
    categorie: 'pochettes/portable',
    slug: 'pochette-portable',
    nom: 'Pochette téléphone',
    cta: 'Personnaliser ma pochette',
  },
];

/** Retrouve la famille correspondant à une catégorie photo. */
export const familleDe = (categorie: string) =>
  familles.find((f) => f.categorie === categorie);
