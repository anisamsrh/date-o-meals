import 'regenerator-runtime'; /* for async await transpile */
import swRegister from './utils/sw-register';

window.addEventListener('load', () => {
  swRegister();
});
