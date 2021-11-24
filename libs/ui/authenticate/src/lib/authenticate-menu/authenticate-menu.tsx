import "./authenticate-menu.module.scss";
import { Label, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "@catalogue/utils/shared";

/* eslint-disable-next-line */
export interface AuthenticateMenuProps {
}

export function AuthenticateMenu(props: AuthenticateMenuProps) {
  const { authData, loading, signIn, signOut } = useAuth();
  let isLoggedIn = authData?.username !== undefined;

  if (isLoggedIn) {
    return (
      <Menu.Menu position="right">
        <Menu.Item as={Label}>
          <strong>{authData?.username}</strong>
        </Menu.Item>
        <Menu.Item as={Link} to="/authenticate">
          Sign out
        </Menu.Item>
      </Menu.Menu>
    );
  } else {
    return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/authenticate">
          Sign in
        </Menu.Item>
        <Menu.Item as={Link} to="/authenticate">
          Sign up
        </Menu.Item>
      </Menu.Menu>);
  }
}

export default AuthenticateMenu;
