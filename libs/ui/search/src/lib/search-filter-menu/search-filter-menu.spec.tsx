import { render } from '@testing-library/react';

import SearchFilterMenu from './search-filter-menu';

describe('CatSearchFilterMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchFilterMenu />);
    expect(baseElement).toBeTruthy();
  });
});
