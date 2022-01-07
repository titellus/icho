import styles from './i18n-switcher.module.scss';
import i18n from 'i18next';
import {Dropdown, Menu} from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */

export function I18nSwitcher() {
  const languageOptions = [
    {key: 'en', value: 'en', flag: 'gb', text: 'en'},
    {key: 'fr', value: 'fr', flag: 'fr', text: 'fr'}
  ]
  const handleChange = (event: any, data: any) => {
    i18n.changeLanguage(data.value)
  };
  return (
    <Menu.Item>
      <Dropdown className={styles.dropdownI18nSwitcher}
                fluid
                search
                selection
                options={languageOptions}
                defaultValue={languageOptions[0].value}
                onChange={handleChange}
      />
    </Menu.Item>
  );
}

export default I18nSwitcher;
