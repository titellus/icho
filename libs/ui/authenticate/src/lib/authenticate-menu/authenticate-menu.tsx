import './authenticate-menu.module.scss';
import { Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '@catalogue/utils/shared';

/* eslint-disable-next-line */
export interface AuthenticateMenuProps {}

export function AuthenticateMenu(props: AuthenticateMenuProps) {
  const { authData, loading, signIn, signOut } = useAuth();
  const isLoggedIn = authData?.username !== undefined;

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Menu.Item as={Label}>
          <strong>{authData?.username}</strong>
        </Menu.Item>
        <Menu.Item as={Link} to="authenticate">
          Sign out
        </Menu.Item>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Menu.Item as={Link} to="authenticate">
          Sign in
        </Menu.Item>
        <Menu.Item as={Link} to="authenticate">
          Sign up
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default AuthenticateMenu;
