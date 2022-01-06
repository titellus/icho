import { render } from '@testing-library/react';

import MetadataUniqueElementList from './metadata-unique-element-list';

describe('MetadataUniqueElementList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetadataUniqueElementList />);
    expect(baseElement).toBeTruthy();
  });
});
