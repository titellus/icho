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
                                       catalogueurl=""
                                     }) {
  let togglelabelArray = [];
  if (togglelabel.split("|")[0] != ''){
    for (const element of togglelabel.split("|")) {
      togglelabelArray.push(JSON.parse(element))
    }
  }
  let url = process.env.NX_CATALOGUE_API_ENDPOINT + "/api/search/"
  let landingPageUrlTemplate = process.env.NX_CATALOGUE_API_ENDPOINT + "/api/records/{uuid}"
  if (catalogueurl && catalogueurl != ''){
    url = catalogueurl + "/api/search/"
    //if (catalogueUrllandingPageUrlTemplate && landingPageUrlTemplate != '') {
    landingPageUrlTemplate = catalogueurl + "/api/records/{uuid}"
    //}
  }

    return (
      <SearchResultTableWrapper
        catalogueUrl={url}
        filter={filter}
        filterField={filterfield}
        toggleFilterField={togglefilterfield}
        toggleIsMultiSelect={(toggleismultiselect === 'true')}
        toggleLabel= {togglelabelArray}
        landingPageLink={'resourceTitleObject'}
        landingPageUrlTemplate ={landingPageUrlTemplate}
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
  catalogueurl:PropTypes.string
};

export default SearchResultsTableWc;
