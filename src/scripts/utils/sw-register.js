// const swRegister = async () => {
//   if (!('serviceWorker' in navigator)) {
//     console.log('Browser tidak mendukung Service Worker');
//   }

//   try {
//     await navigator.serviceWorker.register('./sw.bundle.js');
//     console.log('SW is registered');
//   } catch (error) {
//     console.log('Failed to register SW', error);
//   }
// };

// export default swRegister;
import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker is not supported');
    return;
  }

  const wb = new WorkboxWindow.Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.log('SW is registered');
  } catch (error) {
    console.log('Failed to register SW', error);
  }
};

export default swRegister;
