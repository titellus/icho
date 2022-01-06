import styles from './app.module.scss';

import { SearchResultTableWrapper } from '@catalogue/ui/search';

export function App() {
  return (
    <div className={styles.app}>
      <main>
        <h1>Simple table</h1>
        <SearchResultTableWrapper
          url="http://localhost:9200/"
          index="gn-records"
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

        <h1>Table with overview, links, ... (with a filter on 'Reporting INSPIRE')</h1>
        <SearchResultTableWrapper
          url="http://localhost:9200/"
          index="gn-records"
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

      </main>
    </div>
  );
}

export default App;
