const tagName = 'ui-success-message';
const template = document.createElement('template');

const styled = `
  <style>
    :host {
      color: #312F4F;
      margin: 0 auto;
    }

    .ui-success-message__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ui-success__logo {
      margin-bottom: 5px;
    }

    h2 {
      font-size: 22px;
      line-height: 0;
      text-align: center;
      font-weight: normal;
      margin: 16px 0 21px 0;
    }

    p {
      font-size: 15px;
      line-height: 26px;
      text-align: center;
      width: 250px;
      font-weight: normal;
      margin: 0 auto;
    }
  </style>
`;

template.innerHTML = `
  ${styled}
  <div class="ui-success-message__container">
    <div class="ui-sucess__logo">
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.0001 50.3399L27.6601 41.9999L24.8201 44.8199L36.0001 55.9999L60.0001 31.9999L57.1801 29.1799L36.0001 50.3399Z" fill="#17D499"/>
        <circle cx="42" cy="42" r="40.5" stroke="#17D499" stroke-width="3"/>
      </svg>
    </div>
    <h2></h2>
    <p></p>
  </div>
`;

class UISuccessMessage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.subTitle = this.shadowRoot.querySelector('h2');
    this.message = this.shadowRoot.querySelector('p');
  }

  static get observedAttributes() {
    return ['sub-title', 'message'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'sub-title':
        this.subTitle.innerText = newValue;
        break;

      case 'message':
        this.message.innerText = newValue;
        break;

      default:
        break;
    }
  }
}

window.customElements.define(tagName, UISuccessMessage);

export default UISuccessMessage;
