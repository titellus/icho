import { render } from '@testing-library/react';

import SearchResultCard from './search-result-card';

describe('SearchResultCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultCard />);
    expect(baseElement).toBeTruthy();
  });
});
