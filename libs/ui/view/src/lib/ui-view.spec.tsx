import { render } from '@testing-library/react';

import UiView from './ui-view';

describe('UiView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiView />);
    expect(baseElement).toBeTruthy();
  });
});
