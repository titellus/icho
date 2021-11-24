import './search-result-table-reactivelist.module.scss';
import {Container} from "semantic-ui-react";
import {SortOption, sortOptions} from "../search-result-table-sort/search-result-table-sort";
import {ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import { DefaultSource } from "@catalogue/utils/shared";
import React, {Dispatch, SetStateAction, useState} from "react";
import SearchResultTable from "../search-result-table/search-result-table";
import PropTypes from "prop-types";

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

export function SearchResultTableReactivelist({url, index, filter, mtdRoot, dataFields,dataFieldsName, resultNumber }: Props) {
  let default_query:any;
  if (filter) {
    default_query = {
      query_string:
        {query: filter}
    }
  }

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
          size={resultNumber}
          pagination={false}
          showResultStats={false}
          defaultQuery={() => ({
            sort: [{ [sort.dataField]: { order: sort.sortBy } }],
            //query: { match: { isTemplate: "n" } }
            query: default_query
            //query: { query_string:{query:"+tag.default:\"Reporting INSPIRE\""}}
            //filter: { query_string:{query:"+tag.default:\"reporting INSPIRE\""}}
          })}
          includeFields={dataFields}
          dataField={"resourceTitleObject.default"}
          react={{}}
          render={({ loading, error, data }) => {
            return (
              <SearchResultTable loading={loading}
                             error={error}
                             mtdRoot={mtdRoot}
                             dataFields = {dataFields}
                             data={data}
                             dataFieldsName = {dataFieldsName}
                             handleChangeSortReactiveList={handleChange} selected={sort}/>
            );
          }}
        />
        </Container>
    </ReactiveBase>
  );
}

export default SearchResultTableReactivelist;
