import 'regenerator-runtime'; /* for async await transpile */
import '../styles/css/main.css';

// show data to home :
// 1. make item list
// 2. attach to main

// import './utils/generate-list-item';

// fungsi tambahan item list
// 1. extended text

// import './styles/item-list_extend-text';
// styles:
// nav_color-stabililizer
// nav_gradient-scroll

// import './styles/navbar_color-stabilize';
// import './styles/navbar_scroll-gradient';

// off canvas

// import './utils/off-canvas';

import App from './view/app';
import swRegister from './utils/sw-register';

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
  app.useLoader();
  swRegister();
});
