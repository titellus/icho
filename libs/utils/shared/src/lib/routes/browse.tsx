import React from "react";
import { UiSearch } from "@catalogue/ui/search";
import { useSearchParams } from "react-router-dom";

export function Browse() {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <UiSearch filter={searchParams.get('filter') || ''}/>
  );
}
