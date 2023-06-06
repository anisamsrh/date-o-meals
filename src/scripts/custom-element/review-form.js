class ReviewForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
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

customElements.define('review-form', ReviewForm);
