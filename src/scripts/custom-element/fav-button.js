class FavButton extends HTMLElement {
  constructor({ like = false, id }) {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._like = like;
    this._id = id;
  }

  connectedCallback() {
    this._render();
    this._style();
  }

  _render() {
    this.setAttribute('id', this._id);
    this._shadowRoot.innerHTML = this._isFavorite();
  }

  _style() {
    this._shadowRoot.innerHTML += `
    <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    :host {
      --red: red;
      --light-yellow: #ffce70c7;
      --white: white;
      --height: 3rem;
      border-radius: 10rem;
      min-height: 44px;
      min-width: 44px;
      background-color: var(--light-yellow);
      display: block;
      height: var(--height);
      width: var(--height);
      position: fixed;
      top: 4.5rem;
      right: 0.7rem;
    }

    p {
      line-height: var(--height);
    }

    svg {
      height: 1.5rem;
      vertical-align: sub;
    }

    .icon {
      vertical-align: middle;
    }

    .liked {
      fill: var(--red);
    }

    .unliked {
      fill: var(--white)
    }
    </style>
    `;
  }

  _isFavorite() {
    if (this._like) {
      return '<p><span class="icon"><svg class="liked" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg></span></p>';
    }
    return '<p><span class="icon"><svg class="unliked" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg></span></p>';
  }

  _butoonListener() {
    this.addEventListener('click', this._clickHandler);
  }

  _clickHandler() {
    if (this._like) {
      this._addFavorite();
    } else {
      this._removeFavorite();
    }
  }

  _addFavorite() {
    // TODO : add to fav
  }

  _removeFavorite() {
    // TODO : remove from favorite
  }
}

customElements.define('fav-button', FavButton);

export default FavButton;
