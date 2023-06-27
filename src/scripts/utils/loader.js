const Loader = {
  async remove(loader) {
    loader.classList.add('disappear');
    loader.addEventListener('click', () => {
      loader.classList.add('none');
    }, { once: true });
  },
};

export default Loader;
