import 'regenerator-runtime'; /* for async await transpile */
import '../styles/css/main.css';

import App from './view/app';

const app = new App({
  button: document.querySelector('.hamburger'),
  drawer: document.querySelector('.drawer'),
  content: document.querySelector('#main'),
  loader: document.querySelector('.loader'),
  skipToContent: document.querySelector('.skip-to-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  // app.useLoader();
  // swRegister();
});
