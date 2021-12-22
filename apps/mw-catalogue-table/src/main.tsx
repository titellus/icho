import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent';
import { UiSearch } from '@catalogue/ui/search';
import MwSearchResultTableWc from "./app/mw-search-result-table-wc/mw-search-result-table-wc";

const mwCatalogueSearch = reactToWebComponent(UiSearch, React, ReactDOM, {
  shadow: true,
});
customElements.define('mw-catalogue-search', mwCatalogueSearch);

const mwSearchResultTableReactivelist = reactToWebComponent(
  MwSearchResultTableWc,
  React,
  ReactDOM
);
customElements.define('mw-catalogue-results-table', mwSearchResultTableReactivelist);
