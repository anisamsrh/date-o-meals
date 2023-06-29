import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import Loader from '../utils/loader';
import OffCanvas from '../utils/off-canvas';

class App {
  constructor({
    button, drawer, content, loader = null, skipToContent = null,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._loader = loader;
    this._skipToContent = skipToContent;
  }

  // eslint-disable-next-line class-methods-use-this
  async _initiateOffCanvas() {
    OffCanvas.init({
      button: this._button,
      drawer: this._drawer,
    });
  }

  useLoader() {
    if (this._loader) {
      window.addEventListener('load', Loader.remove(this._loader), { once: true });
    }
  }

  _useSkipToContent() {
    if (this._skipToContent) {
      this._skipToContent.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main').focus();
      });
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    await this._initiateOffCanvas();
    // this._useLoader();
    this._useSkipToContent();
  }
}

export default App;
