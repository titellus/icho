import {DEFAULT_SORT, SortOption, SortOrder} from "../search-result-table-sort/search-result-table-sort";
import { DataSearch, MultiDropdownList, ReactiveBase, ReactiveList, SelectedFilters, ToggleButton } from "@appbaseio/reactivesearch";
import React, { useState } from "react";
import SearchResultTable from "../search-result-table/search-result-table";
import { Grid, Placeholder, Table, TableCell } from "semantic-ui-react";

/* eslint-disable-next-line */
export interface ResultTableProps {
}

export interface FieldDescription {
  columnIndex: string;
  columnJsonPath: string;
  columnName: string;
  columnLabel?: string;
  columnIcon?: string;
  columnRibon?: Object;
}


interface Props {
  catalogueUrl: string;
  filter?: string;
  filterField?: string;
  toggleFilterField?: string;
  toggleIsMultiSelect?: boolean;
  toggleLabel?: Array<any>;
  landingPageUrlTemplate?: string;
  landingPageLink?: string;
  includedFields: Array<string>;
  fields:Array<FieldDescription>;
  size?: number;
  sortBy?:string;
  sortType?:string;
}

interface SearchResultTablePlaceholderProps {
  cols: Array<string>,
  rows?: number
}

function TablePlaceholder({ cols, rows = 1 }: SearchResultTablePlaceholderProps) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {cols.map((f) => {
            return (<Table.HeaderCell key={f}>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="very short" />
                </Placeholder.Header>
              </Placeholder>
            </Table.HeaderCell>);
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          [...Array(rows)].map((v, i) => {
            return <Table.Row key={i}>
              {cols.map((f) => {
                return (<TableCell key={f}>
                  <Placeholder>
                    <Placeholder.Line length="short" />
                  </Placeholder>
                </TableCell>);
              })}
            </Table.Row>;
          })
        }
      </Table.Body>
    </Table>);
}

export function SearchResultTableWrapper({
                                           catalogueUrl,
                                           filter,
                                           filterField,
                                           toggleFilterField,
                                           toggleIsMultiSelect,
                                           toggleLabel,
                                           includedFields,
                                           fields,
                                           size,
                                           sortType,
                                           sortBy,
                                           landingPageUrlTemplate,
                                           landingPageLink
                                         }: Props) {
  let default_query: Record<string, unknown>;
   if (filter) {
    default_query = {
      query_string: { query: filter }
    };
  }
  const DEFAULT_SORT = {
    field: sortBy || "_score",
    order: sortType ||SortOrder.asc
  };

  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
      enableAppbase={false}
    >
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <DataSearch
              componentId="tableFullTextFilter"
              dataField={["resourceTitleObject.default"]}
              showClear={true}
              placeholder="Search ..."
              autosuggest={false}
              debounce={200}
              // defaultQuery={() => ({
              //   sort: [{
              //     [sortSelector.dataField]: {
              //       order: sortSelector.sortBy
              //     }
              //   }],
              //   //query: { match: { isTemplate: "n" } }
              //   // query: default_query
              // })}
            />
          </Grid.Column>
          <Grid.Column>
            {toggleFilterField && (
              <ToggleButton componentId="tableToggleFilter"
                            dataField={toggleFilterField}
                            multiSelect={toggleIsMultiSelect}
                            data={toggleLabel}
                            /*TODO see https://github.com/appbaseio/reactivesearch/issues/1888*/
/*                           customQuery={
                              function(value, props) {
                                if (value[0]) {
                                  let test = props.dataField+":("+ value[0].value +")"
                                  let analyser:{[index: string]:any} = {}
                                  analyser["query"]= test
                                  let query:{[index: string]:any} = {
                                    query:
                                      {
                                      }
                                 }
                                  query.query["query_string"]= analyser
                                  return {query}
                                } else {
                                  return {}
                                }
                              }
                            }*/
              />
            )}
          </Grid.Column>
          <Grid.Column>
            {filterField && (
              <MultiDropdownList componentId="tableQuickFilter"
                                 dataField={filterField}
                                 defaultQuery={() => ({
                                   query: default_query
                                 })}
                                 placeholder="Focus on" />
            )}
            {/*<CSVLink data={newData}>
              <Button icon>
                <Icon name="download" />
              </Button>
            </CSVLink>*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <ReactiveList
        componentId="tableOfRecord"
        size={size}
        pagination={true}
        showResultStats={true}
        defaultQuery={() => ({
          sort: [{ [sort.field]: { order: sort.order } }],
          //query: { match: { isTemplate: "n" } }
          query: default_query
        })}
        includeFields={includedFields}
        dataField={"_id"}
        react={{
          and: ["tableFullTextFilter", "tableQuickFilter","tableToggleFilter"]
        }}
        render={({ loading, error, data }) => {
          if (loading) {
            return (
              <TablePlaceholder cols={includedFields} rows={3} />
            );
          }
          if (error) {
            return (
              <div>Something went wrong! Error details {JSON.stringify(error)}</div>
            );
          }
          return (
            <SearchResultTable
              data={data}
              fields={fields}
              landingPageUrlTemplate={landingPageUrlTemplate}
              landingPageLink={landingPageLink}
              handleSetSort={setSort}
              currentSort={sort}
            />
          );
        }}
      />
    </ReactiveBase>
  );
}

export default SearchResultTableWrapper;
