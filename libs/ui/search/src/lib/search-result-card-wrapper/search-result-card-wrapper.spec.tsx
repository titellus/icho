import { render } from '@testing-library/react';

import SearchResultCardWrapper from './search-result-card-wrapper';

describe('SearchResultCardWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultCardWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
