import { render } from '@testing-library/react';

import NavHearderRight from './nav-hearder-right';

describe('NavHearderRight', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavHearderRight />);
    expect(baseElement).toBeTruthy();
  });
});
