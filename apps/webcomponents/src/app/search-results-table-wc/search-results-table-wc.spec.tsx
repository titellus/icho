import { render } from '@testing-library/react';

import SearchResultsTableWc from './search-results-table-wc';

describe('SearchResultsTableWc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultsTableWc />);
    expect(baseElement).toBeTruthy();
  });
});
