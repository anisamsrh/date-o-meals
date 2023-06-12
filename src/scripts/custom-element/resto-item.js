import CONFIG from '../global/config';

class RestoItem extends HTMLElement {
  constructor({
    id, name, description, pictureId, city, rating,
  }) {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._id = id;
    this._name = name;
    this._description = description;
    this._pictureId = pictureId;
    this._city = city;
    this._rating = rating;
  }

  connectedCallback() {
    this._render();
    this._style();
  }

  _render() {
    this.setAttribute('id', `${this._id}`);
    this.classList.add('list-item');
    this._shadowRoot.innerHTML = `
    <section class="upper-section">
      <img class="resto-picture" src="${CONFIG.BASE_IMAGE_URL_SMALL}/${this._pictureId}" alt="Picture of ${this._name}">
      <div class="resto-rating"><p>${this._rating.toFixed(1)}</p><img src="./images/rating/star-rating.jpg"></div>
    </section>
    <section class="under-section">
      <h3 class="resto-name">${this._name}</h3>
      <p class="resto-city">${this._city}</p>
      <p class="resto-description">${this._description}</p>
      <button class="more-button clickable">Read More</p>
    </section>
    `;
  }

  _style() {
    this._shadowRoot.innerHTML += `
    <style>
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    }

    :host {
      width: 100%;
      max-width: 26rem;
      min-width: 17rem;
      margin: auto;
      overflow-wrap: normal;
      word-wrap: break-word;
      background-color: #fefbf7;
      border-radius: 1rem;
      box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);
    }

    .upper-section {
      height: 20rem;
      overflow: hidden;
      clip: auto;
      position: relative;
    }
    
    .resto-picture {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 1rem 1rem 0 0;
      object-fit: cover;
    }
    @media screen and (min-width: 600px) {
      .resto-picture {
        min-height: 100%;
        max-height: 110%;
        min-width: 100%;
        max-width: 110%;
      }
    }
    
    .resto-rating {
      width: 6rem;
      position: absolute;
      top: 0;
      display: flex;
      background-color: #B40E1D;
    }
    .resto-rating p {
      position: absolute;
      line-height: 3.3rem;
      font-size: 1.1rem;
      font-weight: bold;
      width: 3.3rem;
      aspect-ratio: 1;
      left: 0;
      z-index: 2;
      color: white;
      margin-left: 0.5rem;
    }
    @media screen and (min-width: 600px) {
      .resto-rating p {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-rating p {
        font-size: 1.6rem;
      }
    }
    .resto-rating img {
      position: absolute;
      line-height: 3.3rem;
      font-size: 1.1rem;
      font-weight: bold;
      width: 3.3rem;
      aspect-ratio: 1;
      right: 0;
      z-index: 2;
      color: white;
      width: calc(3.3rem - 10%);
      margin-top: 0.33rem;
      margin-right: 0.3rem;
    }
    @media screen and (min-width: 600px) {
      .resto-rating img {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-rating img {
        font-size: 1.6rem;
      }
    }
    .resto-rating::before {
      content: "";
      display: block;
      width: 4.35rem;
      position: absolute;
      top: 0;
      border: 1.65rem solid #B40E1D;
      border-right-color: transparent;
      line-height: 0;
    }
    .resto-rating::after {
      content: "";
      position: absolute;
      top: 0;
      width: 6rem;
      height: 2.3rem;
      background-color: #B40E1D;
    }
    @media screen and (min-width: 600px) {
      .resto-rating {
        width: 6.5rem;
      }
      .resto-rating p {
        position: absolute;
        line-height: 3.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        width: 3.5rem;
        aspect-ratio: 1;
        left: 0;
        z-index: 2;
        color: white;
        margin-left: 0.5rem;
      }
    }
    @media screen and (min-width: 600px) and (min-width: 600px) {
      .resto-rating p {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 600px) and (min-width: 768px) {
      .resto-rating p {
        font-size: 1.6rem;
      }
    }
    @media screen and (min-width: 600px) {
      .resto-rating img {
        position: absolute;
        line-height: 3.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        width: 3.5rem;
        aspect-ratio: 1;
        right: 0;
        z-index: 2;
        color: white;
        width: calc(3.5rem - 10%);
        margin-top: 0.35rem;
        margin-right: 0.3rem;
      }
    }
    @media screen and (min-width: 600px) and (min-width: 600px) {
      .resto-rating img {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 600px) and (min-width: 768px) {
      .resto-rating img {
        font-size: 1.6rem;
      }
    }
    @media screen and (min-width: 600px) {
      .resto-rating::before {
        border: 1.75rem solid #B40E1D;
        border-right-color: transparent;
        width: 4.75rem;
      }
      .resto-rating::after {
        width: 6.5rem;
        height: 2.5rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-rating {
        width: 7rem;
      }
      .resto-rating p {
        position: absolute;
        line-height: 3.9rem;
        font-size: 1.1rem;
        font-weight: bold;
        width: 3.9rem;
        aspect-ratio: 1;
        left: 0;
        z-index: 2;
        color: white;
        margin-left: 0.5rem;
      }
    }
    @media screen and (min-width: 768px) and (min-width: 600px) {
      .resto-rating p {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 768px) and (min-width: 768px) {
      .resto-rating p {
        font-size: 1.6rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-rating img {
        position: absolute;
        line-height: 3.9rem;
        font-size: 1.1rem;
        font-weight: bold;
        width: 3.9rem;
        aspect-ratio: 1;
        right: 0;
        z-index: 2;
        color: white;
        width: calc(3.9rem - 10%);
        margin-top: 0.39rem;
        margin-right: 0.3rem;
      }
    }
    @media screen and (min-width: 768px) and (min-width: 600px) {
      .resto-rating img {
        font-size: 1.4rem;
      }
    }
    @media screen and (min-width: 768px) and (min-width: 768px) {
      .resto-rating img {
        font-size: 1.6rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-rating::before {
        border: 1.95rem solid #B40E1D;
        border-right-color: transparent;
        width: 5.05rem;
      }
      .resto-rating::after {
        width: 7rem;
        height: 2.9rem;
      }
    }
    
    .under-section {
      border-radius: 0 0 1rem 1rem;
      padding: 1rem 2rem 1rem 2rem;
      width: 100%;
    }
    .under-section * {
      text-align: left;
    }
    
    .resto-name {
      font-size: 1.1rem;
    }
    @media screen and (min-width: 600px) {
      .resto-name {
        font-size: 1.3rem;
      }
    }
    @media screen and (min-width: 600px) {
      .resto-name {
        font-size: 1.4rem;
      }
    }
    
    .resto-city {
      font-size: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      color: #B40E1D;
    }
    @media screen and (min-width: 600px) {
      .resto-city {
        font-size: 1.1rem;
      }
    }
    @media screen and (min-width: 768px) {
      .resto-city {
        font-size: 1.2rem;
      }
    }
    
    .resto-description {
      width: 100%;
      height: 10rem;
      margin-bottom: 5px;
      font-size: 0.9rem;
      line-height: 1.7rem;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media screen and (min-width: 600px) {
      .resto-description {
        font-size: 1rem;
      }
    }
    @media screen and (min-width: 600px) {
      .resto-description {
        font-size: 1.1rem;
      }
    }
    
    .more-button {
      color: rgb(0, 183, 255);
      text-decoration: underline;
      font-size: 1rem;
      padding: 0 0.5rem;
      line-height: 2rem;
      background-color: transparent;
      border: none;
    }
    .more-button:hover {
      color: #b3e0f2;
    }
    .more-button:focus {
      color: #b3e0f2;
    }
    @media screen and (min-width: 768px) {
      .more-button {
        margin-top: 1rem;
        font-size: 1.1rem;
      }
    }
    
    </style>
    `;
  }
}

customElements.define('resto-item', RestoItem);

export default RestoItem;
