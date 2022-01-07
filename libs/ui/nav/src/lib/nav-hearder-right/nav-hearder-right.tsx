import './nav-hearder-right.module.scss';
import {I18nSwitcher} from "../i18n-switcher/i18n-switcher";
import { Label, Menu } from 'semantic-ui-react';
import {AuthenticateMenu} from "../../../../authenticate/src/lib/authenticate-menu/authenticate-menu";
import React from "react";

/* eslint-disable-next-line */
export interface NavHearderRightProps {}

export function NavHearderRight(props: NavHearderRightProps) {
  return (
    <Menu.Menu position="right">
      <I18nSwitcher />
      <AuthenticateMenu />
    </Menu.Menu>
  );
}

export default NavHearderRight;
