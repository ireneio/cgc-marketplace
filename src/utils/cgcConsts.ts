export const getAboutRoute = (collectionName: string) => [
  { text: 'Home', value: 'Home' },
  { text: 'Explore', value: 'Explore/All' },
  { text: collectionName, value: 'Collection' },
  { text: 'About', value: 'About' },
];

export const getAllItemsRoute = (collectionName: string) => [
  { text: 'Home', value: 'Home' },
  { text: 'Explore', value: 'Explore/All' },
  { text: collectionName, value: 'Collection' },
  { text: 'All Items', value: 'All Items' },
];

export const getYourItemsRoute = (collectionName: string) => [
  { text: 'Home', value: 'Home' },
  { text: 'Explore', value: 'Explore/All' },
  { text: collectionName, value: 'Collection' },
  { text: 'Your Items', value: 'Your Items' },
];

export const getCollectionItemRoute = (
  collectionName: string,
  collectionItemName: string,
) => [
  { text: 'Home', value: 'Home' },
  { text: 'Explore', value: 'Explore/All' },
  { text: collectionName, value: collectionName },
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
