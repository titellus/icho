import { SearchGraph } from "@catalogue/ui/search";
import React from "react";
import { useSearchParams } from "react-router-dom";

export function BrowseGraph() {
  const [searchParams, setSearchParams] = useSearchParams();
  return <SearchGraph />;
}
