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
                                       searchfields='',
                                       fields="",
                                       catalogueurl="",
                                       sortby="",
                                       sorttype=""
                                     }) {
  let togglelabelArray = [];
  if (togglelabel.split("|")[0] != ''){
    for (const element of togglelabel.split("|")) {
      togglelabelArray.push(JSON.parse(element))
    }
  }
  let fieldsArray = []
  for (const element of fields.split("|")) {
    fieldsArray.push(JSON.parse(element))
  }
  let indexArray = []
  for (const element of fieldsArray) {
    indexArray.push(element.columnIndex)
  }
  let columnNameArray = []
  for (const element of fieldsArray) {
    columnNameArray.push(element.columnName)
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
        includedFields={indexArray}
        searchFields={searchfields.replace(/\s+/g,"").split(",")}
        fields={fieldsArray}
        size={parseInt(size)}
        sortBy={sortby}
        sortType={sorttype}
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
  searchfields: PropTypes.string,
  fields: PropTypes.string,
  catalogueurl:PropTypes.string,
  sortby:PropTypes.string,
  sorttype:PropTypes.string
};

export default SearchResultsTableWc;
