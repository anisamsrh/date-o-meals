const hamburgerElement = document.querySelector('.hamburger');
const drawerElement = document.querySelector('.drawer');

hamburgerElement.addEventListener('click', () => {
  if (drawerElement.classList.contains('open')) {
    drawerElement.classList.remove('open');
    hamburgerElement.innerHTML = '&#9776;';
  } else {
    drawerElement.classList.add('open');
    hamburgerElement.innerHTML = '&times;';
  }
});
