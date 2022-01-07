import { render } from '@testing-library/react';

import IndexFieldTypeArray from './index-field-type-array';

describe('IndexFieldTypeArray', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndexFieldTypeArray />);
    expect(baseElement).toBeTruthy();
  });
});
