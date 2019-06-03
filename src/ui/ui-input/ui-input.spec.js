/* eslint-disable */

import './ui-input';

describe('ui-input component', () => {
  let element, shadowRoot;

  beforeEach(() => {
    element = document.createElement('ui-input');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('.ui-input')).toBeTruthy();
  });

  [
    {
      attribute: 'id',
      value: 'id-test'
    },
    {
      attribute: 'name',
      value: 'name-test'
    },
    {
      attribute: 'type',
      value: 'text'
    },
    {
      attribute: 'type',
      value: 'email'
    },
    {
      attribute: 'type',
      value: 'password'
    },
    {
      attribute: 'required',
      value: ''
    }
  ].forEach(test => {
    it(`should receive a attribute ${test.attribute} with value: ${test.value}`, () => {
      element.setAttribute(test.attribute, test.value);
      const result = shadowRoot.querySelector('input').getAttribute(test.attribute);
      expect(result).toEqual(test.value);
    });
  });

  it('should receive a attribute title', () => {
    element.setAttribute('title', 'Full Name');
    const result = shadowRoot.querySelector('label').innerHTML;
    expect(result).toEqual('Full Name');
  });
});
