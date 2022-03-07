import './search-results-card-wc.module.scss';
import React from "react";
import PropTypes from "prop-types";
import {SearchResultCardWrapper} from "@catalogue/ui/search";
import {SemanticWIDTHS} from "semantic-ui-react";


export function SearchResultsCardWc({
  size = "10",
  filter = "",
  filterfield = "",
  fields= "resourceTitleObject",
  catalogueurl="",
  sortby="",
  sorttype="",
  itemsperrow = undefined,
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
  if (catalogueurl && catalogueurl != ''){
    url = catalogueurl + "/api/search/"
  }
  console.log(url)
  return (
    <SearchResultCardWrapper
      catalogueUrl={url}
      filter={filter}
      filterField={filterfield}
      fields={fields}
      size={parseInt(size)}
      sortBy={sortby}
      sortType={sorttype}
      itemsPerRow={itemsperrow}
    />
  );
}

SearchResultsCardWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  filterfield: PropTypes.string,
  fields: PropTypes.string,
  catalogueurl:PropTypes.string,
  sortby:PropTypes.string,
  sorttype:PropTypes.string,
  itemsperrow: undefined,
};

export default SearchResultsCardWc;
