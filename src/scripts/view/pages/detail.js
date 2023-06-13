import RESTO_API from '../../data/resto-api';
import UrlParser from '../../routes/url-parser';
import NavbarStylist from '../../styles/navbar-stylist';
import { createRestaurantDetail } from '../template/template-creator';

const Detail = {
  async render() {
    return `
    `;
  },

  async afterRender() {
    this._hideHero();
    this._navbarScrollGradient();
    await this._showRestaurantDetail();
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

  async _showRestaurantDetail() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RESTO_API.detailRestaurant(id);
    document.querySelector('#main').append(createRestaurantDetail(detail));
  },
};

export default Detail;
