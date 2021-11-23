import './search-result-table-reactivelist.module.scss';
import {Container} from "semantic-ui-react";
import {SortOption, sortOptions} from "../search-result-table-sort/search-result-table-sort";
import {ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import { DefaultSource } from "@catalogue/utils/shared";
import React, {useState} from "react";
import SearchResultTable from "../search-result-table/search-result-table";

/* eslint-disable-next-line */
export interface ResultTableProps {}

export function SearchResultTableReactivelist() {
  const [sort, setSort] = useState<SortOption>(sortOptions[0]);
  function handleChange(newValue:any) {
    setSort(newValue);
  }
  return (
    <ReactiveBase
      app="gn-records"
      url="http://localhost:4200/search"
      enableAppbase={false}
    >
      <Container>
        <ReactiveList
          componentId="sortTableES"
          size={5}
          pagination={false}
          showResultStats={false}
          defaultQuery={() => ({
            sort: [{ [sort.dataField]: { order: sort.sortBy } }],
            query: { match: { isTemplate: "n" } }
          })}
          includeFields={DefaultSource.FOR_SEARCH}
          dataField={"resourceTitleObject.default"}
          react={{}}
          render={({ loading, error, data }) => {
            return (
              <SearchResultTable loading={loading}
                             error={error}
                             data={data}
                             handleChangeSortReactiveList={handleChange} selected={sort}/>
            );
          }}
        />
        </Container>
    </ReactiveBase>
  );
}

export default SearchResultTableReactivelist;
