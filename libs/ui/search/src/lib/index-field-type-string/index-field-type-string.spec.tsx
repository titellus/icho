import { render } from '@testing-library/react';

import IndexFieldTypeString from './index-field-type-string';

describe('IndexFieldTypeString', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndexFieldTypeString />);
    expect(baseElement).toBeTruthy();
  });
});
