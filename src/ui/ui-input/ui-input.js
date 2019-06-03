const tagName = 'ui-input';
const template = document.createElement('template');

const styled = `
  <style>
    label {
      color: #696D8C;
      font-size: 1em;
      line-height: 26px;
      display: block;
      margin-bottom: 0px;
    }
    input {
      border: 1px solid #B6B9D0;
      box-sizing: border-box;
      box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.05);
      width: 370px;
      height: 44px;
      color: #312F4F;
      font-size: 1em;
      padding: 0 10px;
    }

    .error {
      border: 1px solid #F79682;
    }

    .valid {
      border: 1px solid #17D499;
    }

    @media (min-width: 320px) and (max-width: 480px) {
      input {
        width: 100%;
      }
    }
  </style>
`;

template.innerHTML = `
  ${styled}
  <div class="ui-input">
    <label for=""></label>
    <input
      type="text" />
  </div>
`;

class UIInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.label = this.shadowRoot.querySelector('label');
    this.input = this.shadowRoot.querySelector('input');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.input.setAttribute('type', newValue);
        break;

      case 'id':
        this.input.setAttribute('id', newValue);
        this.label.htmlFor = newValue;
        break;

      case 'name':
        this.input.setAttribute('name', newValue);
        break;

      case 'title':
        this.label.innerHTML = newValue;
        break;

      case 'required':
        this.input.setAttribute('required', '');
        break;

      case 'error':
        if (newValue === 'true') {
          this.input.classList.remove('valid');
          this.input.classList.add('error');
        }

        if (newValue === 'false') {
          this.input.classList.remove('error');
          this.input.classList.add('valid');
        }
        break;
      default:
        break;
    }
  }

  static get observedAttributes() {
    return ['error', 'id', 'name', 'title', 'required', 'type'];
  }
}

window.customElements.define(tagName, UIInput);
