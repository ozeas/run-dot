const tagName = 'singup-page';
const template = document.createElement('template');

const styled = `
    <style>
      .singup-page {
        min-width: 515px;
        width: 515px;
        padding: 60px 70px 48px 70px;
        background: #FFFFFF;
        border: 3px solid #F2F2F2;
        box-sizing: border-box;
        text-align: center;
      }

      @media (min-width: 320px) and (max-width: 480px) {
        .singup-page {
          width: 330px;
          min-width: 100%;
          padding: 10px;
        }
      }

      @media (min-width: 375px) {
        .singup-page {
          width: 360px;
        }
      }

      .singup-page__title {
        margin-bottom: 26px;
      }
      .singup-page__title h2 {
        font-size: 22px;
        text-align: center;
        color: #312F4F;
        font-weight: normal;
      }
      .singup-page__input {
        text-align: left;
        margin-bottom: 19px;
      }
      .singup-page__input--last {
        margin-bottom: 32px;
      }
      .singup-page__input--password {
        margin-bottom: 8px;
      }

      .log-message-passowrdconfig {
        color: #f8a291;
        font-size: 12px;
      }

      .message-success {
        display: none;
        margin-top: 92px;
        margin-bottom: 55px;
      }
    </style>
  `;
template.innerHTML = `
    ${styled}
    <div class="singup-page">
      <div class="singup-page__logotype">
        <ui-logo-type></ui-logo-type>
      </div>
      <div class="message-success">
        <ui-success-message
          sub-title="Tudo certo"
          message="Verifique sua caixa de entrada para confirmar seu email">
        </ui-success-message>
      </div>
      <form name="form-singup-page">
        <div class="singup-page__title">
          <h2>Crie sua conta</h2>
        </div>
        <div class="singup-page__input">
          <ui-input
            title="Nome completo"
            id="full-name"
            name="fullname"
            required></ui-input>
        </div>
        <div class="singup-page__input">
          <ui-input
            title="E-mail"
            id="e-mail"
            name="email"
            type="email"
            required></ui-input>
        </div>
        <div class="singup-page__input singup-page__input--password">
          <ui-input
            title="Senha"
            id="password"
            type="password"
            name="password"
            required></ui-input>
        </div>
        <div class="singup-page__passwordstrength">
          <ui-password-strength></ui-password-strength>
        </div>
        <div class="singup-page__input singup-page__input--last">
          <ui-input
            title="Confirme sua senha"
            id="confirm-password"
            name="confirmpassword"
            type="password"
            required></ui-input>
          <span class="log-message-passowrdconfig"></span>
        </div>
        <div class="sinup-page__button">
          <ui-button
            name="btn-save"
            type="submit"
            label="Criar conta">
            </ui-button>
        <div>
      </form>
    </div>
  `;
class SingUpPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.data = {};
  }

  connectedCallback() {
    this._defineRulesValidation();
    this._getPasswordStrengthComponent();
    this._getConfirmPasswordElement();
    this._getLogMessageOfConfirmPassword();
    this._getAllFormInputs();
    this._setListeningPasswordStrength();

    this._defineListeningInputs();
    this._defineSubmitEvent();
  }

  _applyValidationOnInputPasswordStrength(approvedList) {
    const element = this.passwordElement.input;
    this.data[element.name].isValid = false;

    this.passwordElement.setAttribute('error', true);
    if (!approvedList.length) {
      return;
    }

    if (approvedList.length < 3) {
      return;
    }
    this.data[element.name].isValid = true;
    this.passwordElement.setAttribute('error', false);
  }

  _checkValidationSubmit() {
    const isValid = Object.keys(this.data).find(field => this.data[field].isValid !== true);
    if (isValid) {
      this.submitButton.setAttribute('disabled', true);
      return;
    }
    this.submitButton.setAttribute('disabled', false);
  }

  _defineListeningInputs() {
    const elements = this.allFormElements;
    const handleOnInput = (event) => {
      const inputElement = event.target.input;
      const { name, value } = inputElement;
      this.data[name] = {
        value,
        isValid: inputElement.validity.valid,
      };

      inputElement.classList.remove('error');
      inputElement.classList.add('valid');
      if (!inputElement.validity.valid) {
        inputElement.classList.remove('valid');
        inputElement.classList.add('error');
      }
      this._checkValidationSubmit();
    };
    elements.forEach((element) => {
      if (element.hasAttribute('required')) {
        this.data[element.getAttribute('name')] = {
          isValid: false,
        };
      }
      element.addEventListener('input', handleOnInput);
    });
  }

  _defineRulesValidation() {
    this.rules = {
      oneNumber: text => /[0-9]/.test(text),
      oneLetterUpercase: text => /[A-Z]/.test(text),
      minLength: text => text.length >= 6,
    };
  }

  _defineSubmitEvent() {
    setTimeout(() => {
      this.submitButton = this.shadowRoot.querySelector('form ui-button');
      this.form = this.shadowRoot.querySelector('form');
      this.form.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          this._submitForm();
        }
      });
      this.submitButton.addEventListener('click', () => {
        this._submitForm();
      });
      this._checkValidationSubmit();
    }, 300);
  }

  _getAllFormInputs() {
    this.allFormElements = [...this.shadowRoot.querySelectorAll('form ui-input')];
  }

  _getConfirmPasswordElement() {
    this.confirmPassword = this.shadowRoot.querySelector('form ui-input[name="confirmpassword"]');
  }

  _getLogMessageOfConfirmPassword() {
    this.logMessageConfirmPassword = this.shadowRoot.querySelector('form .log-message-passowrdconfig');
  }

  _getPasswordStrengthComponent() {
    this.passwordStrength = this.shadowRoot.querySelector('ui-password-strength');
  }

  _handleDisapprovedAttributes(approvedList) {
    const allAttributes = [
      'validation-number',
      'validation-uppercase',
      'validation-length',
    ];
    const attributesApproved = approvedList.map(approved => approved.attribute);
    const attributesDisapproved = allAttributes
      .filter(attribute => !attributesApproved.includes(attribute));

    attributesDisapproved.forEach((attribute) => {
      if (this.passwordStrength.hasAttribute(attribute)) {
        this.passwordStrength.setAttribute(attribute, false);
      }
    });
  }

  _handleValidationProgress(approvedList) {
    this._handleDisapprovedAttributes(approvedList);
    this._applyValidationOnInputPasswordStrength(approvedList);
    if (!approvedList.length) {
      return;
    }
    approvedList.forEach(({ attribute, value }) => {
      this.passwordStrength.setAttribute(attribute, value);
    });
  }

  _isInvalidConfirmPassword() {
    const passwordInput = this.passwordElement;
    const confirmPasswordInput = this.confirmPassword;
    const logMessage = this.logMessageConfirmPassword;

    if (passwordInput.input.value !== confirmPasswordInput.input.value) {
      logMessage.innerHTML = 'As senhas devem ser iguais';
      this.data[confirmPasswordInput.input.name].isValid = false;
      confirmPasswordInput.input.classList.remove('valid');
      confirmPasswordInput.input.classList.add('error');
      this._checkValidationSubmit();
      return true;
    }

    passwordInput.input.classList.remove('error');
    logMessage.innerHTML = '';
    this.data[confirmPasswordInput.input.name].isValid = true;
    return false;
  }

  _isInvalidForm() {
    let noError = false;
    this.allFormElements.forEach(({ input }) => {
      input.classList.remove('error', 'valid');
      if (input.validity.valid) {
        input.classList.add('valid');
      } else {
        noError = true;
        input.classList.add('error');
      }
    });

    const passwordInvalid = this.data[this.passwordElement.input.name].isValid;
    if (!passwordInvalid) {
      this.passwordElement.setAttribute('error', 'true');
      noError = true;
    }

    if (noError) {
      this._checkValidationSubmit();
    }

    return noError;
  }

  _setListeningPasswordStrength() {
    const vm = this;
    this.passwordElement = this.shadowRoot.querySelector('form #password');
    this.passwordElement.addEventListener('input', function input() {
      setTimeout(() => {
        vm._verifyPasswordStrength(this.input.value);
      }, 200);
    }, false);
  }

  _submitForm() {
    if (this._isInvalidForm()) {
      return false;
    }
    if (this._isInvalidConfirmPassword()) {
      return false;
    }

    const form = this.shadowRoot.querySelector('form');
    const messageSuccess = this.shadowRoot.querySelector('.message-success');
    this.submitButton.setAttribute('label', '<ui-spinner></ui-spinner>');
    setTimeout(() => {
      form.style.display = 'none';
      messageSuccess.style.display = 'block';
    }, 3000);
    return true;
  }

  _verifyPasswordStrength(text) {
    this.passwordStrength.setAttribute('start-validation', text.length > 0);

    const approvedList = [];
    if (this.rules.oneNumber(text)) {
      approvedList.push({ attribute: 'validation-number', value: true });
    }

    if (this.rules.oneLetterUpercase(text)) {
      approvedList.push({ attribute: 'validation-uppercase', value: true });
    }

    if (this.rules.minLength(text)) {
      approvedList.push({ attribute: 'validation-length', value: true });
    }
    this.data[this.passwordElement.input.name].isValid = true;
    this.passwordElement.setAttribute('error', false);
    this.passwordElement.input.classList.add('valid');
    this._handleValidationProgress(approvedList);
    return approvedList;
  }
}
window.customElements.define(tagName, SingUpPage);
