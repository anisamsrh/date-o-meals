import RESTO_API from "../data/resto-api";

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

  disconnectedCallback() {}

  _render() {
    this._shadowRoot.innerHTML = `
    <form>
      <input id="review" type="textarea" placeholder="Your review here...">
      <button id="add-button">Add</button>
    </form>
    `;
  }

  async _sendReview(reviewData) {
    // TODO : fetch POST to API
    const reviewJSON = JSON.stringify(reviewData);
    const newReview = await RESTO_API.postReview(reviewJSON);
    return newReview;
  }

  _buttonListener() {
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
    });
  }

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
    </style>
    `;
  }
}

customElements.define('review-form', ReviewForm);
export default ReviewForm;
