import { render } from '@testing-library/react';

import MetadataTimeLine from './metadata-time-line';

describe('MetadataTimeLine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataTimeLine />);
    expect(baseElement).toBeTruthy();
  });
});
