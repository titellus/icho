import './search-result-card-wrapper.module.scss';
import React, {useState} from "react";
import {DEFAULT_SORT, SortOption} from "../search-result-table-sort/search-result-table-sort";
import { ReactiveBase, ReactiveList } from "@appbaseio/reactivesearch";

import SearchResultTable from "../search-result-table/search-result-table";

import SearchResultCard from "../search-result-card/search-result-card";

/* eslint-disable-next-line */
export interface SearchResultCardWrapperProps {}

interface Props {
  catalogueUrl: string;
  filter?: string;
  fields:Array<string>;
  size?: number;
}

export function SearchResultCardWrapper({catalogueUrl,
                                          filter,
                                          fields,
                                          size}: Props) {
  let default_query: Record<string, unknown>;
  if (filter) {
    default_query = {
      query_string: { query: filter }
    };
  }

  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  console.log(fields)
  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
      enableAppbase={false}
    >
      <ReactiveList
        componentId="reactiveListCard"
        size={size}
        pagination={true}
        showResultStats={true}
        defaultQuery={() => ({
          sort: [{ [sort.field]: { order: sort.order } }],
          //query: { match: { isTemplate: "n" } }
          query: default_query
        })}
        includeFields={fields}
        dataField={"_id"}
        react={{
          and: []
        }}
        render={({ loading, error, data }) => {
          if (loading) {
            console.log('loading');
            console.log(loading);
            return (
              <span>loadding</span>
            );
          }
          if (error) {
            return (
              <div>Something went wrong! Error details {JSON.stringify(error)}</div>
            );
          }
          return (
            <SearchResultCard
              data={data}
            />
          );
        }}
      />
    </ReactiveBase>
  );
}

export default SearchResultCardWrapper;
