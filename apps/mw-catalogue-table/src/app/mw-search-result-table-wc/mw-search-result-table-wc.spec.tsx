import { render } from '@testing-library/react';

import MwSearchResultTableWc from './mw-search-result-table-wc';

describe('MwSearchResultTableWc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MwSearchResultTableWc />);
    expect(baseElement).toBeTruthy();
  });
});
