import { render } from '@testing-library/react';

import FooterPanel from './footer-panel';

describe('FooterPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FooterPanel />);
    expect(baseElement).toBeTruthy();
  });
});
