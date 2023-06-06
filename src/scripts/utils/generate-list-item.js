import newListItem from '../custom-element/resto-item';
import dataRestaurant from '../data/data-json';

dataRestaurant.forEach((item) => {
  newListItem(item);
});
