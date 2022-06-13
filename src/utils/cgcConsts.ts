export const formatSlug = (slug: string) => {
  return slug.split(' ').join('_').toLowerCase();
};

export const getAboutRoute = (collectionName: string) => [
  { text: 'Home', value: '/' },
  { text: 'Explore', value: '/explore' },
  { text: collectionName, value: `/collection/${formatSlug(collectionName)}` },
  { text: 'About', value: 'About' },
];

export const getAllItemsRoute = (collectionName: string) => [
  { text: 'Home', value: '/' },
  { text: 'Explore', value: '/explore' },
  {
    text: collectionName,
    value: `/collection/${formatSlug(collectionName)}?tab=about`,
  },
  { text: 'All Items', value: 'All Items' },
];

export const getYourItemsRoute = (collectionName: string) => [
  { text: 'Home', value: '/' },
  { text: 'Explore', value: '/explore' },
  {
    text: collectionName,
    value: `/collection/${formatSlug(collectionName)}?tab=about`,
  },
  { text: 'Your Items', value: 'Your Items' },
];

export const getListedItemsRoute = (collectionName: string) => [
  { text: 'Home', value: '/' },
  { text: 'Explore', value: '/explore' },
  {
    text: collectionName,
    value: `/collection/${formatSlug(collectionName)}?tab=about`,
  },
  { text: 'Listed Items', value: 'Listed Items' },
];

export const getCollectionItemRoute = (
  collectionName: string,
  collectionItemName: string,
) => [
  { text: 'Home', value: '/' },
  { text: 'Explore', value: '/explore' },
  {
    text: collectionName,
    value: `/collection/${formatSlug(collectionName)}?tab=abouy`,
  },
  { text: collectionItemName, value: collectionItemName },
];

export function getBreadcrumbRoutes(
  currentSelection: string,
  collectionName: string,
) {
  switch (currentSelection) {
    case '...':
    case 'About':
      return getAboutRoute(collectionName);
    case 'All Items':
      return getAllItemsRoute(collectionName);
    case 'Your Items':
      return getYourItemsRoute(collectionName);
    case 'Listed Items':
      return getListedItemsRoute(collectionName);
    default:
      return [];
  }
}

export function getBreadcrumbItemRoutes(
  currentSelection: string,
  collectionName: string,
  collectionItemName: string,
) {
  switch (currentSelection) {
    case '...':
    case 'Collection Item':
      return getCollectionItemRoute(collectionName, collectionItemName);
    default:
      return [];
  }
}

export function getSelectGroupItems() {
  return [
    { text: 'About', value: 'About' },
    { text: 'All Items', value: 'All Items' },
    { text: 'Your Items', value: 'Your Items' },
    { text: '...', value: '...' },
  ];
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const BASE_SIDEBAR_PATH = 'Home';
export const SIDEBAR_PATH_STORAGE_KEY = 'navigation_path';

export const SIDE_BAR_ITEMS = [
  {
    text: 'Home',
    value: '/',
    icon: '/img/icon_home.svg',
  },
  {
    text: 'Explore',
    value: '/explore',
    icon: '/img/icon_explore.svg',
    children: [
      { text: 'All', value: '' },
      // { text: 'Latest', value: 'Latest' },
      // { text: 'Popular', value: 'Popular' },
    ],
  },
  // { text: 'Sell', value: 'Sell', icon: '/img/icon_sell.png' },
  {
    text: 'Launchpad',
    value: 'Launchpad',
    icon: '/img/icon_launchpad.svg',
  },
  // {
  //   text: 'Cart',
  //   value: 'Cart',
  //   icon: '/img/icon_cart.svg',
  // },
  // {
  //   text: 'Transactions',
  //   value: 'Transactions',
  //   icon: '/img/icon_bar.png',
  // },
  // {
  //   text: 'Latest Sales',
  //   value: 'Latest Sales',
  //   icon: '/img/icon_dollar.png',
  // },
];
