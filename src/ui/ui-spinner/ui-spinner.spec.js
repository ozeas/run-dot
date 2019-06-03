/* eslint-disable */
import './ui-spinner';

describe('ui-spinner component', () => {
  let element, shadowRoot;

  beforeEach(() => {
    element = document.createElement('ui-spinner');
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should mount component', () => {
    expect(shadowRoot.querySelector('.spinner')).toBeTruthy();
  });
});
