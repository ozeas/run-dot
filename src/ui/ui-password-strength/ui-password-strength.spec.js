/* eslint-disable */
import './ui-password-strength';

describe('ui-password-strength', () => {
  let element, shadowRoot;
  beforeEach(() => {
    element = document.createElement('ui-password-strength');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('.ui-password-strength')).toBeTruthy();
  });

  [
    'validation-length',
    'validation-uppercase',
    'validation-number'
  ].forEach((validation) => {
    it(`shoud has one class .--valid and .--initial when reiceve attribute [${validation}=true]`, (done) => {
      new Promise(resolve => {
        resolve(element.setAttribute(validation, true));
      })
      .then(() => {
        const resultStep = [...shadowRoot.querySelectorAll('.password-strength .--initial')];
        expect(resultStep.length).toEqual(1);
        const result = [...shadowRoot.querySelectorAll(`.validation .--valid`)];
        expect(result.length).toEqual(1);
        done();
      });
    });
  });

  it('should two class --valid when two attributes validations with true', (done) => {
    new Promise(resolve => {
      const complete = () => {
        element.setAttribute('validation-length', true);
        element.setAttribute('validation-uppercase', true);
        return true;
      };
      resolve(complete());
    })
    .then(() => {
      const resultStep = [...shadowRoot.querySelectorAll('.password-strength .--second')];
        expect(resultStep.length).toEqual(2);
        const result = [...shadowRoot.querySelectorAll(`.validation .--valid`)];
        expect(result.length).toEqual(2);
        done();
    });
  });

  it('should three class --valid when two attributes validations with true', (done) => {
    new Promise(resolve => {
      const complete = () => {
        element.setAttribute('validation-length', true);
        element.setAttribute('validation-uppercase', true);
        element.setAttribute('validation-number', true);
        return true;
      };
      resolve(complete());
    })
    .then(() => {
      const resultStep = [...shadowRoot.querySelectorAll('.password-strength .--finished')];
        expect(resultStep.length).toEqual(3);
        const result = [...shadowRoot.querySelectorAll(`.validation .--valid`)];
        expect(result.length).toEqual(3);
        done();
    });
  });
});
