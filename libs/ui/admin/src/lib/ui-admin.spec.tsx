import { render } from '@testing-library/react';

import UiAdmin from './ui-admin';

describe('UiAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
