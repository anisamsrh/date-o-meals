import NavbarStylist from '../../styles/navbar-stylist';

const Detail = {
  async render() {
    return `
    <h2 class="list-title">Nama Resto</h2>
    `;
  },

  afterRender() {
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

export default Detail;
