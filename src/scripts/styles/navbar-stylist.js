// const navElement = document.querySelector('nav');

// window.addEventListener('scroll', () => {
//   const screenWidth = document.body.clientWidth;
//   if (screenWidth > 600) {
//     const offset = window.scrollY / 10;
//     const relHeight = navElement.offsetHeight;

//     navElement.style.backgroundColor = `rgba(229,176,77, ${offset / relHeight})`;
//   }
// });
// const navElement = document.querySelector('nav');

// window.addEventListener('resize', () => {
//   const screenWidth = document.body.clientWidth;
//   if (screenWidth > 600) {
//     navElement.style.backgroundColor = 'transparent';
//   } else {
//     navElement.style.backgroundColor = 'rgb(229,176,77)';
//   }
// });

const NavbarStylist = {
  scrollGradient({ navbar, on = true }) {
    const controller = new AbortController();
    const { signal } = controller;
    if (on) {
      window.addEventListener('scroll', () => this._scrollGradientOn(navbar), { signal });
      window.addEventListener('resize', () => this._colorStabilizer(navbar), { signal });
      window.addEventListener('hashchange', () => controller.abort(), { once: true });
    } else {
      this._scrollGradientOff(navbar);
    }
  },

  _scrollGradientOn(navbar) {
    if (this._isScreenWideEnough()) {
      const offset = window.scrollY / 10;
      const relHeight = navbar.offsetHeight;

      this._colorSetter(navbar, `rgba(229,176,77, ${offset / relHeight})`);
    }
  },

  _scrollGradientOff(navbar) {
    this._colorSetter(navbar, 'rgb(229,176,77)');
  },

  _isScreenWideEnough() {
    const screenWidth = document.body.clientWidth;
    return screenWidth > 600;
  },

  _colorStabilizer(navbar) {
    if (this._isScreenWideEnough()) {
      this._colorSetter(navbar, 'transparent');
    } else {
      this._colorSetter(navbar, 'rgb(229,176,77)');
    }
  },

  _colorSetter(navbar, color) {
    // eslint-disable-next-line no-param-reassign
    navbar.style.backgroundColor = `${color}`;
  },
};

export default NavbarStylist;
