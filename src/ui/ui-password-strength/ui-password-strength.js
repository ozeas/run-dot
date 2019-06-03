const tagName = 'ui-password-strength';
const template = document.createElement('template');

const styled = `
    <style>
      .password-strength {
        width: 375px;
        height: 8px;
        display: flex;
        justify-content: space-between;
      }
      .password-strength div {
        width: 119px;
        border-radius: 10px;
      }

      .password-strength --normal {
        background: #EAEAF4;
      }

      .validation {
        margin-top: 16px;
        margin-bottom: 4px;
        text-align: left;
        display: flex;
        flex-direction: column;
        color: #696D8C;
      }

      .validation__item {
        display: flex;
        flex-direction: row;
        margin-bottom: 12px;
      }

      .validation__item__text {
        margin-left: 7px;
        margin-top: -5px;
      }

      .validation__item .validation__item--cicle {
        width: 10px;
        height: 10px;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
      }

      .--initial {
        background-color: #F79682;
      }

      .--second {
        background-color: #F7BC1C;
      }

      .--finished {
        background-color: #1FE6A8;
      }

      .--normal {
        background-color: #EAEAF4;
      }

      .--valid {
        background-color: #1FE6A8;
      }

      .--invalid {
        background-color: #F79682;
      }

      @media (min-width: 320px) and (max-width: 480px) {
        .password-strength {
          width: 100%;
        }
      }
    </style>
  `;

template.innerHTML = `
    ${styled}
    <div class="ui-password-strength">
      <div class="password-strength">
        <div class="password-strength__step1 --normal"></div>
        <div class="password-strength__step2 --normal"></div>
        <div class="password-strength__step3 --normal"></div>
      </div>
      <div class="validation">
        <div class="validation__item validation__length">
          <div class="validation__item--cicle --normal"></div>
          <div class="validation__item__text">Pelo menos 6 caracteres</div>
        </div>
        <div class="validation__item validation__uppercase">
          <div class="validation__item--cicle --normal"></div>
          <div class="validation__item__text">Pelo menos 1 uma letra maiúscula</div>
        </div>
        <div class="validation__item validation__number">
          <div class="validation__item--cicle --normal"></div>
          <div class="validation__item__text">Pelo menos 1 número</div>
        </div>
      </div>
    </div>
  `;

class UIPasswordStrengh extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attributesSent = [];
    this.validationsElements = null;
    this._defineValidationsElements();
    this._getStepsElements();
  }

  static get observedAttributes() {
    return [
      'validation-length',
      'validation-uppercase',
      'validation-number',
      'start-validation',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'start-validation':
        this.startValidation = newValue === 'true';
        break;
      default: {
        this._manageAttributesSent(name, newValue);
      }
    }
    this._handleValidation();
  }

  _handlePreValidation() {
    if (this.startValidation) {
      this._handleInvalidStatus();
    }

    const hasOneValid = this.attributesSent.find(attribute => attribute.value);
    if (!hasOneValid && !this.startValidation) {
      this._applyInitialStatus();
    }
  }

  _handleInvalidStatus() {
    this.validationsElements.forEach((validation) => {
      validation.element.classList.remove('--normal', '--valid');
      validation.element.classList.add('--invalid');
    });
  }

  _getStepsElements() {
    this.stepsElements = {
      step1: this.shadowRoot
        .querySelector('.password-strength__step1'),

      step2: this.shadowRoot
        .querySelector('.password-strength__step2'),

      step3: this.shadowRoot
        .querySelector('.password-strength__step3'),
    };
  }

  _defineValidationsElements() {
    const validateLength = this.shadowRoot
      .querySelector('.validation__length .validation__item--cicle');
    const validateUppercase = this.shadowRoot
      .querySelector('.validation__uppercase .validation__item--cicle');
    const validateNumber = this.shadowRoot
      .querySelector('.validation__number .validation__item--cicle');

    this.validationsElements = [
      { attribute: 'validation-length', element: validateLength },
      { attribute: 'validation-uppercase', element: validateUppercase },
      { attribute: 'validation-number', element: validateNumber },
    ];
  }

  _applyInitialStatus() {
    this.validationsElements.forEach((validation) => {
      validation.element.classList.remove('--valid', '--invalid');
      validation.element.classList.add('--normal');
    });
  }

  _getAddedAttribute(name) {
    return this.attributesSent.findIndex(attribute => attribute.name === name);
  }

  _getApprovedAttributes() {
    return this.attributesSent.filter(sent => sent.value);
  }

  _manageAttributesSent(name, newValue) {
    const value = newValue === 'true';
    const attributeIndice = this._getAddedAttribute(name);
    if (attributeIndice >= 0) {
      this.attributesSent[attributeIndice].value = value;
      return;
    }
    this.attributesSent.push({ name, value });
  }

  _handleSteps() {
    const allApproved = this._getApprovedAttributes();
    this._resetSteps();
    if (!allApproved.length) {
      return;
    }

    this._setProgressSteps(allApproved);
  }

  _handleValidation() {
    new Promise((resolve) => {
      resolve(this._handlePreValidation());
    })
      .then(() => {
        const allApproved = this._getApprovedAttributes();
        this._handleSteps();
        if (allApproved.length) {
          allApproved.forEach(({ name }) => {
            const validation = this.validationsElements
              .find(element => element.attribute === name);
            validation.element.classList.remove('--invalid');
            validation.element.classList.add('--valid');
          });
        }
      });
  }

  _resetSteps() {
    const steps = ['step1', 'step2', 'step3'];
    steps
      .forEach((step) => {
        this.stepsElements[step]
          .classList.remove('--initial', '--second', '--finished');

        this.stepsElements[step]
          .classList.add('--normal');
      });
  }

  _setProgressSteps(allApproved) {
    const steps = ['step1', 'step2', 'step3'];
    steps
      .forEach((step) => {
        this.stepsElements[step].classList.remove('--initial', '--second', '--finished');
      });

    this.stepsElements.step1.classList.remove('--normal');
    if (allApproved.length === 1) {
      this.stepsElements.step1.classList.add('--initial');
      return;
    }

    this.stepsElements.step2.classList.remove('--normal');
    if (allApproved.length === 2) {
      this.stepsElements.step1.classList.add('--second');
      this.stepsElements.step2.classList.add('--second');
      return;
    }

    this.stepsElements.step3.classList.remove('--normal');
    steps
      .forEach((step) => {
        this.stepsElements[step].classList.add('--finished');
      });
  }
}

window.customElements.define(tagName, UIPasswordStrengh);
