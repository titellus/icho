import React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import reactToWebComponent from "react-to-webcomponent";
import { UiSearch } from "@catalogue/ui/search";
import SearchResultsTableWc from "./app/search-results-table-wc/search-results-table-wc";

const catalogueSearch = reactToWebComponent(UiSearch, React, ReactDOM, { shadow: true });
customElements.define("catalogue-search", catalogueSearch);


const searchResultTableReactivelist = reactToWebComponent(SearchResultsTableWc, React, ReactDOM);
customElements.define("catalogue-results-table", searchResultTableReactivelist);
