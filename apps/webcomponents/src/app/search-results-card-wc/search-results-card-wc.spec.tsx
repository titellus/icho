import { render } from '@testing-library/react';

import SearchResultsCardWc from './search-results-card-wc';

describe('SearchResultsCardWc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultsCardWc />);
    expect(baseElement).toBeTruthy();
  });
});
