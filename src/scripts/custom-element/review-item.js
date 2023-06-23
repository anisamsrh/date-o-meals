class ReviewItem extends HTMLElement {
  constructor({ name, date, review }) {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._user = name;
    this._date = date;
    this._reviewText = review;
  }

  connectedCallback() {
    this._render();
    this._style();
  }

  _render() {
    this._shadowRoot.innerHTML = `
    <section class="up flex">
      <p>${this._user}</p>
      <p>${this._date}</p>
    </section>
    <section class="down">
      <p>${this._reviewText}</p>
    </section>
    `;
  }

  _style() {
    this._shadowRoot.innerHTML += `
    <style>
    :host {
      --yellow: #E5B04D;
      --light-yellow: #ffce70c7;
      --broken-white: #fefbf7;
      --font: "Open Sans", sans-serif;
      width: 80%;
      max-width: 25rem;
      min-width: 17rem;
      display: block;
      margin: 2rem auto 2rem auto !important;
      border-radius: 0.5rem;
      box-shadow: 0 0 1rem -0.3rem rgba(0, 0, 0, 0.2);
    }

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: var(--font);
    }

    .up {
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem 0.5rem 1rem;
      background-color: var(--light-yellow);
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .down {
      padding: 1rem;
      background: var(--broken-white);
      border-radius: 0 0 0.5rem 0.5rem;
    }
    </style>
    `;
  }
}

customElements.define('review-item', ReviewItem);

export default ReviewItem;
