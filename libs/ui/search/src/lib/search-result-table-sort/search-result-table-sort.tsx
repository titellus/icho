import "./search-result-table-sort.module.scss";
import { Button, Popup, Icon } from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface SortProps {
}

export enum SortOrder {
  asc = "asc",
  desc = "desc"
}

export const DEFAULT_SORT_ORDER = SortOrder.asc;

export interface SortOption {
  field: string;
  order: string;
}

export const DEFAULT_SORT = {
  field: "_score",
  order: SortOrder.asc
};

interface SearchResultTableSortProps {
  onChange: (newValue: SortOption) => void;
  currentSort: SortOption;
  field: string;
  children?: React.ReactNode
}

export function SearchResultTableSort({
                                        onChange,
                                        currentSort,
                                        field,
                                        children
                                      }: SearchResultTableSortProps) {
  const handleChange = (field: string) => () => {
    let order: SortOrder =
      currentSort.field === field
        ? (currentSort.order === SortOrder.asc ? SortOrder.desc : DEFAULT_SORT_ORDER)
        : DEFAULT_SORT_ORDER;

    //Reset sorting to default
    if(currentSort.order === SortOrder.desc && order === SortOrder.asc){
        field = DEFAULT_SORT.field;
        order = DEFAULT_SORT.order;
        console.log("resset f sorting to default: "+field.toString()+' '+order.toString())
      }

    onChange({
      field: field,
      order: order
    });
  };
  const isCurrent = currentSort.field === field;
  return (
      isCurrent ? (
        <Popup content={field} trigger={<Icon name={currentSort.order === "asc" ? "sort up" : "sort down"}
              link={true}
              color={isCurrent ? "blue" : undefined}
              onClick={handleChange(field)}/>} />
      ) : (
        <Popup content={field} trigger={<Icon name="sort"
              link={true}
              onClick={handleChange(field)}/>} />
      )
  );
}

export default SearchResultTableSort;
