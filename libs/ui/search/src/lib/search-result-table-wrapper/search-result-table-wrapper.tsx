import './search-result-table-wrapper.scss';
import {DEFAULT_SORT, SortOption, SortOrder} from "../search-result-table-sort/search-result-table-sort";
import { DataSearch, MultiDropdownList, ReactiveBase, ReactiveList, SelectedFilters, ToggleButton } from "@appbaseio/reactivesearch";
import React, { useState } from "react";
import SearchResultTable from "../search-result-table/search-result-table";
import { Grid, Placeholder,Icon, Pagination, Table, TableCell,SemanticWIDTHS } from "semantic-ui-react";

/* eslint-disable-next-line */
export interface ResultTableProps {
}

export interface FieldDescription {
  columnIndex: string;
  columnJsonPath: string;
  columnName: string;
  columnLabel?: string;
  columnIcon?: string;
  columnPopup?: string;
  columnRibon?: Object;
  columnWidth?:SemanticWIDTHS | undefined;
}


interface Props {
  catalogueUrl: string;
  filter?: string;
  search_placeholder?: string;
  filterField?: string;
  toggleFilterField?: string;
  toggleIsMultiSelect?: boolean;
  toggleLabel?: Array<any>;
  toggleButtonStyle?:string;
  landingPageUrlTemplate?: string;
  landingPageLink?: string;
  includedFields: Array<string>;
  fullTextFilter?: Array<string>;
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
                                           search_placeholder,
                                           filterField,
                                           toggleFilterField,
                                           toggleIsMultiSelect,
                                           toggleLabel,
                                           toggleButtonStyle,
                                           includedFields,
                                           fullTextFilter,
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

  if (toggleButtonStyle){
    let style_tb = JSON.parse(toggleButtonStyle)
    if (style_tb.bg) {
      document.documentElement.style.setProperty('--table-togglebutton_bg', style_tb.bg)
    }
    if (style_tb.bg_active) {
      document.documentElement.style.setProperty('--table-togglebutton_bg_active', style_tb.bg_active)
    }
    if (style_tb.text_color) {
      document.documentElement.style.setProperty('--table-togglebutton_text_color', style_tb.text_color)
    }
    if (style_tb.text_color_active) {
      document.documentElement.style.setProperty('--table-togglebutton_text_color_active', style_tb.text_color_active)
    }
  }



  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);


  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
      transformRequest={(props) => ({
        ...props,
        url: props.url + 'relatedType=parent&relatedType=children&relatedType=sources&relatedType=hassources&relatedType=brothersAndSisters&relatedType=services&relatedType=datasets&relatedType=siblings&relatedType=associated&relatedType=fcats&relatedType=hasfeaturecats&relatedType=related'
      })}

      //url='https://metawal4.test.wallonie.be/geonetwork/srv/api/search/records/_search?bucket=e101&relatedType=children&relatedType=parent&relatedType=brothersAndSisters&relatedType=siblings&relatedType=associated&relatedType=services'
      enableAppbase={false}
    >
      <div style={{margin:"1em"}}>
        <Grid divided>
          <Grid.Row columns={3}>
            <Grid.Column width={4}>
              {fullTextFilter && fullTextFilter.length > 0 ? <DataSearch
                componentId="tableFullTextFilter"
                //dataField={fulltextfilter}
                showClear={true}
                placeholder={search_placeholder}
                autosuggest={false}
                debounce={200}
                customQuery={
                  function (value, props) {
                    if (value[0]) {
                      let value_escapeReservedCharacters = value.replace(
                        /(\+|-|&&|\|\||!|\{|\}|\[|\]|\^|\~|\?|:|\\{1}|\(|\)|\/)/g,
                        "\\$1"
                      );
                      let analyser: { [index: string]: any } = {}
                      if (fullTextFilter.length > 0 && fullTextFilter[0] != 'mw_default_query') {
                        let subquery = ''
                        for (var j = 0; j < fullTextFilter.length; j++) {
                          console.log(j)
                          console.log(subquery)
                          if (j == 0) {
                            subquery = '(' + fullTextFilter[j] + ':(' + value_escapeReservedCharacters + ')^2' + ' OR ' + fullTextFilter[j] + ':\"' + value_escapeReservedCharacters + '\"^6'
                          } else if (j > 0 && j < (fullTextFilter.length - 1)) {
                          } else if (j == (fullTextFilter.length - 1)) {
                            subquery = subquery + ' OR ' + fullTextFilter[j] + ':(' + value_escapeReservedCharacters + ')^2' + ' OR ' + fullTextFilter[j] + ':\"' + value_escapeReservedCharacters + '\"^6' + ')'
                          }
                        }
                        analyser["query"] = subquery
                      } else {
                        analyser["query"] = '(any.langfre:(' + value_escapeReservedCharacters + ') OR any.common:(' + value_escapeReservedCharacters + ') OR resourceTitleObject.langfre:(' + value_escapeReservedCharacters + ')^2 OR resourceTitleObject.\\*:\"' + value_escapeReservedCharacters + '\"^6)'
                      }
                      analyser["default_operator"] = 'AND'
                      let query: { [index: string]: any } = {
                        query: {}
                      }
                      query.query["query_string"] = analyser
                      return {query}
                    } else {
                      return {}
                    }
                  }
                }
              />:""}
                </Grid.Column>
            <Grid.Column>
              {toggleFilterField && (
                <ToggleButton componentId="tableToggleFilter"
                              dataField={toggleFilterField}
                              multiSelect={toggleIsMultiSelect}
                              innerClass={{
                                button: 'toggle-button'
                              }}
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
              )
              }
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
          renderPagination={({ pages, totalPages, currentPage, setPage, fragmentName }) => {
            const onChange = (e: any, pageInfo: any) => {
              setPage(pageInfo.activePage-1)
            };
            return  <>
              {!isNaN(totalPages) ?
                <Grid columns={3}>
                  <Grid.Row >
                    <Grid.Column >
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <Pagination defaultActivePage={1}
                                  onPageChange={onChange}
                                  ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                  totalPages={totalPages} />
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                  </Grid.Row >
                </Grid>
                :''}
            </>
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
