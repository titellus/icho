import React from "react";
import { SearchResultTableWrapper } from "@catalogue/ui/search";
import PropTypes from "prop-types";

export function SearchResultsTableWc({
                                       size = "10",
                                       filter = "",
                                       filterfield = "",
                                       columns = "resourceTitleObject",
                                       columnnames = "Title"
                                     }) {
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <SearchResultTableWrapper
      url={api + "/srv/api/search/"}
      index="gn-records"
      filter={filter}
      filterField={filterfield}
      landingPageUrlTemplate="https://metawal.wallonie.be/geonetwork/srv/api/records/{uuid}"
      landingPageLink={'resourceTitleObject'}
      columns={columns.split(",")}
      columnNames={columnnames.split(",")}
      size={parseInt(size)}
    />
  );
};

SearchResultsTableWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  filterfield: PropTypes.string,
  columns: PropTypes.string,
  columnnames: PropTypes.string
};

export default SearchResultsTableWc;
