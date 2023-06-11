// const hamburgerElement = document.querySelector('.hamburger');
// const drawerElement = document.querySelector('.drawer');

// hamburgerElement.addEventListener('click', () => {
//   if (drawerElement.classList.contains('open')) {
//     drawerElement.classList.remove('open');
//     hamburgerElement.innerHTML = '&#9776;';
//   } else {
//     drawerElement.classList.add('open');
//     hamburgerElement.innerHTML = '&times;';
//   }
// });

const OffCanvas = {
  async init({ button, drawer }) {
    this._button = button;
    this._drawer = drawer;

    this._button.addEventListener('click', () => this._listener());
  },

  _listener() {
    if (this._isDrawerOpen()) {
      this._openDrawer();
    } else {
      this._closeDrawer();
    }
  },

  _openDrawer() {
    this._drawer.classList.remove('open');
    this._button.innerHTML = '&#9776;';
  },

  _closeDrawer() {
    this._drawer.classList.add('open');
    this._button.innerHTML = '&times;';
  },

  _isDrawerOpen() {
    return this._drawer.classList.contains('open');
  },
};

export default OffCanvas;
