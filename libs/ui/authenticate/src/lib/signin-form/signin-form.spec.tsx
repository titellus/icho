import { render } from '@testing-library/react';

import SigninForm from './signin-form';

describe('SigninForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SigninForm />);
    expect(baseElement).toBeTruthy();
  });
});
