/* eslint-disable */
import './ui-logo-type';

describe('ui-logo-type component', () => {
  let element, shadowRoot;

  beforeEach(() => {
    element = document.createElement('ui-logo-type');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('img')).toBeTruthy();
  });

  it('should loaded a img', () => {
    const el = shadowRoot.querySelector('img');
    expect(el.getAttribute('src')).toBeDefined();
  });
});
