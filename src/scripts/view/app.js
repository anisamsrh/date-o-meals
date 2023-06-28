import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import Loader from '../utils/loader';
import OffCanvas from '../utils/off-canvas';

class App {
  constructor({
    button, drawer, content, loader,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._loader = loader;
  }

  // eslint-disable-next-line class-methods-use-this
  async _initiateOffCanvas() {
    OffCanvas.init({
      button: this._button,
      drawer: this._drawer,
    });
  }

  _useLoader() {
    window.addEventListener('load', Loader.remove(this._loader), { once: true });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    await this._initiateOffCanvas();
    this._useLoader();
  }
}

export default App;
