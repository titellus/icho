import React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent';
import {UiSearch} from "@catalogue/ui/search";

const CatalogueSearch = reactToWebComponent(UiSearch, React, ReactDOM, { shadow: true });
customElements.define("catalogue-search", CatalogueSearch);
document.body.innerHTML = "<catalogue-search filter='+resourceType:dataset'></catalogue-search>";
