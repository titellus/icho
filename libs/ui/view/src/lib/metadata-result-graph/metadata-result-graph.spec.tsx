import { render } from '@testing-library/react';

import MetadataResultGraph from './metadata-result-graph';

describe('MetadataResultGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataResultGraph />);
    expect(baseElement).toBeTruthy();
  });
});
