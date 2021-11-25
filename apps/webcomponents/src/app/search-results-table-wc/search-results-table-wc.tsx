import React from "react";
import { SearchResultTableReactivelist } from "@catalogue/ui/search";
import PropTypes from "prop-types";

export function SearchResultsTableWc({
                                       size = "1",
                                       filter = "",
                                       columns = "resourceTitleObject"
                                     }) {
  return (
    <SearchResultTableReactivelist
      url="http://localhost:4200/geonetwork/srv/api/search/"
      index="gn-records"
      filter={filter}
      mtdRoot="https://metawal.wallonie.be/geonetwork/srv/api/records"
      dataFields={columns.split(",")}
      dataFieldsName={columns.split(",")}
      resultNumber={parseInt(size)} />
  );
};

SearchResultsTableWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  columns: PropTypes.string
};

export default SearchResultsTableWc;
