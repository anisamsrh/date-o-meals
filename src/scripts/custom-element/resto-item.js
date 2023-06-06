const newElement = (elmt) => document.createElement(elmt);

const main = document.getElementsByTagName('main')[0];

const newListItem = ({
  id, name, description, pictureId, city, rating,
}) => {
  const restoElement = newElement('article');
  restoElement.setAttribute('id', `${id}`);
  restoElement.classList.add('list-item');
  const restoElement_upper = newElement('section');
  restoElement_upper.setAttribute('class', 'upper-section');
  const restoElement_under = newElement('section');
  restoElement_under.setAttribute('class', 'under-section');

  const restoElement_picture = newElement('img');
  restoElement_picture.setAttribute('src', `${pictureId}`);
  restoElement_picture.setAttribute('class', 'resto-picture');
  restoElement_picture.setAttribute('alt', `Picture of ${name}`);

  const restoElement_name = newElement('h3');
  restoElement_name.innerText = name;
  restoElement_name.setAttribute('class', 'resto-name');

  const restoElement_rating = newElement('p');
  restoElement_rating.innerHTML = `<p>${rating.toFixed(1)}</p><img src="./images/rating/star-rating.jpg" alt="">`;
  restoElement_rating.setAttribute('class', 'resto-rating');

  const restoElement_city = newElement('p');
  restoElement_city.innerText = city;
  restoElement_city.setAttribute('class', 'resto-city');

  const restoElement_description = newElement('p');
  restoElement_description.innerText = description;
  restoElement_description.setAttribute('class', 'resto-description');

  const moreButton = newElement('button');
  moreButton.innerText = 'Read More';
  moreButton.classList.add('more-button', 'clickable');

  restoElement_upper.append(restoElement_rating, restoElement_picture);
  restoElement_under.append(restoElement_name, restoElement_city, restoElement_description, moreButton);
  restoElement.append(restoElement_upper, restoElement_under);
  main.lastElementChild.append(restoElement);
};

export default newListItem;

class RestoItem extends HTMLElement {
  constructor() {
    super();
    this._shadowElement = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._style();
  }

  disconnectedCallback() {}

  _render() {
    this._shadowRoot.innerHTML = `
    `;
  }

  _style() {
    this._shadowRoot.innerHTML += `
    <style>
    </style>
    `;
  }
}

customElements.define('resto-item', RestoItem);
