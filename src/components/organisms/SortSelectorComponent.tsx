import {Button} from 'semantic-ui-react';
import React, { Dispatch, SetStateAction, useState } from "react";

export interface SortOption {
  label: string;
  dataField: string;
  sortBy: "asc" | "desc";
}

interface Props {
  onChange: any;
  selectedSortSelector: SortOption;
  field: string;
}

export const sortOptions: SortOption[] = [
  {
    label:"desc",
    dataField: "uuid",
    sortBy: "desc"
  },
  {
    label:"asc",
    dataField: "uuid",
    sortBy: "asc"
  }
];

const SortSelector = ({ onChange, selectedSortSelector, field }: Props) => {
  const handleChange = (field: string) => (event: any) => {
    if (selectedSortSelector.sortBy === "asc") {
      console.log('sort desc')
      console.log(selectedSortSelector)
      sortOptions[0].dataField = field;
      onChange(sortOptions[0]);
    }
    else {
      console.log('sort asc')
      console.log(selectedSortSelector)
      sortOptions[1].dataField = field;
      onChange(sortOptions[1]);
    }
  };
  return (
    <div>
      <Button circular icon='sort' onClick={handleChange(field)} />
    </div>
  );
};

export default SortSelector;
