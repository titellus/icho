import './sidebar-menu.module.scss';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

/* eslint-disable-next-line */
export interface SidebarMenuProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}

export function SidebarMenu(props: SidebarMenuProps) {
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        vertical
        visible={props.visible}
        onHide={() => props.setVisible(false)}
        width="wide"
      >
        <Menu.Item as="div">
          <Menu.Header>
            <Icon name="home" />
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="Latest datasets"
              as={Link}
              to="/search?sortBy=date"
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item as="div">
          <Menu.Header>
            <Icon name="th" />
            Themes
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item name="WISE" as={Link} to="/search?filter=WISE" />
            <Menu.Item
              name="Inondations"
              as={Link}
              to="/search?filter=Inondations"
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item as="div">
          <Menu.Header>
            <Icon name="folder" />
            Collections
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as="div">
          <Menu.Header>
            <Icon name="user" />
            My stuff
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item name="Preferences" as={Link} to="/authenticate" />
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={props.visible}>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

export default SidebarMenu;
