import RESTO_API from '../data/resto-api';
import ReviewItem from './review-item';

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
    <form class="form">
      <section class="section1">
        <input id="name" class="input" type="text" placeholder="your name...">
        <input id="review" class="input" type="textarea" placeholder="Your review here...">
      </section>
      <section>
        <button id="add-button">Add</button>
      </section>
    </form>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  async _sendReview(reviewData) {
    const reviewJSON = JSON.stringify(reviewData);
    const newReview = await RESTO_API.postReview(reviewJSON);
    return newReview;
  }

  _buttonListener() {
    const controller = new AbortController();
    const { signal } = controller;
    const button = this._shadowRoot.querySelector('#add-button');
    this._shadowRoot.querySelector('.form').addEventListener('submit', (e) => {
      e.preventDefault();
    });
    button.addEventListener('click', async () => {
      const review = this._shadowRoot.querySelector('#review').value;
      const name = this._shadowRoot.querySelector('#name').value;
      const reviewData = {
        id: this._id,
        name,
        review,
      };
      const newReview = await this._sendReview(reviewData);
      await this._afterSendReview(newReview);
    }, { signal });
    window.addEventListener('hashchange', () => controller.abort(), { once: true });
  }

  // eslint-disable-next-line class-methods-use-this
  async _afterSendReview(newReview) {
    if (!newReview) {
      alert('Success sending review');
      const review = JSON.parse(newReview);
      const newReviewItem = new ReviewItem(review.customerReviews.pop());
      document.querySelector('resto-detail').shadowRoot.querySelector('review-container').prepend(newReviewItem);
    } else {
      alert('Failed sending review');
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
      width: 80%;
      margin: auto !important;
      max-width: 30rem;
      --red: #B40E1D;
      --yellow: #E5B04D;
      --light-yellow: #ffce70c7;
      --broken-white: #fefbf7;
      --card-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);
    }

    .input {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border-color: var(--light-yellow);
        border-style: solid;
        background: #fff9edc7;
        height: 3rem;
        max-width: calc(100% - 5rem);
        width: -webkit-fill-available;
        display: block;
        margin: 0.5rem auto;
    }

    .input:focus-visible{
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

    @media screen and (min-width: 600px) {
      .form {
        display: flex;
        justify-items: center;
        align-items: center;
      }
  
      .section1 {
        width: -webkit-fill-available;
      }
    }
    </style>
    `;
  }
}

customElements.define('review-form', ReviewForm);
export default ReviewForm;
