import React from "react";
import {SearchGraph} from "@catalogue/ui/search";
import PropTypes from "prop-types";

export function SearchResultsGraphWc({
                                       filterassociated = "",
                                       catalogueurl="",
                                     }) {
  return (
      <SearchGraph
        catalogueUrl={catalogueurl}
        filterAssociated={filterassociated}/>
  );
}

SearchResultsGraphWc.propTypes = {
  filterassociated: PropTypes.string,
  catalogueurl:PropTypes.string,
};

export default SearchResultsGraphWc;
