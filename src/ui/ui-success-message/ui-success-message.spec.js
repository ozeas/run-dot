/* eslint-disable */

import './ui-success-message';

describe('ui-success-message component', () => {
  let element, shadowRoot;

  beforeEach(() => {
    element = document.createElement('ui-success-message');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('.ui-success-message__container')).toBeTruthy();
  });

  it('should reiceve a attribute title', (done) => {
    new Promise(resolve => {
      resolve(element.setAttribute('sub-title', 'Testing'));
    })
    .then(() => {
      const result = shadowRoot.querySelector('h2');
      expect(result.innerText).toEqual('Testing');
      done();
    });
  });

  it('should reiceve a attribute message', (done) => {
    new Promise(resolve => {
      resolve(element.setAttribute('message', 'Message teste'));
    })
    .then(() => {
      const result = shadowRoot.querySelector('p');
      expect(result.innerText).toEqual('Message teste');
      done();
    });
  });
});
