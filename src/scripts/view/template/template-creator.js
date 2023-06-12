// to create html template
// but later after don making custom element

import RestoItem from '../../custom-element/resto-item';

const createListItem = (restaurant) => {
  const listItemElement = new RestoItem(restaurant);

  listItemElement.addEventListener(
    'click',
    () => { window.location = `/#/detail/:${restaurant.id}`; },
    { once: true },
  );

  return listItemElement;
};

export { createListItem };
