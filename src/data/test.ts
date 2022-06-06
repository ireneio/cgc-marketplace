const collections = [
  {
    id: 1,
    splashSrc: '/img/ss_cover.png',
    logoSrc:
      'https://catheongaming.com/wp-content/uploads/2021/12/seoulstars-logo.png',
    videoSrc: '/gifs/yuna.gif',
    name: 'Seoul Stars',
    description:
      'Creating the metaverses first ever virtual K-Pop idol with a play-to-earn karaoke and rhythm game.',
    tags: ['Solana', 'NFT', '$SSTAR'],
  },
  {
    id: 2,
    splashSrc: '/img/am_cover.png',
    logoSrc:
      'https://catheongaming.com/wp-content/uploads/2022/02/Angrymals-Logo.png',
    videoSrc:
      'https://angrymals.io/wp-content/uploads/2022/03/angrymals-trailer.mp4',
    name: 'Angrymals',
    tags: ['Solana', 'NFT'],
    description:
      'Inspired by Worms and Angry Birds, this new crazy videogame lets you challenge your friends with a barrage of carrots, exhausts and sperm whales!',
  },
  {
    id: 3,
    splashSrc:
      'https://catheongaming.com/wp-content/uploads/2022/04/solchicks-3.jpg',
    logoSrc:
      'https://catheongaming.com/wp-content/uploads/2021/12/solchicks-logo.png',
    videoSrc: '/gifs/solchicks.gif',
    name: 'SolChicks',
    tags: ['Solana', 'NFT', '$CHICKS', '$SHARDS'],
    description:
      'Collect, breed, and train your own unique SolChicks in a revolutionary gaming ecosystem.',
  },
];

export const testData = {
  landingHeroLogo:
    'https://catheongaming.com/wp-content/uploads/2021/12/solchicks-logo.png',
  landingHeroBackground:
    'https://catheongaming.com/wp-content/uploads/2022/04/solchicks-3.jpg',
  landingHeroTitle: 'Play the Mini Game Now',
  landingHeroSubtitle:
    'Collect, breed, and train your own unique SolChicks in a revolutionary gaming ecosystem.',
  landingHeroButtons: [
    {
      title: 'Play',
    },
    {
      title: 'More Info',
    },
  ],
  collectionHeroStats: [
    { name: 'Items', stat: '5.4k' },
    { name: 'Owners', stat: '2.7k' },
    { name: 'Floor Price', stat: '4.9' },
    { name: 'Volume Traded', stat: '3.5k' },
  ],
  recentlyAddedCollections: collections,
  personalisedCollections: [collections[0]],
};
