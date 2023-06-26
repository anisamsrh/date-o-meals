import RESTO_API from '../data/resto-api';

class ReviewForm extends HTMLElement {
  constructor(id) {
    super();
    this._id = id;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._style();
    this._buttonListener();
  }

  _render() {
    this._shadowRoot.innerHTML = `
    <form>
      <input id="review" type="textarea" placeholder="Your review here...">
      <button id="add-button">Add</button>
    </form>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  async _sendReview(reviewData) {
    // TODO : fetch POST to API
    const reviewJSON = JSON.stringify(reviewData);
    const newReview = await RESTO_API.postReview(reviewJSON);
    return newReview;
  }

  _buttonListener() {
    const controller = new AbortController();
    const { signal } = controller;
    const button = this._shadowRoot.querySelector('#add-button');
    button.addEventListener('click', async () => {
      const review = this._shadowRoot.querySelector('#review').value;
      const reviewData = {
        id: this._id,
        name: 'test-user-dev',
        review,
      };
      const newReview = await this._sendReview(reviewData);
      this._afterSendReview(newReview);
    }, { signal });
    window.addEventListener('hashchange', () => controller.abort(), { once: true });
  }

  // eslint-disable-next-line class-methods-use-this
  _afterSendReview(newReview) {
    if (!newReview) {
      alert('Berhasil mengirim review');
    } else {
      alert('Gagal mengirim review');
    }
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
      display: block;
      margin: auto;
      --red: #B40E1D;
      --yellow: #E5B04D;
      --light-yellow: #ffce70c7;
      --broken-white: #fefbf7;
      --card-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);
    }

    #review {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border-color: var(--light-yellow);
        border-style: solid;
        background: #fff9edc7;
        height: 3rem;
    }

    #review:focus-visible{
      border-color: var(--yellow);
      outline: none;
    }

    #add-button {
      border-radius: 0.5rem;
      min-width: 44px;
      min-height: 44px;
      height: 3rem;
      width: 4rem;
      background: var(--red);
      border-color: var(--broken-white);
      color: white;
    }
    </style>
    `;
  }
}

customElements.define('review-form', ReviewForm);
export default ReviewForm;
