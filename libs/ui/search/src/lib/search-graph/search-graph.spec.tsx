import { render } from '@testing-library/react';

import SearchGraph from './search-graph';

describe('SearchGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchGraph />);
    expect(baseElement).toBeTruthy();
  });
});
