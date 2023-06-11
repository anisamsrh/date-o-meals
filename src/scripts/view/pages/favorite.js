import NavbarStylist from '../../styles/navbar-stylist';

const Favorite = {
  async render() {
    return `
    <h2 class="list-title">My Favorite Places</h2>
    `;
  },

  async afterRender() {
    this._hideHero();
    this._navbarScrollGradient();
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
};

export default Favorite;
