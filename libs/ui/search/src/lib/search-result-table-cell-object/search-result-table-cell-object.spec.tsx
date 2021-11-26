import { render } from '@testing-library/react';

import SearchResultTableCellObject from './search-result-table-cell-object';

describe('SearchResultTableCellObject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTableCellObject />);
    expect(baseElement).toBeTruthy();
  });
});
