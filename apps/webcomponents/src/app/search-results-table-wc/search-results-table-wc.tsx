import React from "react";
import { SearchResultTableWrapper } from "@catalogue/ui/search";
import PropTypes from "prop-types";

export function SearchResultsTableWc({
                                       size = "10",
                                       filter = "",
                                       filterfield = "",
                                       togglefilterfield="",
                                       toggleismultiselect = "false",
                                       togglelabel = "",
                                       columns = "resourceTitleObject",
                                       columnnames = "Title",
                                       indexurl=""
                                     }) {
  let api = process.env.NX_CATALOGUE_API_ENDPOINT
  if (indexurl && indexurl != ''){
    api = indexurl
  }
  let togglelabelArray = [];
  if (togglelabel.split("|")[0] != ''){
    for (const element of togglelabel.split("|")) {
      togglelabelArray.push(JSON.parse(element))
    }
  }
  return (
    <SearchResultTableWrapper
      url={api + "/srv/api/search/"}
      index="gn-records"
      filter={filter}
      filterField={filterfield}
      toggleFilterField={togglefilterfield}
      toggleIsMultiSelect={(toggleismultiselect === 'true')}
      toggleLabel= {togglelabelArray}
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
  togglefilterfield: PropTypes.string,
  toggleismultiselect: PropTypes.string,
  togglelabel: PropTypes.string,
  columns: PropTypes.string,
  columnnames: PropTypes.string,
  indexurl:PropTypes.string
};

export default SearchResultsTableWc;
