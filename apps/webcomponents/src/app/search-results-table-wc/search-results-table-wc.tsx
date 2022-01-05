import React from 'react';
import { SearchResultTableWrapper } from '@catalogue/ui/search';
import PropTypes from 'prop-types';

export function SearchResultsTableWc({
  size = '1',
  filter = '',
  columns = 'resourceTitleObject',
}) {
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <SearchResultTableWrapper
      url={api + '/srv/api/search/'}
      index="gn-records"
      filter={filter}
      landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records"
      columns={columns.split(',')}
      columnNames={columns.split(',')}
      size={parseInt(size)}
    />
  );
};

SearchResultsTableWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  columns: PropTypes.string,
};

export default SearchResultsTableWc;
