import styles from './app.module.scss';

import { SearchResultTableWrapper } from '@catalogue/ui/search';
import { Tab } from "semantic-ui-react";

export function App() {
/*  const examples = [
    {
      menuItem: 'Simple table',
      render: () => <SearchResultTableWrapper
        catalogueUrl="https://apps.titellus.net/geonetwork/srv/api/search/"
        filterField={"th_Themes_geoportail_wallon_hierarchy.default"}
        columns={[
          'resourceTitleObject',
          'resourceAltTitleObject'
        ]}
        columnNames={[
          'Nom explicite',
          'Nom abrégé'
        ]}
        landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records/{uuid}"
        landingPageLink={'resourceTitleObject'}
        size={10}
      />
    },
    {
      menuItem: 'Table with overview, links, ... (with a filter on \'Reporting INSPIRE\')',
      render: () => <SearchResultTableWrapper
        catalogueUrl="https://apps.titellus.net/geonetwork/srv/api/search/"
        filter={'+tag.default:"Reporting INSPIRE"'}
        landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records/{uuid}"
        columns={[
          'resourceTitleObject',
          'rating',
          'valid',
          'mainLanguage',
          'overview',
          'resourceType',
          'resourceAltTitleObject',
          'tag',
          'link',
        ]}
        columnNames={[
          'Titre',
          'Rating',
          'Valide',
          'Langue',
          '',
          '',
          'Nom abrégé',
          'Mots-clés',
          'Liens',
        ]}
        landingPageLink={'resourceTitleObject'}
        size={3}
      />
    },
    {
      menuItem: 'Services',
      render: () => <SearchResultTableWrapper
        catalogueUrl="https://apps.titellus.net/geonetwork/srv/api/search/"
        filter={'+resourceType:service'}
        filterField={'linkProtocol'}
        landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records/{uuid}"
        columns={[
          'resourceTitleObject',
          'serviceType',
          'linkProtocol',
          'linkUrl',
          'recordLink',
          'custodianOrgForResource'
        ]}
        columnNames={[
          'Titre',
          'Type de service',
          'Protocol',
          'Point d\'accès',
          'Données',
          'Gestionnaire'
        ]}
        landingPageLink={'resourceTitleObject'}
        size={10}
      />
    }
  ]*/


  return (
    <div className={styles.app}>
      <main>
       {/*<Tab menu={{secondary: true, pointing: true}} panes={examples}/>*/}
        <p>test</p>
      </main>
    </div>
  );
}

export default App;
