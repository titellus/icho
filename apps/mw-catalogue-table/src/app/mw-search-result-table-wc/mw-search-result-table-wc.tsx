import React from "react";
import styles from './mw-search-result-table-wc.module.scss';
import { SearchResultTableWrapper } from '@catalogue/ui/search';
import PropTypes from "prop-types";

export function MwSearchResultTableWc({size = '1',
                                      filter = '',
                                      columns = 'resourceTitleObject',
                                      columnnames = 'Titre',
}) {
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <div className={styles.searchAndResult}>
      <SearchResultTableWrapper
        url={api + '/srv/api/search/'}
        index="gn-records"
        filter={filter}
        landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records"
        columns={columns.split(',')}
        columnNames={columnnames.split(',')}
        size={parseInt(size)}
      />
    </div>
  );
}

MwSearchResultTableWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  columns: PropTypes.string,
  columnnames: PropTypes.string,
};

export default MwSearchResultTableWc;
