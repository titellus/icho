import { SearchGraph } from "@catalogue/ui/search";
import React from "react";
import { useSearchParams } from "react-router-dom";

export function BrowseGraph() {
  const [searchParams, setSearchParams] = useSearchParams();
  return <SearchGraph catalogueUrl="https://metawal4.test.wallonie.be/geonetwork/srv"
                      filterAssociated="false"/>;
}
