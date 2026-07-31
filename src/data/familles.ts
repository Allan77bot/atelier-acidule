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
  /** libellé du bouton « personnaliser » */
  cta: string;
  /** univers de rattachement, qui structure le hub /creations */
  groupe: string;
  /** ce qui distingue cette famille — sert de sous-titre sur sa page */
  detail: string;
  /**
   * Index de la photo à mettre en vignette, quand la première du dossier n'est
   * pas représentative. Les porte-verres commencent par trois visuels promo
   * (affiches, pas produits) : on prend la première photo portée à la place.
   */
  vignette?: number;
}

/** Les 4 univers du hub, dans l'ordre d'affichage. */
export const groupes = [
  {
    slug: 'sacs',
    nom: 'Les sacs',
    accroche: "Le basique de l'atelier, décliné par son anse.",
  },
  {
    slug: 'sacs-de-plage',
    nom: 'Les sacs de plage',
    accroche: 'Grands, souples, faits pour les journées au soleil.',
  },
  {
    slug: 'porte-verres',
    nom: 'Les porte-verres',
    accroche: 'Une bandoulière crochetée qui porte ton verre.',
  },
  {
    slug: 'pochettes',
    nom: 'Les pochettes',
    accroche: 'Pour protéger un livre, un téléphone, un ordinateur.',
  },
];

export const familles: Famille[] = [
  {
    categorie: 'basics/anse-bois',
    slug: 'sac-anse-bois',
    nom: 'Sac — anse bois',
    cta: 'Personnaliser mon sac',
    groupe: 'sacs',
    detail: 'Anses en bambou, rondes et chaudes.',
  },
  {
    categorie: 'basics/anse-crochet',
    slug: 'sac-anse-crochet',
    nom: 'Sac — anse crochetée',
    cta: 'Personnaliser mon sac',
    groupe: 'sacs',
    detail: 'Anse crochetée dans le même fil que le sac.',
  },
  {
    categorie: 'basics/anse-doree',
    slug: 'sac-anse-doree',
    nom: 'Sac — anse dorée',
    cta: 'Personnaliser mon sac',
    groupe: 'sacs',
    detail: 'Anneaux dorés, pour les tenues du soir.',
  },
  {
    categorie: 'sacs-de-plage',
    slug: 'sac-de-plage',
    nom: 'Sac de plage',
    cta: 'Personnaliser mon sac de plage',
    groupe: 'sacs-de-plage',
    detail: 'Grand format, à porter à l’épaule.',
  },
  {
    categorie: 'porte-verres',
    slug: 'porte-verres',
    nom: 'Porte-verres',
    cta: 'Personnaliser mon porte-verres',
    groupe: 'porte-verres',
    detail: 'Se porte en sautoir et tient le verre à pied.',
    vignette: 7,
  },
  {
    categorie: 'pochettes/livre',
    slug: 'pochette-livre',
    nom: 'Pochette à livre',
    cta: 'Personnaliser ma pochette à livre',
    groupe: 'pochettes',
    detail: 'Un étui souple pour emporter sa lecture.',
  },
  {
    categorie: 'pochettes/portable',
    slug: 'pochette-portable',
    nom: 'Pochette téléphone',
    cta: 'Personnaliser ma pochette',
    groupe: 'pochettes',
    detail: 'Format téléphone, à porter en bandoulière.',
  },
];

/** Les familles d'un univers donné. */
export const famillesDuGroupe = (groupe: string) =>
  familles.filter((f) => f.groupe === groupe);

/** Retrouve la famille correspondant à une catégorie photo. */
export const familleDe = (categorie: string) =>
  familles.find((f) => f.categorie === categorie);
