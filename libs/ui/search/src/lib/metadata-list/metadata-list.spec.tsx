import { render } from '@testing-library/react';

import MetadataList from './metadata-list';

describe('MetadataList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataList />);
    expect(baseElement).toBeTruthy();
  });
});
