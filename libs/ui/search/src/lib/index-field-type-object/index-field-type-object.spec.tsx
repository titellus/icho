import { render } from '@testing-library/react';

import IndexFieldTypeObject from './index-field-type-object';

describe('IndexFieldTypeObject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndexFieldTypeObject />);
    expect(baseElement).toBeTruthy();
  });
});
