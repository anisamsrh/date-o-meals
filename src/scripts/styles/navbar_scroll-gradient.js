const navElement = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const screenWidth = document.body.clientWidth;
  if (screenWidth > 600) {
    const offset = window.scrollY / 10;
    const relHeight = navElement.offsetHeight;

    navElement.style.backgroundColor = `rgba(229,176,77, ${offset / relHeight})`;
  }
});
