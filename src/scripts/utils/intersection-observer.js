const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

// eslint-disable-next-line no-unused-vars
const observerHandler = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.renderPicture();
    }
  });
};

const observer = new IntersectionObserver(observerHandler, options);

export default observer;
