import { DEFAULT_SORT, SortOption } from "../search-result-table-sort/search-result-table-sort";
import { DataSearch, MultiDropdownList, ReactiveBase, ReactiveList, SelectedFilters } from "@appbaseio/reactivesearch";
import React, { useState } from "react";
import SearchResultTable from "../search-result-table/search-result-table";
import { Grid, Placeholder, Table, TableCell } from "semantic-ui-react";

/* eslint-disable-next-line */
export interface ResultTableProps {
}

interface Props {
  url: string;
  index: string;
  filter?: string;
  filterField?: string;
  landingPageUrlTemplate?: string;
  landingPageLink?: string;
  columns: Array<string>;
  columnNames?: Array<string>;
  size?: number;
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
                                           url,
                                           index,
                                           filter,
                                           filterField,
                                           columns,
                                           columnNames,
                                           size,
                                           landingPageUrlTemplate,
                                           landingPageLink
                                         }: Props) {
  let default_query: Record<string, unknown>;

  // if (columns && columnNames && columns.length != columnNames.length) {
  //   console.warn("Configure same number of columns and column label.")
  // }

  if (filter) {
    default_query = {
      query_string: { query: filter }
    };
  }

  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <ReactiveBase
      app="records"
      url={api + "/srv/api/search/"}
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
            <SelectedFilters />
          </Grid.Column>
          <Grid.Column>
            {filterField && (
              <MultiDropdownList componentId="tableQuickFilter"
                                 dataField={filterField}
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
        includeFields={columns}
        dataField={"_id"}
        react={{
          and: ["tableFullTextFilter", "tableQuickFilter"]
        }}
        render={({ loading, error, data }) => {
          if (loading) {
            return (
              <TablePlaceholder cols={columns} rows={3} />
            );
          }
          if (error) {
            return (
              <div>Something went wrong! Error details {JSON.stringify(error)}</div>
            );
          }
          return (
            <SearchResultTable
              columns={columns}
              columnNames={columnNames}
              data={data}
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
