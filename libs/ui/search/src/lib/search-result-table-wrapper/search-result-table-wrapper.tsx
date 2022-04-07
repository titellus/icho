import {DEFAULT_SORT, SortOption, SortOrder} from "../search-result-table-sort/search-result-table-sort";
import { DataSearch, MultiDropdownList, ReactiveBase, ReactiveList, SelectedFilters, ToggleButton } from "@appbaseio/reactivesearch";
import React, { useState } from "react";
import SearchResultTable from "../search-result-table/search-result-table";
import { Grid, Placeholder, Table, TableCell,SemanticWIDTHS } from "semantic-ui-react";

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
  columnWidth?:SemanticWIDTHS | undefined;
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
  searchFields?: Array<string>;
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
                                           searchFields,
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

  console.log(searchFields)

  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
       transformRequest={(props) => ({
          ...props,
         url: props.url + 'relatedType=children&relatedType=parent&relatedType=brothersAndSisters&relatedType=siblings&relatedType=associated&relatedType=services&relatedType=onlines&relatedType=datasets'
       })}

      //url='https://metawal4.test.wallonie.be/geonetwork/srv/api/search/records/_search?bucket=e101&relatedType=children&relatedType=parent&relatedType=brothersAndSisters&relatedType=siblings&relatedType=associated&relatedType=services'
      enableAppbase={false}
    >
      <div style={{margin:"1em"}}>
      <Grid divided>
        <Grid.Row columns={3}>
          <Grid.Column width={4}>
            {searchFields && (<DataSearch
              componentId="tableFullTextFilter"
              //dataField={searchFields}
              showClear={true}
              placeholder="Search ..."
              autosuggest={false}
              debounce={200}
              customQuery={
                function(value, props) {
                  if (value[0]) {

                    let analyser:{[index: string]:any} = {}
                    // to limit query to specific fields: add dataField props, and analyser["query"] to select the search value, analyser["fields"]=props.dataField to specify the datafiels params and
                    //let test = value
                    //analyser["query"]= test
                    //analyser["fields"]=props.dataField
                    analyser["query"]='(any.\\*:('+value+') OR any.common:('+value+') OR resourceTitleObject.\\*:('+value+')^2 OR resourceTitleObject.\\*:\"'+value+'\"^6)'
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
              }
              //"query":"any.\\\\*::(12345678) OR any.common:(12345678) OR resourceTitleObject.\\\\*:(12345678)^2 OR resourceTitleObject.\\*:\"12345678\"^6"}}
              //query: "(any.\\*:(12345678) OR any.common:(12345678) OR resourceTitleObject.\\*:(12345678)^2 OR resourceTitleObject.\\*:\"12345678\"^6)"
              // any.${searchLang}:(${any}) OR any.common:(${any}) OR resourceTitleObject.${searchLang}:(${any})^2 OR resourceTitleObject.\\*:\"${any}\"^6
              // defaultQuery={() => ({
              //   sort: [{
              //     [sortSelector.dataField]: {
              //       order: sortSelector.sortBy
              //     }
              //   }],
              //   //query: { match: { isTemplate: "n" } }
              //   // query: default_query
              // })}
            />)}
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
      </div>
    </ReactiveBase>
  );
}

export default SearchResultTableWrapper;
