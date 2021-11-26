import './search-result-table-sort.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import React from 'react';

/* eslint-disable-next-line */
export interface SortProps {}

export interface SortOption {
  label: string;
  dataField: string;
  sortBy: 'asc' | 'desc';
}

interface Props {
  onChange: any;
  selectedSortSelector: SortOption;
  field: string;
}

export const sortOptions: SortOption[] = [
  {
    label: 'desc',
    dataField: 'uuid',
    sortBy: 'desc',
  },
  {
    label: 'asc',
    dataField: 'uuid',
    sortBy: 'asc',
  },
];

export function SearchResultTableSort({
  onChange,
  selectedSortSelector,
  field,
}: Props) {
  const handleChange = (field: string) => () => {
    if (selectedSortSelector.sortBy === 'asc') {
      sortOptions[0].dataField = field;
      onChange(sortOptions[0]);
    } else {
      sortOptions[1].dataField = field;
      onChange(sortOptions[1]);
    }
  };
  return (
    <Button basic circular icon onClick={handleChange(field)}>
      {selectedSortSelector.sortBy === 'asc' ? (
        <Icon name="sort up" />
      ) : (
        <Icon name="sort down" />
      )}
    </Button>
  );
}

export default SearchResultTableSort;
