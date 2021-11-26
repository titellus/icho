import { render } from '@testing-library/react';

import SearchResultTableCellString from './search-result-table-cell-string';

describe('SearchResultTableCellString', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTableCellString />);
    expect(baseElement).toBeTruthy();
  });
});
