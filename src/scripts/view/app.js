import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import OffCanvas from '../utils/off-canvas';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
  }

  // eslint-disable-next-line class-methods-use-this
  async _initiateOffCanvas() {
    OffCanvas.init({
      button: this._button,
      drawer: this._drawer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    await this._initiateOffCanvas();
  }
}

export default App;
