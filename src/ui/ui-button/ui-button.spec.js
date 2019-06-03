/* eslint-disable */

import './ui-button';

describe('ui-button component', () => {
  let element, shadowRoot;
  beforeEach(() => {
    element = document.createElement('ui-button');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('button')).toBeTruthy();
  });

  [{
    attribute: 'name',
    value: 'name-test'
  },{
    attribute: 'type',
    value: 'submit'
  },{
    attribute: 'disabled',
    value: 'true'
  }].forEach(test => {
    it(`should receive a attribute ${test.attribute} with value: ${test.value}`,() => {
      element.setAttribute(test.attribute, test.value);
      const result = shadowRoot.querySelector('button').getAttribute(test.attribute);
      expect(result).toEqual(test.value);
    });
  });

  it('should receive a attribute label', () => {
    element.setAttribute('label', 'Criar conta');
    const result = shadowRoot.querySelector('button').innerHTML;
    expect(result).toEqual('Criar conta');
  });
});
