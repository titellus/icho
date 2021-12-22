import React from "react";
import './mw-search-result-table-wc.module.scss';
import { SearchResultTableReactivelist } from '@catalogue/ui/search';
import PropTypes from "prop-types";

export function MwSearchResultTableWc({size = '1',
                                      filter = '',
                                      columns = 'resourceTitleObject',
                                      columnNames = 'Titre',
}) {
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <div className="mw-search-result-table-wc">
      <SearchResultTableReactivelist
        url={api + '/srv/api/search/'}
        index="gn-records"
        filter={filter}
        mtdRoot="https://metawal.wallonie.be/geonetwork/srv/api/records"
        dataFields={columns.split(',')}
        dataFieldsName={columnNames.split(',')}
        resultNumber={parseInt(size)}
      />
    </div>

  );
}

MwSearchResultTableWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  columns: PropTypes.string,
  columnNames: PropTypes.string,
};

export default MwSearchResultTableWc;
