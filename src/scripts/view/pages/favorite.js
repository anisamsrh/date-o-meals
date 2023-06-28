import FavoriteRestoDB from '../../data/resto-indexed-db';
import NavbarStylist from '../../styles/navbar-stylist';
import { createListItem } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
    <h2 class="list-title fav-title">My Favorite Places</h2>
    <div class="list-container"></div>
    `;
  },

  async afterRender() {
    this._hideHero();
    this._navbarScrollGradient();
    await this._showRestaurants();
  },

  _hideHero() {
    const heroElement = document.querySelector('#hero');
    heroElement.classList.remove('hero');
    heroElement.classList.add('hero-hidden');
  },

  _navbarScrollGradient() {
    NavbarStylist.scrollGradient({
      navbar: document.querySelector('#navbar'),
      on: false,
    });
  },

  async _showRestaurants() {
    const restaurants = await FavoriteRestoDB.getAllRestos();
    const container = document.querySelector('.list-container');

    restaurants.forEach((restaurant) => {
      container.append(createListItem(restaurant));
    });
  },
};

export default Favorite;
