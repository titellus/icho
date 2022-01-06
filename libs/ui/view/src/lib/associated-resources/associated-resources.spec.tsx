import { render } from '@testing-library/react';

import AssociatedResources from './associated-resources';

describe('AssociatedResources', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssociatedResources />);
    expect(baseElement).toBeTruthy();
  });
});
