import styles from './app.module.scss';

import { SearchResultTableWrapper } from '@catalogue/ui/search';
import { Tab } from "semantic-ui-react";

export function App() {
  const examples = [
    {
      menuItem: 'Simple table',
      render: () => <SearchResultTableWrapper
        catalogueUrl="https://apps.titellus.net/geonetwork/srv/api/search/"
        filterField={"th_Themes_geoportail_wallon_hierarchy.default"}
        fields={[{"columnName":"Titre","columnIndex":"resourceTitleObject","columnJsonPath":"$.default"},{"columnName":"Image","columnIndex":"overview","columnJsonPath":"$[0].url"},{"columnName":"Titre","columnIndex":"resourceType","columnJsonPath":"$[0]", "columnLabel":"red", "columnRibon":{"dataset":"blue", "series":"teal","application":"green","service":"green"}},{"columnName":"Nom abrégé","columnIndex":"resourceAltTitleObject","columnJsonPath":"$.default", "columnLabel":"blue"},{"columnName":"Gestionnaire","columnIndex":"custodianOrgForResource","columnJsonPath":""},{"columnName":"Liens","columnIndex":"link","columnJsonPath":"$[0].url","columnIcon":"world", "columnLabel":"red"}]}
        includedFields={["resourceTitleObject", "overview","resourceType", "resourceAltTitleObject", "custodianOrgForResource","link"]}
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
        fields={[{"columnName":"Titre","columnIndex":"resourceTitleObject","columnJsonPath":"$.default"},{"columnName":"Image","columnIndex":"overview","columnJsonPath":"$[0].url"},{"columnName":"Titre","columnIndex":"resourceType","columnJsonPath":"$[0]", "columnLabel":"red", "columnRibon":{"dataset":"blue", "series":"teal","application":"green","service":"green"}},{"columnName":"Nom abrégé","columnIndex":"resourceAltTitleObject","columnJsonPath":"$.default", "columnLabel":"blue"},{"columnName":"Gestionnaire","columnIndex":"custodianOrgForResource","columnJsonPath":""},{"columnName":"Liens","columnIndex":"link","columnJsonPath":"$[0].url","columnIcon":"world", "columnLabel":"red"}]}
        includedFields={["resourceTitleObject", "overview","resourceType", "resourceAltTitleObject", "custodianOrgForResource","link"]}
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
        fields={[{"columnName":"Titre","columnIndex":"resourceTitleObject","columnJsonPath":"$.default"},{"columnName":"Image","columnIndex":"overview","columnJsonPath":"$[0].url"},{"columnName":"Titre","columnIndex":"resourceType","columnJsonPath":"$[0]", "columnLabel":"red", "columnRibon":{"dataset":"blue", "series":"teal","application":"green","service":"green"}},{"columnName":"Nom abrégé","columnIndex":"resourceAltTitleObject","columnJsonPath":"$.default", "columnLabel":"blue"},{"columnName":"Gestionnaire","columnIndex":"custodianOrgForResource","columnJsonPath":""},{"columnName":"Liens","columnIndex":"link","columnJsonPath":"$[0].url","columnIcon":"world", "columnLabel":"red"}]}
        includedFields={["resourceTitleObject", "overview","resourceType", "resourceAltTitleObject", "custodianOrgForResource","link"]}
        landingPageLink={'resourceTitleObject'}
        size={10}
      />
    }
  ]
  return (
    <div className={styles.app}>
      <main>
       <Tab menu={{secondary: true, pointing: true}} panes={examples}/>
        <p>test</p>
      </main>
    </div>
  );
}

export default App;
