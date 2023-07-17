// to create html template
// but later after don making custom element

import RestoDetail from '../../custom-element/resto-detail';
import RestoItem from '../../custom-element/resto-item';
import observer from '../../utils/intersection-observer';

const createListItem = (restaurant) => {
  const listItemElement = new RestoItem(restaurant);

  listItemElement.addEventListener(
    'click',
    () => { window.location = `/#/detail/${restaurant.id}`; },
    { once: true },
  );

  observer.observe(listItemElement);

  return listItemElement;
};

const createRestaurantDetail = (detail) => {
  const restaurantDetailElement = new RestoDetail(detail);

  return restaurantDetailElement;
};

export { createListItem, createRestaurantDetail };
