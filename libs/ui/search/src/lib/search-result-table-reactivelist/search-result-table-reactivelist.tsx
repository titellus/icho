import './search-result-table-reactivelist.module.scss';
import {
  SortOption,
  sortOptions,
} from '../search-result-table-sort/search-result-table-sort';
import {
  DataSearch,
  ReactiveBase,
  ReactiveList,
} from '@appbaseio/reactivesearch';
import React, { useState } from 'react';
import SearchResultTable from '../search-result-table/search-result-table';

/* eslint-disable-next-line */
export interface ResultTableProps {}

interface Props {
  url: string;
  index: string;
  filter: string;
  mtdRoot: string;
  dataFields: Array<string>;
  dataFieldsName: Array<string>;
  resultNumber: number;
}

export function SearchResultTableReactivelist({
  url,
  index,
  filter,
  mtdRoot,
  dataFields,
  dataFieldsName,
  resultNumber,
}: Props) {
  let default_query: Record<string,unknown>;
  if (filter) {
    default_query = {
      query_string: { query: filter },
    };
  }

  const [sort, setSort] = useState<SortOption>(sortOptions[0]);

  function handleChange(newValue: SortOption) {
    console.log(newValue)
    setSort(newValue);
  }

  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <ReactiveBase
      app="records"
      url={api + '/srv/api/search/'}
      enableAppbase={false}
    >
      <DataSearch
        componentId="searchbox"
        dataField={[]}
        showClear={true}
        placeholder="Search ..."
        defaultQuery={() => ({
          sort: [{ [sort.dataField]: { order: sort.sortBy } }],
          //query: { match: { isTemplate: "n" } }
          query: default_query,
        })}
      />
      <br />

      <ReactiveList
        componentId="sortTableES"
        size={resultNumber}
        pagination={false}
        showResultStats={true}
        defaultQuery={() => ({
          sort: [{ [sort.dataField]: { order: sort.sortBy } }],
          //query: { match: { isTemplate: "n" } }
          query: default_query,
        })}
        includeFields={dataFields}
        dataField={'_id'}
        react={{
          and: ['searchbox'],
        }}
        render={({ loading, error, data }) => {
          return (
            <SearchResultTable
              loading={loading}
              error={error}
              mtdRoot={mtdRoot}
              dataFields={dataFields}
              data={data}
              dataFieldsName={dataFieldsName}
              handleChangeSortReactiveList={handleChange}
              selected={sort}
            />
          );
        }}
      />
    </ReactiveBase>
  );
}

export default SearchResultTableReactivelist;
