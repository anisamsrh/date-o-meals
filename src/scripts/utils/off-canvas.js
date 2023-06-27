const OffCanvas = {
  async init({ button, drawer }) {
    this._button = button;
    this._drawer = drawer;
    this._addEvent();
  },

  _addEvent() {
    const controller = new AbortController();
    const { signal } = controller;
    this._button.addEventListener('click', () => this._listener(), { signal });
    window.addEventListener('hashchange', () => controller.abort(), { once: true });
  },

  _listener() {
    if (this._isDrawerOpen()) {
      this._closeDrawer();
    } else {
      this._openDrawer();
    }
  },

  _closeDrawer() {
    this._drawer.classList.remove('open');
    this._button.innerHTML = '&#9776;';
  },

  _openDrawer() {
    this._drawer.classList.add('open');
    this._button.innerHTML = '&times;';
  },

  _isDrawerOpen() {
    return this._drawer.classList.contains('open');
  },

  _removeListener() {
    this._button.removeEventListener('click', this._listener);
  },
};

export default OffCanvas;
