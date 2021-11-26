import { render } from '@testing-library/react';

import SearchResultTableCellArray from './search-result-table-cell-array';

describe('SearchResultTableCellArray', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTableCellArray />);
    expect(baseElement).toBeTruthy();
  });
});
