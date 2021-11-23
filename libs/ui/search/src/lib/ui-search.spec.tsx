import { render } from '@testing-library/react';

import UiSearch from './ui-search';

describe('UiSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiSearch />);
    expect(baseElement).toBeTruthy();
  });
});
