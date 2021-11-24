import { render } from '@testing-library/react';

import AuthenticateMenu from './authenticate-menu';

describe('AuthenticateMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthenticateMenu />);
    expect(baseElement).toBeTruthy();
  });
});
