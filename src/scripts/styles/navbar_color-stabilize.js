const navElement = document.querySelector('nav');

window.addEventListener('resize', () => {
  const screenWidth = document.body.clientWidth;
  if (screenWidth > 600) {
    navElement.style.backgroundColor = 'transparent';
  } else {
    navElement.style.backgroundColor = 'rgb(229,176,77)';
  }
});
