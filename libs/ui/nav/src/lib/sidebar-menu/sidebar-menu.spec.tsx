import { render } from '@testing-library/react';

import SidebarMenu from './sidebar-menu';

describe('SidebarMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidebarMenu />);
    expect(baseElement).toBeTruthy();
  });
});
