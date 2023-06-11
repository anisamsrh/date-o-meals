import NavbarStylist from '../../styles/navbar-stylist';

const Home = {
  async render() {
    return `
    <h2 class="list-title">Explore Restaurant and Cafe</h2>
    `;
  },

  async afterRender() {
    this._showHero();
    this._navbarScrollGradient();
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
};

export default Home;
