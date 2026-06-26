// Catalogue des modèles. Les fiches/cartes affichent les VRAIES photos
// (renommées dans public/images). Seul le sac de la page perso est vectoriel.

export interface Modele {
  slug: string;
  nom: string;
  baseline: string;
  description: string;
  prix: number;
  anse: string;
  photo: string;
  personnalisable: boolean;
  // Couleur de fond du panneau dans l'expérience split-screen (texte blanc dessus).
  couleur: string;
}

export const modeles: Modele[] = [
  {
    slug: 'petit-sac',
    nom: 'Le petit sac',
    baseline: 'Compact, chic, partout avec toi',
    description:
      'Notre boîte brun chiné aux anses laiton : la pièce du quotidien qui relève une tenue comme une pointe de citron relève un plat.',
    prix: 35,
    anse: 'Anneaux laiton',
    photo: '/images/petit-sac.png',
    personnalisable: true,
    couleur: '#c75c39',
  },
  {
    slug: 'pochette-livres',
    nom: 'La pochette à livres',
    baseline: 'Pour les lectures gourmandes',
    description:
      'Un étui crème à fermeture nouée laine qui protège tes lectures avec une douceur sucrée. Le cadeau parfait pour les amoureux des mots.',
    prix: 40,
    anse: 'Fermeture nouée laine',
    photo: '/images/pochette-livres.png',
    personnalisable: true,
    couleur: '#6f7c3c',
  },
  {
    slug: 'grand-sac',
    nom: 'Le grand sac de plage',
    baseline: "L'allié des journées ensoleillées",
    description:
      'Bordeaux, anse et franges en laine, charm fleur blanche : un grand bandoulière qui emporte tout, du roman à la crème solaire.',
    prix: 45,
    anse: 'Bandoulière + franges laine',
    photo: '/images/grand-sac.png',
    personnalisable: true,
    couleur: '#7b2d3a',
  },
  {
    slug: 'editions-speciales',
    nom: 'Éditions spéciales',
    baseline: 'Des pièces uniques, en quantité limitée',
    description:
      'Des créations composées à la main, en série très limitée. Quand elles sont parties, elles sont parties.',
    prix: 45,
    anse: 'Variable',
    photo: '/images/edition-speciale.png',
    personnalisable: false,
    couleur: '#2f4334',
  },
];

// Les 3 modèles recolorables sur la page de personnalisation.
export const modelesPerso = modeles.filter((m) => m.personnalisable);
