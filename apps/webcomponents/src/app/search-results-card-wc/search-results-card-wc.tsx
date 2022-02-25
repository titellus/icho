import './search-results-card-wc.module.scss';
import React from "react";
import PropTypes from "prop-types";
import {SearchResultCardWrapper} from "@catalogue/ui/search";

export function SearchResultsCardWc({
  size = "10",
  filter = "",
  fields= "resourceTitleObject",
  catalogueurl=""
}) {
  let url = process.env.NX_CATALOGUE_API_ENDPOINT + "/api/search/"
  if (catalogueurl && catalogueurl != ''){
    url = catalogueurl + "/api/search/"
  }
  console.log(url)
  return (
    <SearchResultCardWrapper
      catalogueUrl={url}
      filter={filter}
      fields={fields.replace(/\s+/g,"").split(",")}
      size={parseInt(size)}
    />
  );
}

SearchResultsCardWc.propTypes = {
  size: PropTypes.string,
  filter: PropTypes.string,
  fields: PropTypes.string,
  catalogueurl:PropTypes.string
};

export default SearchResultsCardWc;
