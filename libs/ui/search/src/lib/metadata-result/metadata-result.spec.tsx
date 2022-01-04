import { render } from '@testing-library/react';

import MetadataResult from './metadata-result';

describe('MetadataResult', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataResult />);
    expect(baseElement).toBeTruthy();
  });
});
