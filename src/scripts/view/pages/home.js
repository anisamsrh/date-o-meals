import RESTO_API from '../../data/resto-api';
import NavbarStylist from '../../styles/navbar-stylist';
import { createListItem, createSkeletonUi } from '../template/template-creator';

const Home = {
  async render() {
    return `
    <h2 class="list-title">Explore Restaurant and Cafe</h2>
    <div class="list-container"></div>
    `;
  },

  async afterRender() {
    this._showHero();
    this._renderSkeletonUi();
    this._navbarScrollGradient();
    await this._showRestaurants();
  },

  _showHero() {
    const heroElement = document.querySelector('#hero');
    heroElement.classList.add('hero');
  },

  _navbarScrollGradient() {
    NavbarStylist.scrollGradient({
      navbar: document.querySelector('#navbar'),
      on: true,
    });
  },

  _renderSkeletonUi() {
    const container = document.querySelector('.list-container');
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 6; index++) {
      container.innerHTML += createSkeletonUi();
    }
  },

  async _showRestaurants() {
    const restaurants = await RESTO_API.allRestaurants();
    const container = document.querySelector('.list-container');
    container.innerHTML = '';

    restaurants.forEach((restaurant) => {
      container.append(createListItem(restaurant));
    });
  },
};

export default Home;
