import { render } from '@testing-library/react';

import SearchResultsGraphWc from './search-results-graph-wc';

describe('SearchResultsGraphWc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultsGraphWc />);
    expect(baseElement).toBeTruthy();
  });
});
