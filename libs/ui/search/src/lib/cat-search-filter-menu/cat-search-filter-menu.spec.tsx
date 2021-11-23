import { render } from '@testing-library/react';

import CatSearchFilterMenu from './cat-search-filter-menu';

describe('CatSearchFilterMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CatSearchFilterMenu />);
    expect(baseElement).toBeTruthy();
  });
});
