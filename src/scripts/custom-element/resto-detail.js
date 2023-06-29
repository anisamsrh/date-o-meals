// Nama restoran
// Gambar
// Alamat
// Kota
// Deskripsi
// Menu Makanan
import CONFIG from '../global/config';
import FavButton from './fav-button';
import ReviewForm from './review-form';
import ReviewItem from './review-item';

class RestoDetail extends HTMLElement {
  constructor({
    id, name, description, city, address, pictureId, categories, menus, rating, customerReviews,
  }) {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._id = id;
    this._name = name;
    this._description = description;
    this._city = city;
    this._address = address;
    this._pictureId = pictureId;
    this._categories = categories;
    this._menus = menus;
    this._rating = rating;
    this._customerReviews = customerReviews;
  }

  connectedCallback() {
    this._render();
    this._style();
    this._addReviews();
    this._setCategories();
    this._setMenus();
    this._menusButtonListener();
    this._moreButtonListener();
    this._favButton();
  }

  _render() {
    this.setAttribute('id', this._id);
    this._shadowRoot.innerHTML = `
    <section class="s1">
      <section class="s3">
        <div class="img-container">
          <img src="${CONFIG.BASE_IMAGE_URL_SMALL}/${this._pictureId}" alt="Picture of ${this._name}">
          <h1 class="name">${this._name}</h1>
        </div>
        <p class="address"><span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 384 512"><style>svg{fill:#b40e1d}</style><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg></span>&nbsp;&nbsp;
        ${this._address}, ${this._city}</p>
      </section>
      <section class="s4">
        <div class="description">
        <p>${this._description}</p>
        <button class="more-button"><span> ... More</span></button>
        </div>
        <div class="categories"></div>
      </section>
    </section>
    <section class="s2">
      <h2>Menus</h2>
      <div class="menu-button">
        <button class="menu-button_foods active-button">Foods</button>
        <button class="menu-button_drinks">Drinks</button>
      </div>
      <div class="menu-list">
        <div class="menu-list_foods"></div>
        <div class="menu-list_drinks" style="display: none" ></div>
      </div>
    </section>
    `;
  }

  _style() {
    this._shadowRoot.innerHTML += `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
    :host {
      --red: #B40E1D;
      --yellow: #E5B04D;
      --light-yellow: #ffce70c7;
      --broken-white: #fefbf7;
      --card-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);
      --font: "Open Sans", sans-serif;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: var(--font);
    }

    button, a {
      min-height: 44px;
      min-width: 44px;
    }

    .img-container {
      width: 100%;
      margin-top: 4rem;
      height: 14rem;
      position: relative;
      overflow: hidden;
    }

    .img-container img {
      min-height: 100%;
      min-width: 100%;
    }

    .name {
      position: absolute;
      bottom: 0;
      line-height: 2rem;
      color: white;
      background: linear-gradient(45deg, var(--red), transparent);
      width: 100%;
      text-align: left;
      padding: 1rem;
      font-size: 1.5rem;
    letter-spacing: 0.05rem;
    }

    .address {
      line-height: 3rem;
      background-color: var(--light-yellow);
      text-align: left;
      padding-left: 1rem;
      box-shadow: var(--card-shadow);
    }

    .icon svg {
      vertical-align: middle;
    }

    .s4 {
      padding: 0.5rem;
    }

    .description {
      margin: 1rem;
      text-align: left;
      height: 8.28rem;
      overflow: hidden;
      position: relative;
    }

    .more-button {
      position: absolute;
      bottom: 0px;
      right: 0;
      background: white;
      border: none;
      font-size: 1rem;
      color: var(--red);
      background-color: transparent;
      display: flex;
      align-items: flex-end;
    }

    .more-button > span {
      background-color: white;
    }

    .categories {
      display: flex;
      column-gap: 1rem;
      padding: 1rem;
    }

    .categories p {
      padding: 0.5rem 1rem;
      background-color: var(--light-yellow);
      border-radius: 0.5rem;
      font-size: smaller;
    }

    .s2 {
      margin: 1.5rem auto 2rem auto;
    }

    h2 {
      color: #E5B04D;
      margin-bottom: 1rem;
    }

    .menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--card-shadow);
      width: 80%;
      margin: auto;
      border-radius: 0.7rem 0.7rem 0 0;
      max-width: 30rem;
    }

    .active-button {
      background-color: var(--red);
      color: white;
    }

    .menu-button button {
      border: none;
      padding: 1rem;
      min-width: 7rem;
      display: block;
      width: inherit;
    }

    .menu-button_foods {
      border-top-left-radius: 0.7rem;
    }

    .menu-button_drinks {
      border-top-right-radius: 0.7rem;
    }

    .menu-list {
      padding: 1rem;
      min-width: 14rem;
      margin: auto;
      background-color: var(--broken-white);
      box-shadow: var(--card-shadow);
      border-top: solid 0.25rem var(--red);
      border-radius: 0 0 0.7rem 0.7rem;
      width: 80%;
      max-width: 30rem;
    }

    .menu-list_foods p, .menu-list_drinks p {
      line-height: 1.75rem;
    }

    .review-container {
      display: grid;
      max-width: 60rem;
      width: 80%;
      margin: auto;
    }

    @media screen and (min-width: 600px) {
      .review-container {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media screen and (min-width: 752px) {
      .s1 {
        display: flex;
        margin: 2rem;
        gap: 1rem;
        max-width: 60rem;
      }

      .s4 {
        margin-top: 4rem;
      }
    }

    @media screen and (min-width: 994px) {
      .s1 {
        width: 80%;
        margin: 2rem auto;
      }
    }

    @media screen and (min-width: 1200px) {
      .review-container {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
    </style>
    `;
  }

  _setCategories() {
    this._categories.forEach((category) => {
      // const categoryElement = document.createElement('p');
      this._shadowRoot.querySelector('.categories').innerHTML += `<p>${category.name}</p>`;
    });
  }

  _setMenus() {
    this._menus.foods.forEach((food) => {
      this._shadowRoot.querySelector('.menu-list_foods').innerHTML += `<p>${food.name}</p>`;
    });
    this._menus.drinks.forEach((drink) => {
      this._shadowRoot.querySelector('.menu-list_drinks').innerHTML += `<p>${drink.name}</p>`;
    });
  }

  _menusButtonListener() {
    const controller = new AbortController();
    const { signal } = controller;
    this._shadowRoot.querySelector('.menu-button_foods').addEventListener('click', () => {
      this._shadowRoot.querySelector('.menu-list_foods').style.display = 'inherit';
      this._shadowRoot.querySelector('.menu-list_drinks').style.display = 'none';
      this._shadowRoot.querySelector('.menu-button_foods').classList.add('active-button');
      this._shadowRoot.querySelector('.menu-button_drinks').classList.remove('active-button');
    }, { signal });
    this._shadowRoot.querySelector('.menu-button_drinks').addEventListener('click', () => {
      this._shadowRoot.querySelector('.menu-list_drinks').style.display = 'inherit';
      this._shadowRoot.querySelector('.menu-list_foods').style.display = 'none';
      this._shadowRoot.querySelector('.menu-button_drinks').classList.add('active-button');
      this._shadowRoot.querySelector('.menu-button_foods').classList.remove('active-button');
    }, { signal });
    window.addEventListener('hashchange', () => controller.abort(), { once: true });
  }

  _moreButtonListener() {
    const controller = new AbortController();
    const { signal } = controller;
    this._shadowRoot.querySelector('.more-button').addEventListener('click', (e) => {
      e.preventDefault();
      this._shadowRoot.querySelector('.description').style.height = 'fit-content';
      e.target.style.display = 'none';
    }, { signal });

    this._shadowRoot.querySelector('.description').firstElementChild.addEventListener('click', (e) => {
      e.preventDefault();
      this._shadowRoot.querySelector('.description').style.height = '8.28rem';
      this._shadowRoot.querySelector('.more-button').style.display = 'initial';
    }, { signal });
    window.addEventListener('hashchange', () => controller.abort(), { once: true });
  }

  _addReviews() {
    const section = document.createElement('section');
    const reviewHeader = document.createElement('h2');
    reviewHeader.innerText = 'Review';
    const reviewForm = new ReviewForm(this._id);
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');

    const reviews = this._customerReviews.map((review) => {
      const reviewItem = new ReviewItem(review);
      return reviewItem;
    });

    section.append(reviewHeader);
    section.append(reviewForm);
    reviews.forEach((review) => {
      reviewContainer.append(review);
    });
    section.append(reviewContainer);

    this._shadowRoot.append(section);
  }

  _favButton() {
    const favButton = new FavButton({
      id: this._id,
      data: {
        id: this._id,
        name: this._name,
        description: this._description,
        city: this._city,
        rating: this._rating,
        pictureId: this._pictureId,
      },
    });
    this._shadowRoot.append(favButton);
  }
}

customElements.define('resto-detail', RestoDetail);

export default RestoDetail;
