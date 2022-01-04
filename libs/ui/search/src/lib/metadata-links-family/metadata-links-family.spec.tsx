import { render } from '@testing-library/react';

import MetadataLinksFamily from './metadata-links-family';

describe('MetadataLinksFamily', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataLinksFamily />);
    expect(baseElement).toBeTruthy();
  });
});
