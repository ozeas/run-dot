const tagName = 'ui-button';
const template = document.createElement('template');
const styled = `
    <style>
      button {
        background: #17D499;
        height: 52px;
        width: 370px;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border: 1px solid #17D499;
      }

      button:disabled {
        background: #74d3b5b8;
        border: 1px solid #74d3b5b8;
        cursor: not-allowed;
      }

      @media (min-width: 320px) and (max-width: 480px) {
        button {
          width: 100%;
        }
      }
    </style>
  `;

template.innerHTML = `
    ${styled}
    <button
      name=""
      type="">
    </button>
  `;

class UIButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('button');
  }

  static get observedAttributes() {
    return ['label', 'name', 'type', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'label':
        this.button.innerHTML = newValue;
        break;
      case 'name':
        this.button.setAttribute('name', newValue);
        break;

      case 'type':
        this.button.setAttribute('type', newValue);
        break;

      case 'disabled':
        if (newValue === 'true') {
          this.button.setAttribute('disabled', 'true');
        } else {
          this.button.removeAttribute('disabled');
        }
        break;
      default:
        break;
    }
  }
}
window.customElements.define(tagName, UIButton);

export default UIButton;
