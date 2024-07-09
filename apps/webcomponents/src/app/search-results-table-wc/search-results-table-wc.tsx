import React from "react";
import { SearchResultTableWrapper } from "@catalogue/ui/search";
import PropTypes from "prop-types";

export function SearchResultsTableWc({
                                       size = "10",
                                       filter = "",
                                       search_placeholder="",
                                       filterfield = "",
                                       togglefilterfield="",
                                       toggleismultiselect = "false",
                                       togglelabel = "",
                                       togglebuttonstyle="",
                                       fulltextfilter= "",
                                       fields="",
                                       catalogueurl="",
                                       landingpageurl="",
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
  let landingPageUrlTemplate= process.env.NX_CATALOGUE_API_ENDPOINT + "/api/records/{uuid}"
  if (catalogueurl && catalogueurl != ''){
    url = catalogueurl + "/api/search/"
    if (landingpageurl && landingpageurl != '') {
      landingPageUrlTemplate = landingpageurl
    }else{
      landingPageUrlTemplate = catalogueurl + "/api/records/{uuid}"
    }
  }
  let textFilter: string[];
  if (fulltextfilter && fulltextfilter !='') {
    textFilter = fulltextfilter.replace(/\s+/g,"").split(",")
  } else {
    textFilter = []
  }

    return (
      <SearchResultTableWrapper
        catalogueUrl={url}
        filter={filter}
        search_placeholder={search_placeholder}
        filterField={filterfield}
        toggleFilterField={togglefilterfield}
        toggleIsMultiSelect={(toggleismultiselect === 'true')}
        toggleLabel= {togglelabelArray}
        toggleButtonStyle={togglebuttonstyle}
        landingPageLink={'resourceTitleObject'}
        landingPageUrlTemplate ={landingPageUrlTemplate}
        includedFields={indexArray}
        fullTextFilter={textFilter}
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
  search_placeholder: PropTypes.string,
  filterfield: PropTypes.string,
  togglefilterfield: PropTypes.string,
  toggleismultiselect: PropTypes.string,
  togglelabel: PropTypes.string,
  togglebuttonstyle: PropTypes.string,
  fulltextfilter: PropTypes.string,
  fields: PropTypes.string,
  catalogueurl:PropTypes.string,
  landingpageurl:PropTypes.string,
  sortby:PropTypes.string,
  sorttype:PropTypes.string
};

export default SearchResultsTableWc;
