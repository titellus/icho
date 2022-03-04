import './ui-admin.module.scss';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface UiAdminProps {}

export function UiAdmin(props: UiAdminProps) {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('WelcometoUiAdmin')}</h1>
    </div>
  );
}

export default UiAdmin;
