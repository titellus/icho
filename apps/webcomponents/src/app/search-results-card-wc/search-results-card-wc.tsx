import './search-results-card-wc.module.scss';
import React from "react";
import PropTypes from "prop-types";
import {SearchResultCardWrapper} from "@catalogue/ui/search";
import {SemanticWIDTHS} from "semantic-ui-react";


export function SearchResultsCardWc({
  size = "10",
  filter = "",
  search_placeholder="",
  filterfield = "",
  filterfield_placeholder="",
  filterfield_2 = "",
  filterfield_2_placeholder="",
  fields= "resourceTitleObject",
  fulltextfilter= "",
  catalogueurl="",
  sortbylist="",
  sortby="",
  sorttype="",
  itemsperrow = undefined,
  marginx = undefined,
  marginbottom = undefined,
  margintoolsbottom = undefined,
  linkmdt = "false",
  imageheight= undefined
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
      search_placeholder={search_placeholder}
      filterField={filterfield}
      filterField_placeholder={filterfield_placeholder}
      filterField_2={filterfield_2}
      filterField_2_placeholder={filterfield_2_placeholder}
      fields={fields}
      fullTextFilter={textFilter}
      landingPageUrlTemplate ={landingPageUrlTemplate}
      size={parseInt(size)}
      sortByList={sortbylist}
      sortBy={sortby}
      sortType={sorttype}
      itemsPerRow={itemsperrow}
      marginX={marginx}
      marginBottom={marginbottom}
      marginToolsBottom={margintoolsbottom}
      linkMDT={linkmdt}
      imageHeight={imageheight}
    />
  );
}

SearchResultsCardWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  search_placeholder: PropTypes.string,
  filterfield: PropTypes.string,
  filterfield_placeholder: PropTypes.string,
  filterfield_2: PropTypes.string,
  filterfield_2_placeholder: PropTypes.string,
  fields: PropTypes.string,
  fulltextfilter: PropTypes.string,
  catalogueurl:PropTypes.string,
  sortbylist:PropTypes.string,
  sortby:PropTypes.string,
  sorttype:PropTypes.string,
  itemsperrow: undefined,
  marginx:PropTypes.number,
  marginbottom:PropTypes.number,
  margintoolsbottom:PropTypes.number,
  linkmdt:PropTypes.string,
  imageheight:PropTypes.number
};

export default SearchResultsCardWc;
