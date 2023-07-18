const Loader = {
  async remove(loader) {
    loader.classList.add('none');
    // loader.addEventListener('click', () => {
    //   loader.classList.add('none');
    // }, { once: true });
  },
};

export default Loader;
