import { render } from '@testing-library/react';

import I18nSwitcher from './i18n-switcher';

describe('I18nSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<I18nSwitcher />);
    expect(baseElement).toBeTruthy();
  });
});
