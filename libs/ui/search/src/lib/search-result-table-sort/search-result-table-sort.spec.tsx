import { render } from '@testing-library/react';

import SearchResultTableSort from './search-result-table-sort';

describe('ResultTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTableSort />);
    expect(baseElement).toBeTruthy();
  });
});
