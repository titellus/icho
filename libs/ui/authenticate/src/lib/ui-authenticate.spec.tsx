import { render } from '@testing-library/react';

import UiAuthenticate from './ui-authenticate';

describe('UiAuthenticate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiAuthenticate />);
    expect(baseElement).toBeTruthy();
  });
});
