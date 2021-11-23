import { render } from '@testing-library/react';

import UiContribute from './ui-contribute';

describe('UiContribute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiContribute />);
    expect(baseElement).toBeTruthy();
  });
});
