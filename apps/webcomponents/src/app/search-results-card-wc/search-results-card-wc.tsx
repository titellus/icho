import './search-results-card-wc.module.scss';
import React from "react";
import PropTypes from "prop-types";
import {SearchResultCardWrapper} from "@catalogue/ui/search";
import {SemanticWIDTHS} from "semantic-ui-react";


export function SearchResultsCardWc({
  size = "10",
  filter = "",
  filterfield = "",
  filterfield_2 = "",
  fields= "resourceTitleObject",
  fulltextfilter= "",
  catalogueurl="",
  sortbylist="",
  sortby="",
  sorttype="",
  itemsperrow = undefined,
  marginx =undefined
}) {

  /*let cardTemplate = [];
  if (fields.split("|")[0] != ''){
    for (const element of fields.split("|")) {
      cardTemplate.push(JSON.parse(element))
    }
  }*/
  /*let cardTemplate = JSON.parse(fields)
  let EsFields: Array<string> = Object.values(cardTemplate)
  /*let EsFields = Object.keys(fields.replace(/\s+/g,""))
    .map(function(key) {
      return fields[key];
    });*/
  /*console.log(cardTemplate)
  console.log(EsFields)*/
  let url = process.env.NX_CATALOGUE_API_ENDPOINT + "/api/search/"
  let landingPageUrlTemplate = process.env.NX_CATALOGUE_API_ENDPOINT + "/api/records/{uuid}"
  if (catalogueurl && catalogueurl != ''){
    url = catalogueurl + "/api/search/"
    landingPageUrlTemplate = catalogueurl + "/api/records/{uuid}"
  }
  console.log(url)
  let textFilter: string[];
  if (fulltextfilter && fulltextfilter !='') {
    textFilter = fulltextfilter.split(',')
  } else {
    textFilter = []
  }
  return (
    <SearchResultCardWrapper
      catalogueUrl={url}
      filter={filter}
      filterField={filterfield}
      filterField_2={filterfield_2}
      fields={fields}
      fullTextFilter={textFilter}
      landingPageUrlTemplate ={landingPageUrlTemplate}
      size={parseInt(size)}
      sortByList={sortbylist}
      sortBy={sortby}
      sortType={sorttype}
      itemsPerRow={itemsperrow}
      marginX={marginx}
    />
  );
}

SearchResultsCardWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  filterfield: PropTypes.string,
  filterfield_2: PropTypes.string,
  fields: PropTypes.string,
  fulltextfilter: PropTypes.string,
  catalogueurl:PropTypes.string,
  sortbylist:PropTypes.string,
  sortby:PropTypes.string,
  sorttype:PropTypes.string,
  itemsperrow: undefined,
  marginx:PropTypes.number,
};

export default SearchResultsCardWc;
