/* eslint-disable */

import './SignUpPage';

describe('signup-page component', () => {
  let element, shadowRoot;

  beforeEach(() => {
    element = document.createElement('signup-page');
    element.setAttribute('style', 'display: none;');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  it('should mount componenent', () => {
    expect(shadowRoot.querySelector('.signup-page')).toBeTruthy();
  });

  it('should has submit button disabled with invalid form', (done) => {
    setTimeout(() => {
      const uiButton = shadowRoot.querySelector('ui-button');
      expect(uiButton.button.getAttribute('disabled')).toBeTruthy();
      done();
    }, 300);
  });

  it('should returned error with invalid submit', (done) => {
    setTimeout(() => {
      const error = element._submitForm();
      const uiButton = shadowRoot.querySelector('ui-button');
      expect(uiButton.button.getAttribute('disabled')).toBeTruthy();
      expect(error).toBeFalsy();
      done();
    }, 300);
  });

  it('should has error with invalid input e-mail', (done) => {
    setTimeout(() => {
      const allInputs = [...shadowRoot.querySelectorAll('form ui-input')];
      allInputs.forEach(uiInput => {
        uiInput.input.setAttribute('value', 'Test');
      });
      const emailInput = shadowRoot.querySelector('form ui-input[type="email"]');
      emailInput.input.value = 'Test';
      element._submitForm();
      expect(emailInput.input.classList.contains('error')).toBeTruthy();
      done();
    }, 300);
  });

  it('should has error with invalid input confirm password', (done) => {
    setTimeout(() => {
      const allInputs = [...shadowRoot.querySelectorAll('form ui-input')];
      allInputs.forEach(uiInput => {
        uiInput.input.setAttribute('value', 'Mpll33');
      });
      const emailInput = shadowRoot.querySelector('form ui-input[type="email"]');
      emailInput.input.value = 'test@test.com';

      const confirmPasswordInput = shadowRoot.querySelector('form ui-input[name="confirmpassword"]');
      confirmPasswordInput.input.value = '1234433';
      element._verifyPasswordStrength('Mpll33');
      element._submitForm();
      expect(confirmPasswordInput.input.classList.contains('error')).toBeTruthy();
      done();
    }, 300);
  });

  it('should has error with invalid password', (done) => {
    setTimeout(() => {
      const allInputs = [...shadowRoot.querySelectorAll('form ui-input')];
      allInputs.forEach(uiInput => {
        uiInput.input.setAttribute('value', 'Teste-');
      });
      const emailInput = shadowRoot.querySelector('form ui-input[type="email"]');
      emailInput.input.value = 'test@test.com';

      const password = shadowRoot.querySelector('form ui-input[name="password"]');
      element._verifyPasswordStrength(password.input.value);
      element._submitForm();
      const result = [...password.input.classList];
      expect(result[0]).toEqual('error');
      done();
    }, 300);
  });

  it('should has spinner-loading on button submit with valid form', (done) => {
    setTimeout(() => {
      const allInputs = [...shadowRoot.querySelectorAll('form ui-input')];
      allInputs.forEach(uiInput => {
        uiInput.input.setAttribute('value', 'Mpll33-');
      });
      const emailInput = shadowRoot.querySelector('form ui-input[type="email"]');
      emailInput.input.value = 'test@test.com';

      const submitButton = shadowRoot.querySelector('form ui-button');
      element._verifyPasswordStrength('Mpll33-');
      element._submitForm();
      expect(submitButton.getAttribute('label')).toEqual('<ui-spinner></ui-spinner>');
      done();
    }, 300);
  });

  it('should show ui-success-message with valid submit form', (done) => {
    setTimeout(() => {
      const allInputs = [...shadowRoot.querySelectorAll('form ui-input')];
      allInputs.forEach(uiInput => {
        uiInput.input.setAttribute('value', 'Mpll33-');
      });
      const emailInput = shadowRoot.querySelector('form ui-input[type="email"]');
      emailInput.input.value = 'test@test.com';

      element._verifyPasswordStrength('Mpll33-');
      element._submitForm();
      setTimeout(() => {
        const uiSuccess = shadowRoot.querySelector('ui-success-message');
        expect(uiSuccess).toBeTruthy();
        done();
      })
    }, 3000);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
