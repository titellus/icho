import { render } from '@testing-library/react';

import SearchResultTableReactivelist from './search-result-table-reactivelist';

describe('ResultTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTableReactivelist />);
    expect(baseElement).toBeTruthy();
  });
});
