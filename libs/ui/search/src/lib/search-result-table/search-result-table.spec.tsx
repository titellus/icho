import { render } from '@testing-library/react';

import SearchResultTable from './search-result-table';

describe('SearchResultTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchResultTable />);
    expect(baseElement).toBeTruthy();
  });
});
